import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = props => {
    const host = "http://localhost:5000";

    // const notesInitial = [
    //     {
    //         _id: "615c392eaa42cf36e72777fb",
    //         user: "615c0cc703b1bde6e19133bc",
    //         title: "Learn React",
    //         description:
    //             "Master Hooks , class and functional components is must",
    //         tag: "devLife",
    //         date: "2021-10-05T11:38:22.686Z",
    //         __v: 0,
    //     },
    //     {
    //         _id: "615c397baa42cf36e72777fe",
    //         user: "615c0cc703b1bde6e19133bc",
    //         title: "New updated note",
    //         description: "New note description updated",
    //         tag: "devLife",
    //         date: "2021-10-05T11:39:39.724Z",
    //         __v: 0,
    //     },
    //     {
    //         _id: "6125c397baa42cf36e727277fe",
    //         user: "615c0cc703b1bde6e19133bc",
    //         title: "New updated note",
    //         description: "New note description updated",
    //         tag: "devLife",
    //         date: "2021-10-05T11:39:39.724Z",
    //         __v: 0,
    //     },
    //     {
    //         _id: "6153c3972baa42cf36e72777fe",
    //         user: "615c0cc703b1bde6e19133bc",
    //         title: "New updated note",
    //         description: "New note description updated",
    //         tag: "devLife",
    //         date: "2021-10-05T11:39:39.724Z",
    //         __v: 0,
    //     },
    //     {
    //         _id: "615c4397baa42cf36e72777fe",
    //         user: "615c0cc703b1bde6e19133bc",
    //         title: "New updated note",
    //         description: "New note description updated",
    //         tag: "devLife",
    //         date: "2021-10-05T11:39:39.724Z",
    //         __v: 0,
    //     },
    // ];

	// Get All notes

	const getNotes = async () => {
		// TODO : API CALL
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzBjYzcwM2IxYmRlNmUxOTEzM2JjIn0sImlhdCI6MTYzMzQyNTM2Mn0.-o1nHR-pIdMnYJEqucgn4FazhTUB7D7ZOx_DM1J2RxA"
            }
        });

        const myNotes = await response.json();
		setNotes(prev => myNotes);
	}

    // add a note

    const addNote = async (title, description, tag) => {
        // TODO : API CALL
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzBjYzcwM2IxYmRlNmUxOTEzM2JjIn0sImlhdCI6MTYzMzQyNTM2Mn0.-o1nHR-pIdMnYJEqucgn4FazhTUB7D7ZOx_DM1J2RxA",
            },
            body: JSON.stringify({
                title,
                description,
                tag,
            }),
        });

        const note = await response.json();

        // front end logic
        setNotes(prev => [...notes, note]);
    };

    // update a note
    const updateNote = async (id, title, description, tag) => {
        // Api call

        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzBjYzcwM2IxYmRlNmUxOTEzM2JjIn0sImlhdCI6MTYzMzQyNTM2Mn0.-o1nHR-pIdMnYJEqucgn4FazhTUB7D7ZOx_DM1J2RxA",
            },
            body: JSON.stringify({
                title,
                description,
                tag,
            }),
        });

        const data = await response.json();

        const newNotes = notes.map(note => {
            if (note._id === id) {
                return {...note , title , description , tag} ;
            }
            return note;
        });
        // logic to edit in client
        setNotes(prev => newNotes);
    };
    // delete a note
    const deleteNote = async id => {
        // TODO : API CALL ALSO

        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzBjYzcwM2IxYmRlNmUxOTEzM2JjIn0sImlhdCI6MTYzMzQyNTM2Mn0.-o1nHR-pIdMnYJEqucgn4FazhTUB7D7ZOx_DM1J2RxA",
            },
        });

        const data = await response.json();

        const newNotes = notes.filter(note => note._id !== id);
        setNotes(prev => newNotes);
	}

    const [notes, setNotes] = useState([]);

	

    return (
        <NoteContext.Provider
            value={{ notes, addNote, deleteNote, updateNote , getNotes }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
