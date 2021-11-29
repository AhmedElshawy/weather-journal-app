// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port , listening);
function listening(){
    console.log(`app is listening at: http://localhost:${port}`);
    console.log('The server is running');
};

// Respond with js object containing the final resualt when a GET request is made
app.get('/results', function(req , res){
    res.send(projectData);
});


// create post route
app.post('/postRoute' , callBack);
function callBack(req , res){
    console.log(req.body);
    projectData.temp = req.body.temp
    projectData.date = req.body.date
    projectData.feelings = req.body.feelings
    projectData.city = req.body.city
    res.end();
}