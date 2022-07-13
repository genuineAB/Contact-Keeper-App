// Create an instance of a server
const express = require('express');

const app = express();

// Initiating localhost:5000
app.get('/', (req, res) => res.json({'msg': 'Welcome to the Contact Keeper App'}));

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));