const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// Save Event
router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();

    res.status(201).json({
      message: "Event saved successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Get all sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          totalEvents: { $sum: 1 }
        }
      }
    ]);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Get all events of a session
router.get("/session/:id", async (req, res) => {
  try {
    const events = await Event.find({
      session_id: req.params.id
    }).sort({ timestamp: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Heatmap data
router.get("/heatmap", async (req, res) => {
  try {
    const page = req.query.page;

    const clicks = await Event.find({
      page_url: page,
      event_type: "click"
    });

    res.json(clicks);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;