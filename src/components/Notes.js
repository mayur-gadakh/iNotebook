import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import CreateContext from '../context/createContext';
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'



function Notes() {
  let navigate = useNavigate();
  const context = useContext(CreateContext);
  const { notes, getNotes, editNote } = context;


  useEffect(() => {

    if (localStorage.getItem("token")) {

      getNotes();
    }
    else {
      navigate("/login")
    }




  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })


  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags })

  }

  const notify = () => toast("Note Updated Successfully");
  const handleClic = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etags)
    console.log("updated note", note);
    refClose.current.click();
    notify();
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
    //this says that setnote as the targeted name as targeted value
  }

  return (
    <>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etags" name='etags' value={note.etags} onChange={onChange} minLength={3} required />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClic} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNotes></AddNotes>
      <div className='row my-3'>
        <h1> Your Notes </h1>
        <div className='container my-3 mx=3'>
          <h2>{notes.length === 0 && 'No Notes Available'}</h2>
        </div>
        {notes.map((notes, index) => {

          return <NoteItem key={index} updateNote={updateNote} notes={notes}></NoteItem>
        })}
      </div>
    </>
  )
}

export default Notes
