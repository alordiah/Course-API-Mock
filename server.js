const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const courses = require('./response.js')

//lets us send/receive JSON response
app.use(bodyParser.json());

//sets up cors request
const cors = require('cors');
app.use(cors());

//initates and sets our port
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});



app.get('/', async (req, res) => {
  //the star here is a wildcard, it means we are accepting request from any IP. This is typically unsafe to use in production.
  res.header("Access-Control-Allow-Origin", "*");
  const query = req.body;
  const response = await handleGetCourses(query.id);
  res.status(200).send(response)
  });

function handleGetCourses (query){
    let response;
    try {
      for (const course of courses.courses){
       if (query == course.id) response = course;
       // else response = "Amigo, we can't find that course";
      }
    } catch (error) {
      console.log(error);
    }
    return response;

}

module.exports = app;
