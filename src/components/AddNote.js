import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {

    const [note , setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });
    const context = useContext(noteContext);
    const {  addNote } = context;

    const handleOnChange = e => {

        const myNote = {
            ...note ,
            [e.target.name]: e.target.value
        };

        setNote(prev => myNote);

    } 

    const handleClick = e => {
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
    }

    return (
        <div>
            <div className="my-4">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label
                            htmlFor="title"
                            className="form-label"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            placeholder="Enter a title"
                            value={note.title}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="description"
                            className="form-label"
                        >
                            Description
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Enter description of note"
                            value={note.description}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="tag"
                            className="form-label"
                        >
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            placeholder="Enter Tag"
                            value={note.tag}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button onClick={handleClick} type="submit" className="btn btn-primary">
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
