const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  session_id: String,
  event_type: String,
  page_url: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  x: Number,
  y: Number
});

module.exports = mongoose.model("Event", EventSchema);