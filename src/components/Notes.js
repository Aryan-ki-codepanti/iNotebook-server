import React, { useContext, useEffect , useRef , useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(noteContext);
    const [note , setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    });
    const { notes , getNotes , updateNote   } = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleUpdateNote = curNote => {
        setNote(prev => ({
            id: curNote._id,
            etitle: curNote.title,
            edescription: curNote.description,
            etag: curNote.tag

        }));
        ref.current.click();
    };

    const handleOnChange = e => {

        const myNote = {
            ...note ,
            [e.target.name]: e.target.value
        };

        setNote(prev => myNote);

    } 

    // update request
    const handleClick = e => {
        updateNote( note.id , note.etitle , note.edescription , note.etag );
        refClose.current.click();
    }

    useEffect( () => {
        getNotes();
    } , []); // eslint-disable-line

    

    return (
        <>

        {/* Modal */}
        {/* <!-- Button trigger modal --> */}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> Edit Note </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                        <div className="mb-3">
                            <label
                                htmlFor="etitle"
                                className="form-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="etitle"
                                id="etitle"
                                placeholder="Enter a title"
                                value={note.etitle}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="edescription"
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="edescription"
                                name="edescription"
                                placeholder="Enter description of note"
                                value={note.edescription}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="etag"
                                className="form-label"
                            >
                                Tag
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="etag"
                                name="etag"
                                placeholder="Enter Tag"
                                value={note.etag}
                                onChange={handleOnChange}
                            />
                        </div>
                </form>
            
            </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
            </div>
        </div>
        </div>


        <AddNote />
        <div className="my-4">
            <h1>Your Notes</h1>

            <div className="row gap-3">
                {notes.map(note => (
                    <NoteItem key={note._id} note={{ ...note }} handleUpdateNote={handleUpdateNote} />
                ))}
            </div>
        </div>
        </>
    );
};

export default Notes;
