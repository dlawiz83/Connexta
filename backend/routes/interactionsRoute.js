const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { setInteraction, getInteractions, updateInteraction, deleteInteraction } = require('../controllers/interactionsController');

router.route('/')
    .get(protect, getInteractions)
    .post(protect, setInteraction);

router.route('/:id')
    .patch(protect, updateInteraction)
    .delete(protect, deleteInteraction);

module.exports = router;
