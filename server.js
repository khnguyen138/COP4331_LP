const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB connection string from environment variables
const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");

/*
mongoose.connect(url)
  .then(()=> console.log("Mongo DB connected"))
  .catch(err => console.log(err));
*/

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Using Express’s built-in JSON parser

// var api = require("./api.js");

// api.setApp(app, client);
// for applying mongoose
// api.setApp(app, mongoose);

// Middleware to parse JSON request bodies
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

async function startServer() {
  try {
    
    /*await client.connect();
    console.log("Connected to MongoDB");
    const dbInstance = client.db("TravelGenie");*/

    // Mongoose connection
    mongoose.connect(url)
    .then(()=> console.log("Mongo DB connected"))
    .catch(err => console.log(err));
    
    // Pass both the app and the db instance to your API module
    const api = require("./api.js");
    api.setApp(app, mongoose);

    // set server port and start listening
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    // Handle connection errors 
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Start the server and connect to MongoDB
startServer(); 
