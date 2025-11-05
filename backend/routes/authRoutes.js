const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); 
const { registerUser, loginUser, updateProfile, changePassword } = require('../controllers/authController');

router.post('/signup' , registerUser);
router.post('/login', loginUser);
router.put("/update-profile", protect, updateProfile); 
router.put("/change-password", protect, changePassword);

module.exports = router;

