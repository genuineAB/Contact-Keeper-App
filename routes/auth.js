const express = require('express');

// Create Router Object to Handle Request
const router = express.Router();

//@route    GET api/auth 
//@desc     Get logged in user
//@access   Private
router.get('/', (req, res) => {
    res.json({'user': 'get a user'});
});

//@route    POST api/auth 
//@desc     Authorise a user and get token
//@access   Public
router.post('/', (req, res) => {
    res.send('Log in User');
});


module.exports = router;