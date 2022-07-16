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
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    ]], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, phone, type} = req.body;

        try {
            newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })
            const contact = await newContact.save();
            res.json({contact});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
            
        }
});

//@route    PATCH api/contacts/:id 
//@desc     Update a contact
//@access   Private
router.patch('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;

    //Create Contact Field Object
    const contactFields = {};
    if (name){
        contactFields.name = name;
    }
    if (email){
        contactFields.email = email;
    }
    if (phone){
        contactFields.phone = phone;
    }
    if (type){
        contactFields.type = type;
    }
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({msg: "Contact not found"})
        }

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
          );

        res.json({contact});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
});

//@route    DELETe api/contacts/:id 
//@desc     Delete a contact
//@access   Private
router.delete('/:id', auth, (req, res) => {
    res.send('Delete a contact');
});


module.exports = router;