const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactsModel');
const fs = require('fs');
const csv = require('csv-parser');
const Joi = require('joi');


// Define schema
const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().allow(''),
  company: Joi.string().allow(''),
  stage: Joi.string().valid('Prospect','Reached Out','Chat Scheduled','Referred','Interviewing'),
  notes: Joi.string().allow(''),
  lastInteractionAt: Joi.date().optional(),
  nextActionAt: Joi.date().optional(),
});






const importContacts = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('CSV file is required');
  }


  const contacts = [];
  const errors = [];
   fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
  const { error } = contactValidationSchema.validate(row, { allowUnknown: true });
  if (error) {
    errors.push({ row, reason: error.details[0].message });
  } else {
    contacts.push({
      userId: req.user._id,
      name: row.name,
      title: row.title || '',
      company: row.company,
      email: row.email,
      linkedinURI: row.linkedinURI || '',
      timeZone: row.timeZone || '',
      stage: row.stage || 'Prospect',
      notes: row.notes || '',
      lastInteractionAt: row.lastInteractionAt ? new Date(row.lastInteractionAt) : null,
      nextActionAt: row.nextActionAt ? new Date(row.nextActionAt) : null,
    });
  }
})
    .on('end', async () => {
      if (contacts.length > 0) {
        await Contact.insertMany(contacts);
      }

      // Delete the file after processing
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        imported: contacts.length,
        errors,
      });
    });
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
const setContact = asyncHandler(async(req, res )=>{
  const { error } = contactValidationSchema.validate(req.body);
if (error) {
  res.status(400);
  throw new Error(error.details[0].message);
}
    const { name, title, company, email, linkedinURI, timeZone, stage, notes, lastInteractionAt, nextActionAt } = req.body;
    if(!name){
        res.status(400)
        throw new Error('Please provide name')
    }
    const newContact  = await Contact.create({
        userId: req.user._id,
        name,
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



// @desc    Get all contacts for logged-in user with filters & sorting
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const { company, stage, notes, sort } = req.query;

  const query = { userId: req.user._id };

  // Filtering
  if (company) query.company = company;
  if (stage) query.stage = stage;
  if (notes) query.notes = { $regex: notes, $options: "i" };

  // Sorting
  let sortObj = { nextActionAt: 1 }; // default
  if (sort) {
    const allowedSorts = ["nextActionAt", "name", "company", "createdAt"];
    sortObj = allowedSorts.includes(sort) ? { [sort]: 1 } : { nextActionAt: 1 };
  }

  // Fetch contacts
  const contacts = await Contact.find(query).sort(sortObj);

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

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact removed' });
});



module.exports = {
    setContact,
    getContacts,
    updateContact,
    deleteContact,
    importContacts
   
};


