const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const surveySchema = new Schema({
    name: String,
    gender: String,
    nationality: String,
    email:{
        type: String, required: true
    } ,
    phone: String,
    address: String,
    message: String,
  });


const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;