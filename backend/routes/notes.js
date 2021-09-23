const express = require("express");
const router = express.Router();

// now router.get

router.get("/" , (req , res ) => {
    let data = [{
        title: "Note1",
        description: "This is note 1",
        tag: "General"
    }]
    res.json(data);
});

module.exports = router;