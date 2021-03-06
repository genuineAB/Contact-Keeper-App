const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// Create Router Object to Handle Request
const router = express.Router();

//@route    GET api/auth 
//@desc     Get logged in user
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    POST api/auth 
//@desc     Authorise a user and get token
//@access   Public
router.post('/', [
    check("email", "Please include a valid Email").isEmail(),
    check('password', "Please include a password").exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body

    //Validating User
    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid Credentials"})
        }

        //Responding with JSON Web Token Payload
        const payload = {
            user:{
            id : user.id
            }
        }
        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 360000
            }, (err, token) => {
                if(err){
                throw err; 
                }
                res.json({token})
        })

    } catch (error) {
        console.error(error.msg);
        res.status(500).send('Server Error');
        
    }
});


module.exports = router;