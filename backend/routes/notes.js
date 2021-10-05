const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes of user using GET: "/api/notes/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Route 2 : Add a new  note of user using POST: "/api/notes/addnote" Login Required
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Title must have atleast 5 characters").isLength({
            min: 5,
        }),
        body(
            "description",
            "Description must be of 5 atleast characters"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            // if errors return bad request
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;
            const note = new Notes({
                user: req.user.id,
                title,
                description,
                tag,
            });

            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

// Route 3: Update an existing note using PUT:  "/api/notes/updatenote/:id"
// Login Required
router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            
            // create a new note object 
            if (title){newNote.title = title};
            if (description){newNote.description = description};
            if (tag){newNote.tag = tag};


            // find the note to be updated and update it
            let note = await Notes.findById(req.params.id);

            if (!note){
                return req.status(404).send("Not Found");
            }
            
            if (note.user.toString() !== req.user.id){
                return req.status(401).send("Not Allowed");
            }

            note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote} , {new: true});
            res.json(note);

        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

// Route 4: Delete an existing note using Delete:  "/api/notes/deletenote/:id"
// Login Required
router.delete(
    "/deletenote/:id",
    fetchUser,
    async (req, res) => {
        try {
        
            // find the note to be deleted  and then deleting it
            let note = await Notes.findById(req.params.id);

            if (!note){
                return req.status(404).send("Not Found");
            }
            
            // Allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id){
                return req.status(401).send("Not Allowed");
            }


            note = await Notes.findByIdAndDelete(req.params.id);

            res.json({deletion : "success" , note});

        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

module.exports = router;
