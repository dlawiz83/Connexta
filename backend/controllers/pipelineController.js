const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/ContactsModel");

// Predefined stage order
const STAGE_ORDER = [
  "Prospect",
  "Reached Out",
  "Chat Scheduled",
  "Referred",
  "Interviewing",
];

// GET /api/pipeline
// Returns contacts grouped by stage in logical order
const getPipeline = asyncHandler(async (req, res) => {
  try {
    // Ensure userId is ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const pipeline = await Contact.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$stage",
          contacts: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Sort according to STAGE_ORDER
    const sortedPipeline = STAGE_ORDER.map(stage => {
      const stageData = pipeline.find(p => p._id === stage);
      return stageData || { _id: stage, contacts: [], count: 0 };
    });

    res.status(200).json(sortedPipeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { getPipeline };
