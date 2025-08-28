const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactsModel');
const Interaction = require('../models/InteractionsModel');



// Controller to get upcoming actions
const getActions = asyncHandler(async(req, res) =>{
    try {
        const userId = req.user.id;
        // Get date range: today → today + query.days (default 7)
        const today = new Date();
        const days = parseInt(req.query.days) || 7;
        const endDate = new Date();
        endDate.setDate(today.getDate() + days);
        // Find contacts with nextActionAt in range
    const contacts = await Contact.find({
      userId,
      nextActionAt: { $gte: today, $lte: endDate }
    }).sort({ nextActionAt: 1 });

    // Add latest interaction snippet for each contact
    const results = await Promise.all(
      contacts.map(async (contact) => {
        const latestInteraction = await Interaction.findOne({ contactId: contact._id })
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

    res.json(results);

        
    } catch (error) {
        console.error('Error fetching next actions:', error);
    res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { getActions };