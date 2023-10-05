import React from 'react'
import { useContext } from 'react';
import CreateContext from '../context/createContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteItem = (props) => {


    const { notes, updateNote } = props;
    const context = useContext(CreateContext);
    //in this context there are the values of the addnote,editnote,deletenote 
    const { deleteNote } = context;
    const notify = () => toast("Note Deleted Successfully");


    return (
        <>
            <div className='col-md-3 my-3'>

                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="card-text">{notes.description}</p>
                        <i className="fa-solid fa-trash mx-3" onClick={() => { deleteNote(notes._id); notify() }}></i>
                        <i className="fa-regular fa-pen-to-square mx-3" onClick={() => { updateNote(notes) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
