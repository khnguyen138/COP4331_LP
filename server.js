const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

/*
const mongoose = require("mongoose");
mongoose.connect(url)
  .then(()=> console.log("Mongo DB connected"))
  .catch(err => console.log(err));
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

var api = require("./api.js");

api.setApp(app, client);
// for applying mongoose
// api.setApp(app, mongoose);

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

app.listen(5000);
