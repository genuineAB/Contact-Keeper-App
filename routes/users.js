const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// Create Router Object to Handle Request
const router = express.Router();

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password should be a minimum of 8 characters').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send('passed')
});

module.exports = router;