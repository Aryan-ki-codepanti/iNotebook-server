const express = require("express");
const { body , validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "aryanisthebest@2002";

// now router.get

// Create a user using : POST "/api/auth/createuser". No login required
router.post("/createuser" , [
    body('email' , 'Enter a valid email').isEmail() ,
    body('name' , 'Enter a valid name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
] , async  (req , res ) => {

    // if errors return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
    }
    else{
        // check if user with this email exist
        const result = await User.findOne({email : req.body.email});

        if (result){
            return res.status(400).json({error: "Sorry user with this email exists"});
        }

        // securing password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password , salt);

        const user =  new User({...req.body , password: secPass});
        user.save()
        .then((data)=>{

            const authToken = jwt.sign({user: data.id} , JWT_SECRET);
            res.json({authToken});
        });
    }

});

module.exports = router;