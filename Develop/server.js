
//importing all our tools and setting them to global const variables

//importing express
const express = require('express');

//importing the path module aloowing us to work with files and directories 
const path = require('path');

//all our fetch request are coming from our index.js so we are importing that
const api = require('./public/assets/js/index');

//we stole this cLog from our mini project. It allows us to see what our request
const { clog } = require('./middleware/clog');

//setting our our port to 3001
//the process.env is an object that contains all of the environment vars that are currently set for our process
// we add the '||' to specify that if no environmental vars are set, then the default is 3001
// set environmental var OR 3001
const PORT = process.env.PORT || 3001;

//setting express to a var
const app = express();

//the use() function is used to mount the middleware functions at a specified path
app.use(clog);

