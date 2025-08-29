const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const multer = require('multer');


const { getContacts, setContact, updateContact, deleteContact, importContacts} = require('../controllers/contactsController');


const upload = multer({ dest: 'uploads/', limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB // temp folder for CSV
router.route('/')
    .get(protect, getContacts)
    .post(protect, setContact);

router.route('/:id')
    .patch(protect, updateContact)
    .delete(protect, deleteContact);

router.post('/import', protect, upload.single('file'), importContacts);


module.exports = router;

