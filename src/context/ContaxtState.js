
import { useState } from "react";
import CreateContext from "./createContext";

const ContaxtState = (props) => {
  const host = "0.0.0.0:5000";
  
  const fetchotes= async()=>{
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMDIwNDU4NDE2NmY4NWNhNjI2NDU5In0sImlhdCI6MTY3ODg5MjIwNX0.ifjFgBUcuEHC26jMGAQk0ZlMNv4wz6baqiaVD4lnbxI"
      },
    });
    const json = response.json();
    console.log(json);

  }

  const [notes, setNotes] = useState(notes)

  const addNote = async(title, description, tags) => {

    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMDIwNDU4NDE2NmY4NWNhNjI2NDU5In0sImlhdCI6MTY3ODg5MjIwNX0.ifjFgBUcuEHC26jMGAQk0ZlMNv4wz6baqiaVD4lnbxI"
      },

      body: JSON.stringify({title,description,tags}), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log("new note added")
    const note = {
      "_id": "64131971169d47c900a83f12e",
      "user": "6410204584166f85ca626459",
      "title": title,
      "description": description,
      "tags": tags,
      "__v": 0
    };

    setNotes(notes.concat(note));//concat is the javascript  method which add the  object and return the the array
  }

  const deleteNote = (id) => {
    console.log("deleting the note with id" + id)
    const newNote = notes.filter((note) => { return note._id !== id })//filter is the method ofjavascript which return the new array which depends  on the pass the test  
    setNotes(newNote)
  }
  const editNote = async (id, title, description, tags) => {

    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMDIwNDU4NDE2NmY4NWNhNjI2NDU5In0sImlhdCI6MTY3ODg5MjIwNX0.ifjFgBUcuEHC26jMGAQk0ZlMNv4wz6baqiaVD4lnbxI"
      },

      body: JSON.stringify({title,description,tags}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects


  
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tags = tags;


    }
  }
  }

  return (

    //here feth the created context and used as the component provide the value to the component 
    <CreateContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </CreateContext.Provider>
  )
  
}
export default ContaxtState;