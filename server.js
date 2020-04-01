const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json());

//configuring the database
const dbConfig = require('./config/database.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//connectign to database
mongoose.connect(dbConfig.url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Successfully connected to the database")
}).catch(err =>{
    console.log('Could not connect to the database. Exiting now ...', err)
    process.exit();
});

//define a simple route
app.get('/',(req,res,next)=>{
    res.json({"message":"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."})
    console.log(req.body)
});

require('./app/routes/note.routes')(app);

//listen for requests
app.listen(3030,()=>{
    console.log('Server listening on port: 3030');
});