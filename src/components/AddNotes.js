import React, { useState } from 'react'
import CreateContext from '../context/createContext';
import { useContext } from 'react';


const AddNotes = () => {
    const context = useContext(CreateContext);
    //in this context there are the values of the addnote,editnote,deletenote
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tags: "default" })

    const handleClic = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tags);
       
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
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClic}>Submit</button>
            </form>
        </div>
    )
}

export default AddNotes
