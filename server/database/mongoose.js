// Require the library
const mongoose = require('mongoose');

// Here we are using the MongoDB URL (i.e., MongoDB Atlas)
const db = MONGOOSELINK

// Create an async function to handle the connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(db, {
         
        });
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
};

// Call the async function to connect to the database
connectToDatabase();


module.exports = mongoose.connetcion;



// id ajayagrawal728
// password y51gLBiA7QMkzKk6

// MONGO_URL ='mongodb+srv://hasmuddin97175:X8mByhvnmc1USy77@cluster0.wwptqgh.mongodb.net/todo?retryWrites=true&w=majority'

