
const Note = require('../models/note.model')

//Create and save a new note
exports.create = (req,res)=>{
    //Validate request
    if(!req.body.content){
        return res.status(400).send({
            message : 'Note content cannot be empty'
        });
    }

    //Create a note
    const note = new Note({
        title : req.body.title || "Untitle note",
        content : req.body.content
    });

    //Save note in the database
    note.save()
    .then(data =>{ res.send(data)})
    .catch(err=>{ res.status(500).send({
        message : err.message || "Some error occured while creating the note"
    });
});
};

//Retrieve and return all Notes from the database
exports.findAll =(req,res)=>{
    Note.find()
    .then(notes=>{
        res.send(notes);
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message ||"Some error occured while retrieving notes"
        });
    });

};

//Find a single note with a noteId
exports.findOne =(req,res)=>{
    Note.findById(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message : "Note not found with Id: " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err=>{
        if(err.kind === 'objectId'){
            return res.status(404).send({
                message : "Note not found with Id: "+ req.params.noteId
            });
        }
        return res.status(500).send({
            message : "Error retrieving note with Id: "+ req.params.noteId
        });
    });

};

//Update a note identified by the noteId in the request
exports.update =(req,res)=>{
    //Validate request
    if(!req.body.content){
        return res.status(400).send({
            message : "Note content cannot be empty"
        });
    }
    //Find note and update it with the request body
    Note.findAllandUpdate(req.params.noteId,{
        title : req.body.title ||"Untitled Note",
        content : req.body.content
    }, {new : true})
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message : "Note not found with Id: "+req.params.noteId
            });
        }
        res.send(note)
    })
    .catch(err=>{
        if(err.kind === 'objectId'){
            return res.status(404).send({
                message : "Note not found with Id: "+ req.params.noteId
            });
        }
        return res.status(500).send({
            message : "Error updating note with Id: "+ req.params.noteId
        });
    });

};

//Delete a note with the specified noteId in the request
exports.delete =(req,res)=>{
    Note.findByIdAndRemove(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message : "Note not found with Id: "+ req.params.noteId
            });
        }
        res.send({message : "Note deleted successfully!"});
    }).catch(err=>{
        if(err.kind === 'objectId' || err.name === 'Not found'){
            return res.status(404).send({
                message : "Note not found with Id: "+ req.params.noteId
            });
        }
        return res.status(500).send({
            message : "Could not delete note wit Id: "+req.params.noteId
        });
    });

};