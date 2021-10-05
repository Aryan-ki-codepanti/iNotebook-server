const express = require("express");
// const { body, validationResult } = require("express-validator");
// const router = express.Router();
const User = require("../models/User");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aryanisthebest@2002";


const fetchUser = (req , res , next) => {

    // get user from jwt token and add id to req obj

    const token = req.header("auth-token");

    if (!token){
        res.status(401).json({
            error: "Please authenticate using a valid token"
        });
    }

    try{
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(err){
        res.status(401).json({error : err});
    }
}

module.exports = fetchUser;