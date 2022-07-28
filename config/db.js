//Linking Our app to MongoDB

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
    
        });
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;