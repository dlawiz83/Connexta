const asyncHandler = require('express-async-handler');
const Interaction = require('../models/InteractionsModel');
const Contact = require('../models/ContactsModel');

// @desc    Create new interaction
// @route   POST /api/interactions
// @access  Private
const setInteraction = asyncHandler(async (req, res) => {
  const { contactId, type, channel, contentSnippet, date, outcome, nextActionAt } = req.body;

  if (!contactId || !type) {
    res.status(400);
    throw new Error('Please provide contactId and type');
  }

  //  Verify contact belongs to the user
  const contact = await Contact.findById(contactId);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  //  Create the interaction
  const interaction = await Interaction.create({
    userId: req.user._id,
    contactId,
    type,
    channel,
    contentSnippet,
    date,
    outcome,
    nextActionAt,
  });

  //  Update contact's timestamps
  contact.lastInteractionAt = date || new Date();
  if (nextActionAt) contact.nextActionAt = nextActionAt;
  await contact.save();

  res.status(201).json(interaction);
});

// @desc    Get interactions for a contact
// @route   GET /api/interactions?contactId=...
// @access  Private
const getInteractions = asyncHandler(async (req, res) => {
  const { contactId } = req.query;

  if (!contactId) {
    res.status(400);
    throw new Error('Please provide contactId');
  }

  const interactions = await Interaction.find({
    userId: req.user._id,
    contactId,
  }).sort({ date: -1 });

  res.status(200).json(interactions);
});

// @desc    Update interaction
// @route   PATCH /api/interactions/:id
// @access  Private
const updateInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  if (!interaction) {
    res.status(404);
    throw new Error('Interaction not found');
  }
  if (interaction.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedInteraction = await Interaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedInteraction);
});

// @desc    Delete interaction
// @route   DELETE /api/interactions/:id
// @access  Private
const deleteInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  if (!interaction) {
    res.status(404);
    throw new Error('Interaction not found');
  }
  if (interaction.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Interaction.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Interaction removed' });
});

module.exports = {
  setInteraction,
  getInteractions,
  updateInteraction,
  deleteInteraction,
};
