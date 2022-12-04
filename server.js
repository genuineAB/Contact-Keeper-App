// Create an instance of a server
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const cors = require('cors');

const whitelist = [

    "https://contact-keeper-application.netlify.app",
    
    "http://localhost:3000",
    "http://localhost:5000",
    "https://contact-keeper-bnlv.onrender.com"
    
    
  ]
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'), false)
      }
    },
  }
  
  
  // Enable CORS
  app.use(cors(corsOptions));

//Connect DB
connectDB();

//Initialize Middleware
app.use(express.json({extended:false}))


const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

//Serve static assets in production

if(process.env.NODE_ENV === 'production'){
    //
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));