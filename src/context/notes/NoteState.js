import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "615c392eaa42cf36e72777fb",
          "user": "615c0cc703b1bde6e19133bc",
          "title": "Learn React",
          "description": "Master Hooks , class and functional components is must",
          "tag": "devLife",
          "date": "2021-10-05T11:38:22.686Z",
          "__v": 0
        },
        {
          "_id": "615c397baa42cf36e72777fe",
          "user": "615c0cc703b1bde6e19133bc",
          "title": "New updated note",
          "description": "New note description updated",
          "tag": "devLife",
          "date": "2021-10-05T11:39:39.724Z",
          "__v": 0
        }
      ];

    const [notes , setNotes] = useState(notesInitial);

    return (
    <NoteContext.Provider value={{notes , setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}
 
export default NoteState;