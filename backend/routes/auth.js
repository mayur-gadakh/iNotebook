const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');//this library is for validation
const bcrypt = require('bcryptjs');//this is the pac of the creatng the hash of te password
const jwt = require('jsonwebtoken'); //this library for the json web tocen  
const fetchUser=require('../middleware/fetchUser')



// ROUTE 1:create a user with post(./api/auth/createUser) it does nt require the authentication

router.post('/createUser', [  //This is the validators which is copied by the express js this is the express libearary
    body('email', 'Enter the valid email').isEmail(),//this code after email is for giving the suggestion after entering the wrong email  
    body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('password', 'Enter the valid password').isLength({ min: 6 }),
], async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false;
            return res.status(400).json({success, error: 'the user already exist' })
        }
        //this creats the salt to add inthe c=actual password
        const salt = await bcrypt.genSalt(10);
        //this creats the hash of thethe passord
        const pass = await bcrypt.hashSync(req.body.password, salt);


        user = await User.create({
            //this is the code which store the data into database
            name: req.body.name,
            password: pass,//here we add the password in the database
            email: req.body.email
        }) //this the code ehich gives the response 
        //.catch(err =>console.log(err))

        const data = {//this is the data where gives the id as response
            user: {
                id: user.id
            }
        }

        const JWT_SECRET = 'id';

        const authtoc = jwt.sign(data, JWT_SECRET);//this is the method which gives the data
        success=true;
        res.send({success, authtoc });
    } catch (error) {
        success=false;
        console.error(error.message);
        return res.status(500).json({success, error: 'Internal  Server error occure' })

    }
})


// ROUTE 2:create a user with post(./api/auth/login) it doesnt require the authentication
router.post('/login', [  //This is the validators which is copied by the express js this is the express libearary
    body('email', 'Enter the valid email').isEmail(),//this code after email is for giving the suggestion after entering the wrong email  
    body('password', 'password cannot be blan').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })//this is find if email is exist or not if not then thorows error
        if (!user) {
            success=false;
            return res.status(400).json({ success, error: 'User not available' })
        }

        const passwordCompared = await bcrypt.compare(password, user.password);//this is compared the password and the hash stored in the table
        if (!passwordCompared) {
            success=false;
            return res.status(400).json({ success,error: 'Invalid Password' })//if there is no password match gives error
        }

        //if there is aothorization complete then give the data of the tocan

        const data = {//this is the data where gives the id as response
            user: {
                id: user.id
            }
        }
        success=true;
        const JWT_SECRET = 'id';
        const authtoc = jwt.sign(data, JWT_SECRET);//this is the method which gives the data
        res.send({ success,authtoc:authtoc });

    } catch (error) {
        console.log(error)
        success=false;
        return res.status(500).json({ success,error: 'Internal server error occure' })
        //if any error occurs then it will show the error


    }

})
//ROUTE 3:this is for fetching the information of the user using the tocen
router.post('/getUser',fetchUser, async (req, res) => {

try {
     userId=req.user.id;
     //this fetvh the userid from fetch user file 
    let user = await User.findById(userId).select('-password')//this is find the data using the id 
    res.send(user);//send to the user
} catch (error) {
    console.log(error)
        return res.status(500).json({ error: 'Internal server error occure' })
    
}


})


module.exports = router;
