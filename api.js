// imports the express module and other required modules
// const express = require("express");
// const fetch = require("node-fetch");
const emailService = require("./emailService");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY, {
  apiVersion: "v1",
});

// Initialize schema models
const User = require("./models/user.js");
const Itinerary = require("./models/Itinerary.js");

// Initialize the express app
exports.setApp = function (app, dbInstance) {
  // Use the provided dbInstance instead of creating a new connection
  const db = dbInstance;

  // Hash function to convert a string to a positive integer
  function hashStringToInt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash); // Return positive integer
  }

  // Generate a unique userId
  async function generateUserIdFromMongo(login, db) {
    let userId = hashStringToInt(login);

    // Check if a user with this userId already exists.
    let existing = await User.findOne({ UserId: userId });

    // If a collision is found, increment until a unique userId is found.
    while (existing) {
      userId++;
      existing = await User.findOne({ UserId: userId });
    }
    return userId;
  }

  // Generate a unique itineraryId
  async function generateItineraryIdFromMongo(itinerary, db, userId) {
    // Include userId and current timestamp to increase uniqueness
    let baseString = itinerary + userId + Date.now();
    let itineraryId = hashStringToInt(baseString);
    let existing = await Itinerary.findOne({ ItineraryId: itineraryId });

    // If a collision is found, increment until a unique itineraryId is found.
    while (existing) {
      itineraryId++;
      existing = await Itinerary.findOne({ ItineraryId: itineraryId });
    }
    return itineraryId;
  }

  async function fetchUnsplashImage(query) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${accessKey}&per_page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular; // Return the URL of the first image
      } else {
        console.warn("No images found for query:", query);
        return "https://via.placeholder.com/800x400?text=No+Image+Available"; // Fallback image
      }
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
      return "https://via.placeholder.com/800x400?text=Error+Fetching+Image"; // Fallback image
    }
  }

  // Registration endpoint
  app.post("/api/register", async (req, res, next) => {
    // incoming: firstName, lastName, email, login, password
    const { firstName, lastName, email, login, password } = req.body;

    // error handling for missing fields
    if (!firstName || !lastName || !email || !login || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // variables
    var error = "";
    let newUser;

    // Generate a unique userId
    const userId = await generateUserIdFromMongo(login, db);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ Login: login }, { Email: email }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Login name or email already taken." });
      }

      // Generate verification token
      const verificationToken = emailService.generateToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      console.log("Generated verification token:", verificationToken);
      console.log("Token expires at:", verificationExpires);

      // Create a new user object
      newUser = new User({
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
      });

      // Send verification email first
      const emailSent = await emailService.sendVerificationEmail(
        email,
        verificationToken
      );

      if (!emailSent) {
        console.error("Failed to send verification email to:", email);
        return res
          .status(500)
          .json({ error: "Failed to send verification email" });
      }

      console.log("Verification email sent successfully to:", email);

      // Only save the user if email was sent successfully
      await newUser.save();
      console.log("User saved to database with verification token");

      // Send a success response
      res.status(200).json({
        message:
          "Registration successful. Please check your email to verify your account.",
        userId: userId,
      });
    } catch (e) {
      // Handle any errors that occur during registration
      error = e.toString();
      console.error("Registration error:", error);
      res.status(500).json({ error: error });
    }
  });

  // Verify email endpoint
  app.get("/api/verify-email/:token", async (req, res) => {
    try {
      const token = req.params.token;
      console.log("Verification attempt with token:", token);

      // First check if any user has this token
      const userWithToken = await User.findOne({ VerificationToken: token });
      console.log(
        "User found with token:",
        userWithToken ? userWithToken.Email : "None"
      );

      if (userWithToken) {
        console.log(
          "Token expiration date:",
          userWithToken.VerificationExpires
        );
        console.log("Current time:", new Date());
        console.log(
          "Is token expired?",
          new Date() > userWithToken.VerificationExpires
        );
      }

      const user = await User.findOne({
        VerificationToken: token,
        VerificationExpires: { $gt: new Date() },
      });

      if (!user) {
        console.log("No valid user found with token or token expired");
        return res
          .status(400)
          .json({ error: "Invalid or expired verification token" });
      }

      console.log("Found valid user:", user.Email);
      console.log("Current verification status:", user.IsVerified);

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            IsVerified: true,
            VerificationToken: null,
            VerificationExpires: null,
          },
        }
      );

      console.log("User verified successfully");
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: error.toString() });
    }
  });

  // Request password reset
  app.post("/api/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ Email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const resetToken = emailService.generateToken();
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await User.updateOne(
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
      const { userId, token, newPassword } = req.body;

      const user = await User.findOne({
        ResetPasswordToken: token,
        ResetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid or expired reset token" });
      }

      await User.updateOne(
        { userId: userId },
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

  // Update login endpoint
  app.post("/api/login", async (req, res) => {

    // incoming: login, password
    // outgoing: userId, firstName, lastName, token, error message
    const { login, password } = req.body;

    // error handling for missing fields
    if (!login || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // variables
    var error = "";
    var id = -1;
    var fn = "";
    var ln = "";

    try {
      /*const results = await db
        .collection("Users")
        .find({ Login: login, Password: password })
        .toArray();
      */

      // Mongoose query to find user by login and password
      const results = await User.find({ Login: login, Password: password });

      // obtain the first result from the array
      if (results.length > 0) {
        const user = results[0];
        // Check if email is verified
        if (!user.IsVerified) {
          return res.status(403).json({
            error: "Please verify your email before logging in",
            needsVerification: true,
          });
        }

        // get user details
        id = user.UserId;
        fn = user.FirstName;
        ln = user.LastName;

        // send response
        res.status(200).json({
          userId: id,
          firstName: fn,
          lastName: ln,
          error: error,
        });
      } else {
        // if no user found, send error message
        res.status(400).json({ error: "Invalid user name/password" });
      }
    } catch (e) {
      // handle any errors that occur during login
      res.status(500).json({ error: e.toString() });
    }
  });

  // This endpoint is used to add a new itinerary to the database
  app.post("/api/addItinerary", async (req, res, next) => {
  
    // incoming: userId, itineraryNode, 
    const { userId, itinerary } = req.body;    

    // check for missing fields in the request body. If any are missing, it sends a 400 error response
    if (!userId || !itinerary) {
      return res.status(400).json({ error: "All fields required" });
    }

    // variables
    var error = "";
    var itineraryId = await generateItineraryIdFromMongo(itinerary.title, db);

    try {
      // Create a new itinerary object
      const newItinerary = new Itinerary({
        UserId: userId,
        Itinerary: itinerary,
        ItineraryId: itineraryId,
        createdAt: new Date(),
      });

      // const result = await Itinerary.insertOne(newItinerary);

      // Save the new itinerary to the database
      const savedItinerary = await newItinerary.save();

      // Send a success response
      res.status(200).json({
        message: "Itinerary added successfully",
        ItineraryId: savedItinerary.ItineraryId,
      });
    } catch (e) {
      // handle any errors that occur during itinerary addition
      error = e.toString();
      res.status(500).json({ error: error });
    }
  });

  // This endpoint is used to delete an itinerary from the database
  app.post("/api/deleteItinerary", async (req, res, next) => {

    // incoming: userId, eventId, jwtToken
    // outgoing: success/error message
    const { userId, itineraryId } = req.body;

    // This checks if the jwt token is expired. If it is, it sends a 200 response with an error message and an empty jwtToken
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The jwt token is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    // checks for missing fields in the request body. If any are missing, it sends a 400 error response
    if (!userId || !itineraryId) {
      return res
        .status(400)
        .json({ error: "User ID and Event ID are required" });
    }

    try {
      //This goes through the Events collection and deletes the event with the matching userId and eventId
      const result = await Itinerary.deleteOne({
        UserId: userId,
        ItineraryId: itineraryId,
      });

      // If no event is found, a message is sent back to the user
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "Event not found or already deleted" });
      }

      //If the event is successfully deleted, a message is sent back to the user
      res.status(200).json({ message: "Event successfully deleted" });
    } catch (e) {
      // handle any errors that occur during itinerary deletion
      res.status(500).json({ error: e.toString() });
    }
  });

  //This function is used to search for events in the Events collection
  app.post("/api/searchItinerary", async (req, res, next) => {

    // incoming: userId, (optional) date, location, time
    // outgoing: list of matching events or error message
    const { userId, search } = req.body;

    //This checks if the userId is provided in the request body. If not, it sends a 400 error response
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      //This query is used to search for events with the matching userId, date, location, and time (if provided)
      let query = { UserId: userId };

      if (search && search.trim().length > 0) {
        // This regex will match any itinerary title that contains the search term (case-insensitive)
        query["Itinerary.title"] = {
          $regex: search.trim(),
          $options: "i",
        };
      }

      //The results of the query are stored in the results variable
      const results = await Itinerary.find(query);

      //The results are then sent back to the user
      res.status(200).json({ Itineraries: results, error: "" });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  // This endpoint is used to edit user information
  app.post("/api/editUser", async (req, res, next) => {

    // incoming: userId, newfirstName, newlastName, newEmail
    // outgoing: success/error message
    const { userId, firstName, lastName, email, password, jwtToken } = req.body;

    // This checks if the userId is provided in the request body. If not, it sends a 400 error response
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Build update object and check that at least one field is provided.
    const updateData = {};
    if (firstName) updateData.FirstName = firstName;
    if (lastName) updateData.LastName = lastName;

    if (email) {
      // Check if the email is already taken
      const existingUser = await User.findOne({ Email: email });
      if (existingUser && existingUser.UserId !== userId) {
        return res.status(400).json({ error: "Email is already taken" });
      }
      updateData.Email = email;
    }

    if (password) updateData.Password = password;
    /*const bcrypt = require('bcrypt');
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.Password = hashedPassword;
    }*/

    try {
      // This query is used to update the user with the matching userId
      const result = await User.findOneAndUpdate(
        { UserId: userId },
        { $set: updateData }
      );

      // send response
      res
        .status(200)
        .json({ change: result, message: "User updated successfully" });
    } catch (e) {
      // handle any errors that occur during user update
      console.error("Error updating user:", e);
      res.status(500).json({ error: e.toString() });
    }
  });

  app.post("/api/get-user", async (req, res) => {
    // incoming: userId
    // outgoing: userId, firstName, lastName, email, error message
    const { userId } = req.body;

    // check for missing fields in the request body. If any are missing, it sends a 400 error response
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      // This query is used to find the user with the matching userId
      const user = await User.findOne({ UserId: userId });

      // If no user is found, a message is sent back to the user
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // refresh the JWT token
      res.status(200).json({
        userId: user.UserId,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
      });
    } catch (e) {
      // handle any errors that occur during user retrieval
      res.status(500).json({ error: e.toString() });
    }
  });

  app.post("/api/editItinerary", async (req, res, next) => {

    // incoming: userId, itineraryID, itineraryNode
    // outgoing: success/error message
    const { userId, itineraryId, newItinerary, jwtToken } = req.body;

    // check for missing fields in the request body. If any are missing, it sends a 400 error response
    if (!userId || !itineraryId || !newItinerary) {
      return res.status(400).json({ error: "All fields required" });
    }

    // error variable
    var error = "";

    try {
      // This query is used to update the itinerary with the matching userId and itineraryId
      const result = await Itinerary.updateOne(
        { UserId: userId, ItineraryId: itineraryId },
        { $set: { Itinerary: newItinerary } }
      );

      // send response
      res.status(200).json({
        message: "Itinerary updated successfully",
        result: result,
      });
    } catch (e) {
      // handle any errors that occur during itinerary update
      error = e.toString();
      res.status(500).json({ error: error });
    }
  });

  // Endpoint for generating travel itinerary using Gemini
  app.post("/api/generate-itinerary", async (req, res) => {
    const { destination, duration, groupSize, preferences, jwtToken } =
      req.body;

    try {
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

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      function extractJsonFromCodeFences(str) {
        const regex = /```(?:json)?\s*([\s\S]*?)\s*```/;
        const match = str.match(regex);
        if (match && match[1]) {
          return match[1].trim();
        }
        return str.trim();
      }

      const cleanedText = extractJsonFromCodeFences(text);
      // Parse the JSON response
      let itinerary;
      try {
        itinerary = JSON.parse(cleanedText);

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

        // Fetch an image for the destination
        const imageUrl = await fetchUnsplashImage(destination);

        // Add the image URL to the itinerary
        itinerary.image = imageUrl;

        // Add default values for required fields if they're missing
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

  function extractCost(line) {
    const costMatch = line.match(/\$\d+/);
    return costMatch ? costMatch[0] : "";
  }

  // Test email endpoint
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Check environment variables
      if (!process.env.SENDGRID_API_KEY) {
        console.error("SENDGRID_API_KEY is not set in environment variables");
        return res.status(500).json({
          error: "Email service not configured",
          details: "SENDGRID_API_KEY is missing",
        });
      }

      if (!process.env.SENDGRID_FROM_EMAIL) {
        console.error(
          "SENDGRID_FROM_EMAIL is not set in environment variables"
        );
        return res.status(500).json({
          error: "Email service not configured",
          details: "SENDGRID_FROM_EMAIL is missing",
        });
      }

      if (!process.env.FRONTEND_URL) {
        console.error("FRONTEND_URL is not set in environment variables");
        return res.status(500).json({
          error: "Email service not configured",
          details: "FRONTEND_URL is missing",
        });
      }

      // Generate a test token
      const testToken = emailService.generateToken();

      // Send test verification email
      const emailSent = await emailService.sendVerificationEmail(
        email,
        testToken
      );

      if (emailSent) {
        res.status(200).json({
          message: "Test email sent successfully",
          token: testToken, // For testing purposes
        });
      } else {
        res.status(500).json({
          error: "Failed to send test email",
          details: "Check server logs for more information",
        });
      }
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({
        error: "Failed to send test email",
        details: error.message,
        stack: error.stack,
      });
    }
  });
};
