const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactsModel');
const Interaction = require('../models/InteractionsModel');

const getActions = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Normalize date range (start of today to end of +days)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = parseInt(req.query.days) || 7;
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + days);
    endDate.setHours(23, 59, 59, 999);

    // Find contacts with nextActionAt in range
    const contacts = await Contact.find({
      user: userId,
      nextActionAt: { $gte: today, $lte: endDate },
    }).sort({ nextActionAt: 1 });

    // Attach next action + last interaction info
    const results = await Promise.all(
      contacts.map(async (contact) => {
        // Find the interaction that scheduled this nextActionAt
        const nextAction = await Interaction.findOne({
          contactId: contact._id,
          nextActionAt: contact.nextActionAt,
        }).select('contentSnippet');

       
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
          lastInteractionAt: contact.lastInteractionAt,
          nextActionSnippet: nextAction?.contentSnippet || null,
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
