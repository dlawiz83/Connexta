const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const { getContacts, setContact, updateContact, deleteContact} = require('../controllers/contactsController');

router.route('/')
    .get(protect, getContacts)
    .post(protect, setContact);

router.route('/:id')
    .patch(protect, updateContact)
    .delete(protect, deleteContact);


module.exports = router;

