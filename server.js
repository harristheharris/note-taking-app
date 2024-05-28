
//importing all our tools and setting them to global const variables
//importing express
const express = require('express');
//importing the path module aloowing us to work with files and directories 
const path = require('path');
const fs = require('fs');
const theNotes = require('./db/db.json')
//all our fetch request are coming from our index.js so we are importing that
// const api = require('./public/assets/js/index.js');
// //we stole this cLog from our mini project. It allows us to see what our request
const { clog } = require('./middleware/clog');
const { requestTime } = require('./middleware/requestTime');
const { log } = require('console');


//setting express to a var
const app = express();
//setting our our port to 3001
//the process.env is an object that contains all of the environment vars that are currently set for our process
// we add the '||' to specify that if no environmental vars are set, then the default is 3001
// set environmental var OR 3001
//heroku stuff
const PORT = process.env.PORT || 3001;




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

//app.use('/api' , api);

app.use(express.static('public'));

// GET:api route to get the notes
app.get('/api/notes', (req, res) => {
    res.json(theNotes.slice(1))
})

//GET:html route for the homepage
app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//GET:html route for notes
app.get('/notes' , (req , res) => {
    res.sendFile(path.join(__dirname , '/public/notes.html'))
})

//GET:html wild card route. a defualt
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//the function that creates the new notes submitted by the user
function createAnotherNote(reqBody, notesArray){
    const aNote = reqBody;

    //if aNote is NOT and array then make it one
    if(!Array.isArray(notesArray)) {
        aNote = []; 
    }

    //if our theNotes (which we are passing to the function) has length of zero then we push and empty array to it
    if(notesArray.length === 0) {
        notesArray.push(0);
    }

    body.id = notesArray[0];
    notesArray[0]++

    notesArray.push(aNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray)
    );

    return aNote;


    
}


//POST:api create a post to post the new note submitted
app.post('/api/notes' , (req, res) => {
    const newNote = createAnotherNote(req.body, theNotes)
    res.json(newNote)
})


app.listen(PORT , () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

