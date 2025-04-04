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
          id: id,
          firstName: fn,
          lastName: ln,
          error: "",
        });
      } else {
        res.status(400).json({ error: "Invalid user name/password" });
      }
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  app.post("/api/addItinerary", async (req, res, next) => {
    // Expecting: userId, tripName, tripArray
    const { userId, itineraryNode } = req.body;

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

    const { userId, date, location, time } = req.body;

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
    console.log("Received generate-itinerary request:", req.body);
    const { destination, duration, groupSize, preferences } = req.body;

    if (!destination || !duration || !groupSize || !preferences) {
      console.log("Missing required fields:", {
        destination,
        duration,
        groupSize,
        preferences,
      });
      return res.status(400).json({ error: "All fields are required" });
    }

    let text = "";
    let cleanedText = "";

    try {
      console.log("Initializing Gemini model");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });

      const prompt = `You are a helpful travel planner AI. 
Generate a detailed JSON itinerary for ${destination} spanning ${duration} days 
for ${groupSize} travelers. Preferences: ${preferences}.

Only respond with valid JSON—no extra text—and must contain these keys:
{
  "title": "A descriptive title for the trip",
  "destination": "${destination}",
  "duration": ${duration},
  "groupSize": ${groupSize},
  "description": "A brief description of the trip",
  "image": "https://source.unsplash.com/1600x900/?${destination}",
  "price": 0,
  "tags": ["relevant", "tags", "based", "on", "preferences"],
  "dailyBreakdown": []
}

1) The "dailyBreakdown" is an array of day objects. 
2) Each day object must have: {"day": number, "activities": [{"time": "Morning/Afternoon/Evening/Night", "activity": "main activity name", "details": "detailed description of the activity", "cost": "estimated cost"}]}
3) Do not wrap your response in triple backticks or any markdown.
4) Double-check that your response is valid JSON. If it won't parse, fix it until it does.
5) Return nothing except the JSON object described above.
6) Make sure each day has at least 3 activities.
7) The time field must be one of: Morning, Afternoon, Evening, or Night.
`;
      console.log("Generating response with prompt:", prompt);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
      console.log("Raw response from Gemini:", text);

      // Clean up the response by removing any markdown code block formatting and extra whitespace
      cleanedText = text
        .replace(/```json\n?|\n?```/g, "") // Remove markdown code blocks
        .replace(/^\s+|\s+$/g, "") // Trim whitespace
        .replace(/[\u200B-\u200D\uFEFF]/g, ""); // Remove zero-width spaces

      console.log("Cleaned response:", cleanedText);

      // Try to parse the cleaned response
      const itinerary = JSON.parse(cleanedText);

      // Validate required fields
      const requiredFields = [
        "title",
        "destination",
        "duration",
        "groupSize",
        "description",
        "image",
        "price",
        "tags",
        "dailyBreakdown",
      ];
      const missingFields = requiredFields.filter(
        (field) => !(field in itinerary)
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Validate dailyBreakdown structure
      if (!Array.isArray(itinerary.dailyBreakdown)) {
        throw new Error("dailyBreakdown must be an array");
      }

      // Ensure each day has the correct structure
      itinerary.dailyBreakdown = itinerary.dailyBreakdown.map((day, index) => ({
        day: index + 1,
        activities: day.activities.map((activity) => ({
          time: activity.time || "Morning",
          activity: activity.activity || activity.description || "",
          details: activity.details || "",
          cost: activity.cost || "0",
        })),
      }));

      res.json(itinerary);
    } catch (error) {
      console.error("Error in generate-itinerary:", error);
      console.error("Raw response:", text);
      console.error("Cleaned response:", cleanedText);
      res.status(500).json({
        error: "Failed to generate itinerary",
        details: error.message,
        rawResponse: text,
        cleanedResponse: cleanedText,
      });
    }
  });
};
