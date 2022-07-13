const express = require('express');

// Create Router Object to Handle Request
const router = express.Router();

//@route    GET api/contacts 
//@desc     Get all user contacts
//@access   Private
router.get('/', (req, res) => {
    res.json({'contact': 'All user contact'});
});

//@route    POST api/contacts 
//@desc     Add a contact
//@access   Private
router.post('/', (req, res) => {
    res.send('Add a contact');
});

//@route    PATCH api/contacts/:id 
//@desc     Update a contact
//@access   Private
router.patch('/:id', (req, res) => {
    res.send('Update contact details');
});

//@route    DELETe api/contacts/:id 
//@desc     Delete a contact
//@access   Private
router.delete('/:id', (req, res) => {
    res.send('Delete a contact');
});


module.exports = router;