const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const secretkey = "thisismycollegeprojectforresume"
const { body, validationResult } = require('express-validator');
router.post("/createUser", body('email' , 'incorrect email').isEmail(), body('name', 'name is empty').isLength({ min: 1 }), body('password' , 'short password').isLength({ min: 8 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({errors : errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password , salt);
    try {
        await user.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post("/loginUser", body('email' , 'incorrect email').isEmail(),  body('password' , 'short password').isLength({ min: 8 }), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({errors : errors.array()});
    }
    let email = req.body.email;
    try {
        let userData = await user.findOne({email});
        if(!userData){
            // console.log("email");
            return res.status(404).json({errors : "Try logging with correct credentials"});
        }
        const pwdcompare = await bcrypt.compare(req.body.password , userData.password)
        if(!pwdcompare)
        {
            // console.log("pass");
            return res.status(404).json({errors : "Try logging with correct credentials"});
        }

        const data = {
                user:{
                    id:userData.id
                }
        }
        const authToken = jwt.sign(data , secretkey);
        return res.json({ success: true ,authToken:authToken});
    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
})

module.exports = router;