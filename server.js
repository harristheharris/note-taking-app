
//importing all our tools and setting them to global const variables

//importing express
const express = require('express');

//importing the path module aloowing us to work with files and directories 
const path = require('path');

//all our fetch request are coming from our index.js so we are importing that
const api = require('./public/assets/js/index.js');

//we stole this cLog from our mini project. It allows us to see what our request
const { clog } = require('./middleware/clog');

const { requestTime } = require('./middleware/requestTime')

//setting our our port to 3001
//the process.env is an object that contains all of the environment vars that are currently set for our process
// we add the '||' to specify that if no environmental vars are set, then the default is 3001
// set environmental var OR 3001
const PORT = process.env.PORT || 3001;

//setting express to a var
const app = express();

//the use() function is used to mount the middleware functions at a specified path
//app.use() load the middleware function and the specifies the function to be used
app.use(clog);

//read the last set of notes but this time we are timestamping when the request is made
app.use(requestTime);

//parsing the json in middleware
app.use(express.json());

//parsing the urlencoded data
//the 'extended: true' returns middleware that only parses JSON which is all we need for now I THINK
app.use(express.urlencoded({ extended: true}));

app.use('/api' , api);

app.use(express.static('public'));

//GET route for the homepage
app.get('/', (req , res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

//GET route for notes

app.get('/notes' , (req , res) => 
    res.sendFile(path.join(__dirname , '/public/notes.html'))

)




