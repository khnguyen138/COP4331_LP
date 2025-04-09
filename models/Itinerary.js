const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  UserId: {
    type: Number,
    required: true
  },
  Itinerary: {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    groupSize: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    dailyBreakdown: [
      {
        day: {
          type: Number,
          required: true,
        },
        // Here is the crucial part: we store an array of objects, not an array of strings
        activities: [
          {
            time: { type: String, required: true },
            activity: { type: String, required: true },
            location: { type: String },
            details: { type: String },
            cost: { type: String }
          },
        ]
      },
    ]
  },
  ItineraryId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { collection: "Itineraries" });

module.exports = mongoose.model("Itinerary", itinerarySchema);
