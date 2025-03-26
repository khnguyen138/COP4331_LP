require("express");
require("mongodb");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

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
    //incoming: firstName, lastName, login, password
    //outgoing: userId, firstName, lastName, lo

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
      userId = await generateUserIdFromMongo(login, db);
      newUser = {
        Login: login,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        UserId: userId,
      };
      const result = db.collection("Users").insertOne(newUser);
    } catch (e) {
      error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
  });

  // app.post('/api/login', async(req, res, next) =>
  // {
  //     //incoming: login, password
  //     //outgoing: id, firstName, lastName, error

  //     var error = '';

  //     const{ login, password } = req.body;

  //     const db = client.db('TravelGenie');
  //     const results = await db.collection('Users').find({Login: login, Password: password}).toArray();

  //     var id = -1;
  //     var fn = '';
  //     var ln = '';

  //     if(results.length > 0)
  //     {
  //         id = results[0].UserId;
  //         fn = results[0].FirstName;
  //         ln = results[0].LastName
  //     }
  //     else
  //     {
  //         error = 'Invalid user name/password';
  //     }

  //     var ret = { id:id, firstName:fn, lastName:ln, error:''};
  //     res.status(200).json(ret);
  // });

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


  //ENDPOINT FOR GENERATING TRAVEL PLAN USING GEMINI
  app.post("/api/generate-trip", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

      const result = await model.generateMessage({
        messages: [{ content: prompt }],
      });

      const response = result.candidates[0]?.content || "No response received.";
      res.status(200).json({ suggestion: response });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });


};
