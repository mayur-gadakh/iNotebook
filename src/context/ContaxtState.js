
import { useState } from "react";
import CreateContext from "./createContext";

const ContaxtState = (props) => {
  const host = "http://127.0.0.1:5000";
  const intialNotes = []

  const [notes, setNotes] = useState(intialNotes)

  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {

      //this function is used for fetching the notes from bacend 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
      },
    });

    const json = await response.json();

    console.log(json);
    setNotes(json);

  }


  const addNote = async (title, description, tags) => {

    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
      },

      body: JSON.stringify({ title, description, tags }), // body data type must match "Content-Type" header
    });
    const note = response.json();

    setNotes(notes.concat(note));//concat is the javascript  method which add the  object and return the the array

    console.log("new note added")
  }

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
      },

    });
    const json = await response.json()
    console.log(json);
    const newNotes = notes.filter((note) => { return note.id !== id })
    console.log(newNotes);
    setNotes(newNotes);


  }
  const editNote = async (id, title, description, tags) => {

    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
      },

      body: JSON.stringify({ title, description, tags }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tags = tags;

        break;
      }

    }
    setNotes(newNote);
  }

  return (

    //here feth the created context and used as the component provide the value to the component 
    <CreateContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </CreateContext.Provider>
  )


}

export default ContaxtState