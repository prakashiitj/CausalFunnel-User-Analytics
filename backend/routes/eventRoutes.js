const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// Save Event
router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();

    res.status(201).json({
      message: "Event saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
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
          totalEvents: { $sum: 1 },
          lastActivity: { $max: "$timestamp" },
        },
      },
      {
        $sort: {
          totalEvents: -1,
          lastActivity: -1,
        },
      },
    ]);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get all events of a session
router.get("/session/:id", async (req, res) => {
  try {
    const events = await Event.find({
      session_id: req.params.id,
    }).sort({ timestamp: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Heatmap Data (ALL clicks)
router.get("/heatmap", async (req, res) => {
  try {
    const clicks = await Event.find({
      event_type: "click",
    });

    res.json(clicks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Analytics Overview
router.get("/stats", async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const totalSessions = await Event.distinct("session_id");

    const totalClicks = await Event.countDocuments({
      event_type: "click",
    });

    const totalPageViews = await Event.countDocuments({
      event_type: "page_view",
    });

    res.json({
      totalEvents,
      totalSessions: totalSessions.length,
      totalClicks,
      totalPageViews,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Event Type Distribution
router.get("/event-distribution", async (req, res) => {
  try {
    const distribution = await Event.aggregate([
      {
        $group: {
          _id: "$event_type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.json(distribution);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Top Pages
router.get("/top-pages", async (req, res) => {
  try {
    const pages = await Event.aggregate([
      {
        $group: {
          _id: "$page_url",
          visits: { $sum: 1 },
        },
      },
      {
        $sort: {
          visits: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(pages);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;