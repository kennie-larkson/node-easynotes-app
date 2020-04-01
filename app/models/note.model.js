//defining the data (NoteSchema) model in mongoose

const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title : String,
    content : String
},
{
    timestamps : true
});

module.exports = mongoose.model('Note',NoteSchema)