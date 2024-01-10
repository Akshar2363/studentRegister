const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser.js');
const Student = require('../models/Student.js');
require('dotenv').config()

// ROUTE 1 : Create a User using POST "/api/auth/signup" - Doesn't Require Authentication
const JWT_SECRET = process.env.JWT_SECRET
const PEPPER = process.env.PEPPER
router.post('/signup', [
    // Input validation of user data using express-validator package
    body('roll').isLength(
        {min: 3}
    ).withMessage('First name must contain atleast 3 characters.'),
    body('name').isLength(
        {min: 3}
    ).withMessage('Last name must contain atleast 3 characters.'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength(
        {min: 5}
    ).withMessage('Password must contain atleast 3 characters.'),
    body('contact').isNumeric().isLength(
        {min: 10, max: 10}
    ).withMessage('Invalid Phone Number.'),
    body('dept').exists().withMessage('Department Cannot be blank.')
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({
            success, error: errors.array()[0].message
        });
    }

    try { // Check if user with given email already exists
        let user = await Student.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({success, error: "A user with this email already exists!"});
        }
        // Add salt and pepper to password using bcryptjs package
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password + PEPPER, salt);

        // Create a new user
        user = await Student.create({
            roll: req.body.roll,
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            contact: req.body.contact,
            dept: req.body.dept
        })

        // Create an authorization token for a new user using JSON-WebToken (JWT) package

        const payload = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        const {
            password,
            ...others
        } = user;

        res.cookie("authToken", authToken, {httpOnly: true}).status(200).json({success, authToken, others});


    } catch (error) {
        res.status(500).json({success, error: "Internal Server Error!"});
    }
})


// ROUTE 2 : User Authentication using POST : "/api/auth/login". No login required
router.post('/login', [
    body('roll').exists().withMessage('Please enter your roll number !'), body('password').exists().withMessage('Password cannot be blank !')
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (! errors.isEmpty()) {
        return res.status(400).json({success, error: errors.array()});
    }

    // Get email and password
    try { // Check is a user with given email exists
        let user = await Student.findOne({roll: req.body.roll});
        if (! user) {
            return res.status(400).json({success, error: "Invalid Login Credentials!"});
        }

        // Compare input password and database password
        const passwordCompare = await bcrypt.compare(req.body.password + PEPPER, user.password);
        if (! passwordCompare) {
            return res.status(400).json({success, error: "Invalid Login Credentials!"});
        }

        // Return the JWT Token of the user
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        const {
            password,
            ...others
        } = user;

        res.cookie("authToken", authToken, {httpOnly: true}).status(200).json({success, authToken, others});

    } catch (error) {
        res.status(500).json({success, error: "Internal Server Error!"});
    }

})


// ROUTE 3 : Get details of a logged in user using POST: "/api/auth/getuser" - Login Required

router.post('/getuser', fetchUser, async (req, res) => {

    let success = false;
    const token = req.cookies.authToken;
    if (! token) 
        return res.status(401).json({success, msg: "Not logged in!"});
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        try {
            let userId = req.user.id;
            const user = await Student.findById(userId).select("-password");
            if (user) 
                success = true;
            
            res.json({success, user});
        } catch (error) {
            res.status(500).json({success, error: "Internal Server Error!"});
        }
    })
})

// ROUTE 3 : Logout a user using POST "/api/auth/logout" - Require Authentication

router.post('/logout', async (req, res) => {
    let success = false;
    try {
        res.clearCookie("authToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json({success: true, msg: "User has been logged out."})
    } catch (error) {
        res.status(500).json({success, error: "Internal Server Error!"});
    }
})

module.exports = router;
