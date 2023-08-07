//imports
// require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const twilio = require('twilio');
const axios = require('axios');




//app.use
app.set("view engine", "ejs");
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: false}));
app.use('/logo.png', express.static('images/logo.png'));
// Parse JSON request bodies
app.use(bodyParser.json());
const apiKey = "49cc8c821cd2aff9af04c9f98c36eb74"; // Replace with your OpenWeatherMap API key


//get requests
app.get("/", async (req, res) => {
  res.render("home");
});

app.post("/sendMessage", async (req, res) => {

  try {
    // Twilio credentials
    const accountSid = 'AC2a3cb139966d8d75610106104fed6e20';
    const authToken = '1f1692a1c6177e9d33291cc7de7ac04c';
    const twilioPhoneNumber = '+12185177579';

    // Create Twilio client
    const client = twilio(accountSid, authToken);

    // Send the message
    const message = await client.messages.create({
      body: 'temp":34.12,"feels_like":37.04,"pressure":996,"humidity":45,"dew_point":20.5,"uvi":0,"clouds":71,"visibility":10000,"wind_speed":3.39', // Replace with the actual message content
      from: twilioPhoneNumber,
      to: "+919968290156"
    });

    // If the message was sent successfully, respond with success message

    // res.json({ success: true, messageSid: message.sid });
    res.render("success");
  } catch (error) {
    // If there was an error sending the message, respond with an error message
    res.status(500).json({ success: false, error: error.message });
  }

});

// app.post("/sendMessage", (req, res) => {
//   console.log("jhgh");
// });


app.get("*", (req, res) => {
  res.send("404");
});

//listen to port
app.listen(process.env.PORT || 3000, () => {
  const port = process.env.PORT;
  console.log(`Server is up and running on port ${port}`);
});