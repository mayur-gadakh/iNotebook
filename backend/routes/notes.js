const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');//this library is for validation
const fetchUser = require('../middleware/fetchUser')



// ROUTE 1:fetch all notes of the login user /api/notes/fetchAllNotes login is reauired for this
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);

})

// ROUTE 2:add notes to database using post:./api/notes/addNotes login is required for this
router.post('/addNotes', [
    body('title', 'Enter the title'),
    body('description', 'Enter the description'),
    body('tags', 'Enter the tags')
], fetchUser, async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tags, user: req.user.id
        })

        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal  Server error occure' })
    }
})

//ROUTE 3: Update the existing notes with previous notes login of the user is required /note/auth/updateNotes
router.put('/updateNotes/:id', fetchUser, async (req, res) => {

const {title,description,tags}=req.body;

const newNote={};

if(title){newNote.title=title};
if(description){newNote.description=description};
if(tags){newNote.tags=tags};

//find the previous note from database

let  note= await Note.findById(req.params.id);

if(!note){//if there isno id then the note is not found
    return res.status(404).send('Not Found')
}

if(note.user.toString() !==req.user.id){   //if there is id  is no match then the user is not allowed 
return res.status(401).send('Not Allowed')
}
//thi is find the note by using id and update it by new note
note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
res.json({note});//this send the updated note as response

})

//ROUTE 4 :for delete the note from database  from /api/notes/deleteNotes  
router.delete('/deleteNotes/:id', fetchUser, async (req, res) => {


    try {
        
    
    let  note= await Note.findById(req.params.id);//this find the note by using the id

    if(!note){//if there is no id then the note is not found
        return res.status(404).send('Not Found')
    }
    if(note.user.toString() !==req.user.id){   //if there is id  is no match then the user is not allowed 
        return res.status(401).send('Not Allowed')
        }
        note=await Note.findByIdAndDelete(req.params.id);//this find the note using the id and the delete it 
        //this send the response as deleted successful
    } catch (error) {
     res.status(401).send('Internal Server error ')   
    }

})


module.exports = router;