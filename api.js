const express = require("express");
const fetch = require("node-fetch");
const emailService = require("./emailService");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY, {
  apiVersion: "v1",
});

// MongoDB connection URI
// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
// const client = new MongoClient(uri);

const User = require("./models/user.js");

exports.setApp = function (app, dbInstance) {
  // Use the provided dbInstance instead of creating a new connection
  const db = dbInstance;

  function hashStringToInt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash); // Return positive integer
  }

  async function generateIdFromMongo(login, db) {
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
      const existingUser = await db
        .collection("Users")
        .findOne({ Login: login });
      if (existingUser) {
        return res.status(400).json({ error: "Login name already taken." });
      }

      // Generate verification token
      const verificationToken = emailService.generateToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      userId = await generateIdFromMongo(login, db);
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

    var error = "";

    var id = -1;
    var fn = "";
    var ln = "";

    var ret;

    try {
      const results = await db
        .collection("Users")
        .find({ Login: login, Password: password })
        .toArray();

      // Mongoose
      /* const results = await User.find({Login: login, Password: password});*/

      if (results.length > 0) {
        const user = results[0];
        // Temporarily disabled email verification check
        // if (!user.IsVerified) {
        //   return res.status(403).json({
        //     error: "Please verify your email before logging in",
        //     needsVerification: true,
        //   });
        // }
        id: user.UserId;
        fn: user.FirstName;
        ln: user.LastName;

        try {
          const token = require("./createJWT.js");
          ret = token.createToken(fn, ln, id);
        } catch (e) {
          ret = { error: e.message };
        }

        res.status(200).json({
          userId: id,
          firstName: fn,
          lastName: ln,
          token: ret,
        });

      } else {
        res.status(400).json({ error: "Invalid user name/password" });
      }
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  app.post("/api/addItinerary", async (req, res, next) => {

    var token = require("./createJWT.js");

    // Expecting: userId, tripName, tripArray
    const { userId, itineraryNode, jwtToken } = req.body;

    /*
    try{
      if(token.isExpired(jwtToken)) {
        var r = {error:"The jwt token is no longer valid", jwtToken:""};;
        res.status(200).json(r);
        return;
      }
    }
    catch(e){
      console.log(e.message);
    } */

    if (!userId || !itineraryNode) {
      return res.status(400).json({ error: "All fields required" });
    }

    var error = "";
    var itineraryID = await generateIdFromMongo(itineraryNode.title, db);
    try {
      const newItinerary = {
        UserId: userId,
        Itinerary: itineraryNode,
        ItineraryID: itineraryID,
        createdAt: new Date(),
      };

      const result = await db.collection("Itineraries").insertOne(newItinerary);
      /*
      var refreshedToken = null;
      try{
        refreshedToken = token.refreshedToken(jwtToken);
      }
      catch(e){
        console.log(e.message);
      }
      */
      res.status(200).json({
        message: "Itinerary added successfully",
        ItineraryId: result.itineraryID,
      });

    } catch (e) {
      error = e.toString();
      res.status(500).json({ error: error });
    }
  });

  app.post("/api/deleteIternerary", async (req, res, next) => {
    // incoming: userId, eventId
    // outgoing: success/error message

    const { userId, itineraryID } = req.body;

    if (!userId || !itineraryID) {
      return res
        .status(400)
        .json({ error: "User ID and Event ID are required" });
    }

    try {
      //This goes through the Events collection and deletes the event with the matching userId and eventId
      const result = await db.collection("Itineraries").deleteOne({
        UserId: userId,
        _id: new require("mongodb").ObjectId(itineraryID),
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
  app.post("/api/searchIternerary", async (req, res, next) => {
    // incoming: userId, (optional) date, location, time
    // outgoing: list of matching events or error message

    const { userId, itineraryName } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
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

  app.post("/api/editUser", async (req, res, next) => {
    // incoming: userId, newfirstName, newlastName, newEmail
    const { userId, firstName, lastName, email } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    // Build update object and check that at least one field is provided.
    const updateData = {};
    if (firstName) updateData.FirstName = firstName;
    if (lastName) updateData.LastName = lastName;
    
    if (email) {
      // Check if the email is already taken
      const existingUser = await db.collection("Users").findOne({ Email: email });
      if (existingUser && existingUser.UserId !== userId) {
        return res.status(400).json({ error: "Email is already taken" });
      }
      updateData.Email = email;
    }
  
    try {
      const result = await db.collection("Users").updateOne(
        { UserId: userId },
        { $set: updateData }
      );
  
      res.status(200).json({ change: result, message: "User updated successfully" });
    } catch (e) {
      console.error("Error updating user:", e);
      res.status(500).json({ error: e.toString() });
    }
  });
  

  //ENDPOINT FOR GENERATING TRAVEL PLAN USING GEMINI
  /* app.post("/api/generate-trip", async (req, res) => {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
        });

        const result = await model.generateContent(prompt);

        const response = await result.response.text();
        res.status(200).json({ suggestion: response });
      } catch (error) {
        res.status(500).json({ error: error.toString() });
      }
    }); */

  // Endpoint for generating travel itinerary using Gemini
  app.post("/api/generate-itinerary", async (req, res) => {
    try {
      const { destination, duration, groupSize, preferences } = req.body;

      if (!destination || !duration || !groupSize) {
        return res.status(400).json({
          error: "Missing required fields",
          details: "Destination, duration, and group size are required",
        });
      }

      const prompt = `Create a detailed day-by-day itinerary for a ${duration}-day trip to ${destination} for ${groupSize} people. Consider these preferences: ${preferences}. 
      
      For each day, provide at least three distinct activities (morning, afternoon, and evening), including specific times, locations, estimated costs, and a brief description.
      
      Return the result as a JSON object with the following structure:
      {
        "title": "Trip Title",
        "destination": "${destination}",
        "duration": ${duration},
        "groupSize": ${groupSize},
        "description": "Brief trip description",
        "image": "URL to a relevant image",
        "price": 0,
        "tags": ["tag1", "tag2"],
        "dailyBreakdown": [
          {
            "day": 1,
            "activities": [
              {
                "time": "HH:MM AM/PM",
                "activity": "Activity name",
                "location": "Specific location",
                "details": "Detailed description",
                "cost": "$Amount"
              }
            ]
          }
        ]
      }
      
      Ensure the JSON is properly formatted and includes all required fields.`;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      let itinerary;
      try {
        itinerary = JSON.parse(text);

        // Validate the structure
        if (
          !itinerary.dailyBreakdown ||
          !Array.isArray(itinerary.dailyBreakdown)
        ) {
          throw new Error(
            "Invalid itinerary structure: missing dailyBreakdown array"
          );
        }

        // Ensure each day has activities
        itinerary.dailyBreakdown.forEach((day, index) => {
          if (
            !day.activities ||
            !Array.isArray(day.activities) ||
            day.activities.length === 0
          ) {
            throw new Error(`Day ${index + 1} has no activities`);
          }

          // Ensure each activity has required fields
          day.activities.forEach((activity, actIndex) => {
            if (!activity.time || !activity.activity) {
              throw new Error(
                `Activity ${actIndex + 1} on day ${
                  index + 1
                } is missing required fields`
              );
            }
          });
        });

        // Add default values for required fields if they're missing
        if (!itinerary.image) {
          itinerary.image =
            "https://via.placeholder.com/800x400?text=Trip+Image";
        }
        if (!itinerary.price) {
          itinerary.price = 0;
        }
        if (!itinerary.tags || !Array.isArray(itinerary.tags)) {
          itinerary.tags = [];
        }

        // Log the final itinerary for debugging
        console.log("Generated itinerary:", JSON.stringify(itinerary, null, 2));

        res.json(itinerary);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        res.status(500).json({
          error: "Failed to parse itinerary data",
          details: parseError.message,
          rawResponse: text,
        });
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      res.status(500).json({
        error: "Failed to generate itinerary",
        details: error.message,
      });
    }
  });

  function parseItineraryResponse(text) {
    // Split the text into days
    const days = text.split(/Day \d+:/i).filter((day) => day.trim());

    return days.map((day) => {
      const activities = day
        .split(/\n+/)
        .filter((line) => line.trim() && !line.toLowerCase().includes("day"))
        .map((line) => {
          // Extract time, activity, and cost if available
          const timeMatch = line.match(/(\d{1,2}:\d{2}\s*[AaPp][Mm])/);
          const time = timeMatch ? timeMatch[1] : "";
          const activity = line
            .replace(timeMatch ? timeMatch[0] : "", "")
            .trim();

          return {
            time,
            activity,
            cost: extractCost(line),
          };
        });

      return {
        activities,
      };
    });
  }

  function extractCost(line) {
    const costMatch = line.match(/\$\d+/);
    return costMatch ? costMatch[0] : "";
  }
};
