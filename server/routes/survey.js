const express = require("express");
const Survey = require("../models/surveyModel");

const router = express.Router();

router.post('/submit-survey', async (req, res) => {
  try {
    // Destructure the required fields from req.body
    const { name, gender, nationality, email, phone, address, message } = req.body;

    // Create a new instance of the Survey model
    const newSurvey = new Survey({
      name, gender, nationality, email, phone, address, message
    });

    // Save the new survey to the database
    await newSurvey.save();

    // Send a response indicating success
    res.status(201).json({ status:true ,  message: "Message sent successfully. We will connect soon.", survey: newSurvey });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ status:false ,  message: "Internal error", error: error.message });
  }
});



// Fetch all surveys
router.get('/all-surveys', async (req, res) => {
    try {
      // Retrieve all surveys from the database
      const allSurveys = await Survey.find();
  
      // Send the list of surveys as a response
      res.status(200).json({ surveys: allSurveys });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({ message: "Internal error", error: error.message });
    }
  });

module.exports = router;
