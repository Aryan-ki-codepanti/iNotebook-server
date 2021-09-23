const express = require("express");
const router = express.Router();
const User = require("../models/User");
// now router.get

// Create a user using : POST "/api/auth/". No need of auth
router.post("/" , (req , res ) => {
    // let data = {
    //     name: "Aryan",
    //     class: "XII"
    // }
    // res.json(data);
    console.log(req.body);
    const user = new User(req.body);
    user.save(); 
    res.send(req.body);
});

module.exports = router;