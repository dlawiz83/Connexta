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

