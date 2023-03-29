import React from 'react'
import { useContext } from 'react';
import CreateContext from '../context/createContext';

const NoteItem = (props) => {
    const { notes } = props;


    const context = useContext(CreateContext);
    //in this context there are the values of the addnote,editnote,deletenote
    const { deleteNote ,editNote} = context;
    const handleDel=()=>{
        deleteNote(notes._id);
    }

    const handleEdit=()=>{
        editNote(notes._id,notes.title,notes.description,notes.tags)
    }
    return (
        <>
        <div className='col-md-3 my-3'>

            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>

                    <i className="fa-solid fa-trash mx-3" onClick={handleDel}></i>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={handleEdit}></i>


                </div>
            </div>

        </div>
        </>
    )
}

export default NoteItem
