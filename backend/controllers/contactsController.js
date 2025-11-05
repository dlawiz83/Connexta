const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactsModel");
const fs = require("fs");
const csv = require("csv-parser");
const Joi = require("joi");

// Validation schema
const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().allow(""),
  company: Joi.string().allow(""),
  stage: Joi.string().valid("Prospect", "Reached Out", "Chat Scheduled", "Referred", "Interviewing"),
  notes: Joi.string().allow(""),
  lastInteractionAt: Joi.date().optional(),
  nextActionAt: Joi.date().optional(),
});

// Import contacts (CSV)
const importContacts = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("CSV file is required");
  }

  const contacts = [];
  const errors = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const { error } = contactValidationSchema.validate(row, { allowUnknown: true });
      if (error) {
        errors.push({ row, reason: error.details[0].message });
      } else {
        contacts.push({
          user: req.user._id,
          name: row.name,
          title: row.title || "",
          company: row.company || "",
          email: row.email || "",
          linkedinURI: row.linkedinURI || "",
          timeZone: row.timeZone || "",
          stage: row.stage || "Prospect",
          notes: row.notes || "",
          lastInteractionAt: row.lastInteractionAt ? new Date(row.lastInteractionAt) : null,
          nextActionAt: row.nextActionAt ? new Date(row.nextActionAt) : null,
        });
      }
    })
    .on("end", async () => {
      if (contacts.length > 0) await Contact.insertMany(contacts);
      fs.unlinkSync(req.file.path);
      res.status(200).json({ imported: contacts.length, errors });
    });
});

// Create new contact
const setContact = asyncHandler(async (req, res) => {
  const { error } = contactValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { name, title, company, email, linkedinURI, timeZone, stage, notes, lastInteractionAt, nextActionAt } = req.body;

  const newContact = await Contact.create({
    user: req.user._id,
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
  });

  res.status(201).json(newContact);
});

// Get contacts for logged-in user
const getContacts = asyncHandler(async (req, res) => {
  const { company, stage, notes, sort } = req.query;
  const query = { user: req.user._id };

  if (company) query.company = company;
  if (stage) query.stage = stage;
  if (notes) query.notes = { $regex: notes, $options: "i" };

  let sortObj = { nextActionAt: 1 };
  if (sort) {
    const allowedSorts = ["nextActionAt", "name", "company", "createdAt"];
    sortObj = allowedSorts.includes(sort) ? { [sort]: 1 } : sortObj;
  }

  const contacts = await Contact.find(query).sort(sortObj);
  res.status(200).json(contacts);
});

// Update contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedContact);
});

// Delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact removed" });
});

module.exports = {
  setContact,
  getContacts,
  updateContact,
  deleteContact,
  importContacts,
};
