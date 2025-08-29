const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getPipeline } = require("../controllers/pipelineController");

router.get("/", protect, getPipeline);

module.exports = router;
