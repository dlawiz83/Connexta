const express = require('express');
const router = express.Router();
const { getActions } = require('../controllers/next-actionsController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getActions);

module.exports = router;