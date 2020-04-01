
module.exports =(app)=>{
    const notes = require('../controllers/note.controller');

    //Create a new note
    app.post('/notes', notes.create);

    //Retrieve all the  notes
    app.get('/notes', notes.findAll);

    //Retrieve a single note with noteId
    app.get('/notes/:noteId', notes.findOne);

    //Update a note with noteId
    app.put('/notes', notes.update);

    //Delete a note with noteId
    app.delete('/notes', notes.delete);
}