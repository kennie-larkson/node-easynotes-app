const express = require('express');
const bodyParser = require('body-parser');
//create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlEncoded({extended: true}))
// parse requests of content-type - application/json
app.use(bodyParser.json());
//define a simple route
app.get('/',(req,res,next)=>{
    res.json({"message":"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."})
});
//listen for requests
app.listen(3030,()=>{
    console.log('Server listening on port: 3030');
});