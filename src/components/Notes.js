import React from 'react';
import { useContext } from 'react';
import CreateContext from '../context/createContext';
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';


function Notes() {
  const context = useContext(CreateContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNotes></AddNotes>
      <div className='row my-3'>
        <h1> Your Notes </h1>
        {notes.map((notes) => {

          return <NoteItem key={notes._id} notes={notes}></NoteItem>
        })}
      </div>
    </>
  )
}

export default Notes
