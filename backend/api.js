require("express");
require("mongodb");
const emailService = require("./emailService");

exports.setApp = function (app, client) {
  function hashStringToInt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash); // Return positive integer
  }

  async function generateUserIdFromMongo(login, db) {
    let userId = hashStringToInt(login);

    // Check if a user with this userId already exists.
    let existing = await db.collection("Users").findOne({ UserId: userId });
    // If a collision is found, increment until a unique userId is found.
    while (existing) {
      userId++;
      existing = await db.collection("Users").findOne({ UserId: userId });
    }
    return userId;
  }

  app.post("/api/register", async (req, res, next) => {
    const { firstName, lastName, email, login, password } = req.body;

    if (!firstName || !lastName || !email || !login || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    var error = "";
    let newUser;
    let userId;

    try {
      const db = client.db("TravelGenie");
      const existingUser = await db
        .collection("Users")
        .findOne({ Login: login });
      if (existingUser) {
        return res.status(400).json({ error: "Login name already taken." });
      }

      // Generate verification token
      const verificationToken = emailService.generateToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      userId = await generateUserIdFromMongo(login, db);
      newUser = {
        Login: login,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        UserId: userId,
        Email: email,
        IsVerified: false,
        VerificationToken: verificationToken,
        VerificationExpires: verificationExpires,
        ResetPasswordToken: null,
        ResetPasswordExpires: null,
      };

      const result = await db.collection("Users").insertOne(newUser);

      // Send verification email
      const emailSent = await emailService.sendVerificationEmail(
        email,
        verificationToken
      );

      if (!emailSent) {
        return res
          .status(500)
          .json({ error: "Failed to send verification email" });
      }

      res.status(200).json({
        message:
          "Registration successful. Please check your email to verify your account.",
        userId: userId,
      });
    } catch (e) {
      error = e.toString();
      res.status(500).json({ error: error });
    }
  });

  // Verify email endpoint
  app.get("/api/verify-email/:token", async (req, res) => {
    try {
      const db = client.db("TravelGenie");
      const user = await db.collection("Users").findOne({
        VerificationToken: req.params.token,
        VerificationExpires: { $gt: new Date() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid or expired verification token" });
      }

      await db.collection("Users").updateOne(
        { _id: user._id },
        {
          $set: {
            IsVerified: true,
            VerificationToken: null,
            VerificationExpires: null,
          },
        }
      );

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

  // Request password reset
  app.post("/api/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const db = client.db("TravelGenie");
      const user = await db.collection("Users").findOne({ Email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const resetToken = emailService.generateToken();
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.collection("Users").updateOne(
        { _id: user._id },
        {
          $set: {
            ResetPasswordToken: resetToken,
            ResetPasswordExpires: resetExpires,
          },
        }
      );

      const emailSent = await emailService.sendPasswordResetEmail(
        email,
        resetToken
      );

      if (!emailSent) {
        return res
          .status(500)
          .json({ error: "Failed to send password reset email" });
      }

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

  // Reset password
  app.post("/api/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const db = client.db("TravelGenie");

      const user = await db.collection("Users").findOne({
        ResetPasswordToken: token,
        ResetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid or expired reset token" });
      }

      await db.collection("Users").updateOne(
        { _id: user._id },
        {
          $set: {
            Password: newPassword,
            ResetPasswordToken: null,
            ResetPasswordExpires: null,
          },
        }
      );

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

  // Update login endpoint to check for email verification
  app.post("/api/login", async (req, res) => {
    const { login, password } = req.body;

    try {
      const db = client.db("TravelGenie");
      const results = await db
        .collection("Users")
        .find({ Login: login, Password: password })
        .toArray();

      if (results.length > 0) {
        const user = results[0];
        // Temporarily disabled email verification check
        // if (!user.IsVerified) {
        //   return res.status(403).json({
        //     error: "Please verify your email before logging in",
        //     needsVerification: true,
        //   });
        // }

        res.status(200).json({
          id: user.UserId,
          firstName: user.FirstName,
          lastName: user.LastName,
          error: "",
        });
      } else {
        res.status(400).json({ error: "Invalid user name/password" });
      }
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  app.post("/api/add", async (req, res, next) => {
    // incoming: userId, date, location, time
    // outgoing:
    var error = "";
    const { userId, date, location, time } = req.body;
    if (!date || !location || !time) {
      return res.status(400).json({ error: "All fields required" });
    }

    var error = "";
    let newEvent;
    try {
      const db = client.db("TravelGenie");
      newEvent = { UserId: userId, Date: date, Location: location, Time: time };
      const result = db.collection("Events").insertOne(newEvent);
    } catch (e) {
      error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
  });

  app.post("/api/delete", async (req, res, next) => {
    // incoming: userId, eventId
    // outgoing: success/error message

    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ error: "User ID and Event ID are required" });
    }

    try {
      const db = client.db("TravelGenie");

      //This goes through the Events collection and deletes the event with the matching userId and eventId
      const result = await db.collection("Events").deleteOne({
        UserId: userId,
        _id: new require("mongodb").ObjectId(eventId),
      });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "Event not found or already deleted" });
      }

      //If the event is successfully deleted, a message is sent back to the user
      res.status(200).json({ message: "Event successfully deleted" });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  //This function is used to search for events in the Events collection
  app.post("/api/search", async (req, res, next) => {
    // incoming: userId, (optional) date, location, time
    // outgoing: list of matching events or error message

    const { userId, date, location, time } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const db = client.db("TravelGenie");

      //This query is used to search for events with the matching userId, date, location, and time (if provided)
      let query = { UserId: userId };

      if (date) query.Date = date;
      if (location) query.Location = location;
      if (time) query.Time = time;

      //The results of the query are stored in the results variable
      const results = await db.collection("Events").find(query).toArray();

      //The results are then sent back to the user
      res.status(200).json({ events: results, error: "" });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });
};
