const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactsModel');
const Interaction = require('../models/InteractionsModel');

// @desc    Get upcoming next actions for a user
// @route   GET /api/next-actions?days=7
// @access  Private
const getActions = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; //  consistent with authMiddleware

    // Define date range (today → today + days)
    const today = new Date();
    const days = parseInt(req.query.days) || 7;
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);

    //  Find contacts with nextActionAt in range
    const contacts = await Contact.find({
      user: userId,
      nextActionAt: { $gte: today, $lte: endDate },
    }).sort({ nextActionAt: 1 });

    //  Attach latest interaction snippets
    const results = await Promise.all(
      contacts.map(async (contact) => {
        const latestInteraction = await Interaction.findOne({
          contactId: contact._id,
        })
          .sort({ date: -1 })
          .select('contentSnippet');

        return {
          contactId: contact._id,
          name: contact.name,
          stage: contact.stage,
          nextActionAt: contact.nextActionAt,
          lastInteractionSnippet: latestInteraction?.contentSnippet || null,
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching next actions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { getActions };
