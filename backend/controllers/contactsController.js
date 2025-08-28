const asyncHandler = require('express-async-handler');
const contact = require('../models/ContactsModel');

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
const setContact = asyncHandler(async(req, res )=>{
    const { name, title, company, email, linkedinURI, timeZone, stage, notes, lastInteractionAt, nextActionAt } = req.body;
    if(!name){
        res.status(400)
        throw new Error('Please provide name')
    }
    const newContact  = await contact.create({
        userId: req.user._id,
         title,
        company,
        email,
        linkedinURI,
        timeZone,
        stage,
        notes,
        lastInteractionAt,
        nextActionAt,
    })
    res.status(201).json(newContact)
})



// @desc    Get all contacts for logged-in user
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
});

// @desc    Update contact by ID
// @route   PATCH /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    // Make sure user owns the contact
    if (contact.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});


// @desc    Delete contact by ID
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    // Make sure user owns the contact
    if (contact.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await contact.remove();
    res.status(200).json({ message: 'Contact removed' });
});

module.exports = {
    setContact,
    getContacts,
    updateContact,
    deleteContact
};


