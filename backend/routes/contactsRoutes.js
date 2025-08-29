const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

const { getContacts, setContact, updateContact, deleteContact, importContacts} = require('../controllers/contactsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temp folder for CSV
router.route('/')
    .get(protect, getContacts)
    .post(protect, setContact);

router.route('/:id')
    .patch(protect, updateContact)
    .delete(protect, deleteContact);

router.post('/import', protect, upload.single('file'), importContacts);


module.exports = router;

