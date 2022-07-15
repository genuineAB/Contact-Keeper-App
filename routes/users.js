const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  '/',
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      
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
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const { body, validationResult } = require('express-validator');

// // Create Router Object to Handle Request
// const router = express.Router();

// //@route    POST api/users
// //@desc     Register a user
// //@access   Public
// router.post('/', 
//     body('name', 'Name is required').not().isEmpty(),
//     body('email', 'Please include a valid email').isEmail(),
//     body('password', 'Password should be a minimum of 8 characters').isLength({min: 6}),
//     async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()})
//     }

//     const {name, email, password} = req.body;
//     // console.log(User)
//     try {
//         // Check if email alredy exist
        
//         let user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({message: "User already exist"})
//         }
//         // Creating a new user
//         user = new User({
//             name,
//             email,
//             password
//         })
//         // Encrypting password
//         const salt = await bcrypt.genSalt(100);
//         user.password = await bcrypt.hash(password, salt);
//         // console.log(salt);
//         // console.log(user.password);
//         //Save User
//         await user.save();
//         res.send('saved');
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error')
//     }
    
// });

// module.exports = router;