const User  = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
}


//POST api/auth/register
exports.registerUser  = async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({msg: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, password: hashed});
        //201: Created — request successful and new resource was created
        res.status(201);
        res.json({
            msg: "User created successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })

        
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
    
}

//POST api/auth/login
exports.loginUser  = async(req,res)=>{
   const {email, password} = req.body;

   try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    })

    
   } catch (error) {
    res.status(500).json({msg: 'Server error'});
    
   }
}
// PUT api/auth/update-profile
// Private (requires valid JWT)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      msg: "Profile updated successfully",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id), // optional: refresh token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
// PUT api/auth/change-password
// Private (requires JWT)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { currentPassword, newPassword } = req.body;

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Current password is incorrect" });

    // Hash new password and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

