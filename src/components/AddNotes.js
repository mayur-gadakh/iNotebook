import React, { useState } from 'react'
import CreateContext from '../context/createContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddNotes = () => {

    const context = useContext(CreateContext);
    //in this context there are the values of the addnote,editnote,deletenote
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })
    const notify = () => toast("Note Added Successfully");


    const handleClic = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setNote({ title: "", description: "", tags: "" })
        notify();
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        //this says that setnote as the targeted name as targeted value
    }

    return (
        <div>
            <h1>Add The  Notes</h1>
            <form>
                <div className="mb-3 my3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tags" name='tags' value={note.tags} onChange={onChange} required />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClic}>Add Note</button>
            </form>
        </div>
    )

}

export default AddNotes
