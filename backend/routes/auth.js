const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aryanisthebest@2002";
const fetchUser = require("../middleware/fetchUser");
// now router.get

// Route 2: Create a user using : POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
        body("email", "Enter a valid email").isEmail(),
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        // if errors return bad request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            // check if user with this email exist
            const result = await User.findOne({ email: req.body.email });

            if (result) {
                return res
                    .status(400)
                    .json({ error: "Sorry user with this email exists" });
            }

            // securing password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const user = new User({ ...req.body, password: secPass });
            user.save().then(data => {
                const authToken = jwt.sign({ user: data.id }, JWT_SECRET);
                res.json({ authToken });
            }).catch(err => {
                res.status(500).send("Internal server error occured");
            });
        }
    }
);

// Route 2:  Authenticate a user using : POST "/api/login" , no login required
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password can not be blank").exists(),
    ],
    async (req, res) => {
        // if errors return bad request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try{
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        error: "Please try to login with correct credentials",
                    });
                }
                
            const passCompare = await bcrypt.compare(password , user.password);
            
            if (!passCompare){
                return res
                    .status(400)
                    .json({
                        error: "Please try to login with correct credentials",
                    });

            }
            
            const payload = {
                user : {
                    id: user.id
                }
            }

            const authToken = jwt.sign(payload , JWT_SECRET);
            res.json({authToken});
        
        }

        catch(err){
            res.status(500).send("Internal server error occured");
        }
    }
);

//Route 3 : Get logged in user Details using : POST "/api/auth/getuser". Login Required 

router.post("/getuser" , fetchUser , async (req , res) => {

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }

});

module.exports = router;
