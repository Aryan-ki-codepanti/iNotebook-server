import React , { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const Home = () => {

    const context = useContext(noteContext);
    const {notes , setNotes} = context;
    return (
        <div>   

            <div className="my-4">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className="my-4">
                <h1>Your Notes</h1>

                <div className="container-fluid">

                    {
                        notes.map(note => (
                            <div key={note._id}>
                                <h5> {note.title} </h5>
                                <p> {note.description} </p>
                            </div>
                        ))
                    }


                </div>

            </div>
        </div>
    )
};

export default Home;
