const express = require('express');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create Router Object to Handle Request
const router = express.Router();

//@route    GET api/contacts 
//@desc     Get all user contacts
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json({contacts});
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Server Error")
    }
    
    
});

//@route    POST api/contacts 
//@desc     Add a contact
//@access   Private
router.post('/', auth, (req, res) => {
    res.send('Add a contact');
});

//@route    PATCH api/contacts/:id 
//@desc     Update a contact
//@access   Private
router.patch('/:id', auth, (req, res) => {
    res.send('Update contact details');
});

//@route    DELETe api/contacts/:id 
//@desc     Delete a contact
//@access   Private
router.delete('/:id', auth, (req, res) => {
    res.send('Delete a contact');
});


module.exports = router;