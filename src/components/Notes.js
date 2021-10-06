import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="my-4">
            <h1>Your Notes</h1>

            <div className="row gap-3">
                {notes.map(note => (
                    <NoteItem key={note._id} note={{ ...note }} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
