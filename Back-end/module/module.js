const express = require('express');
const User = require("../model/user")
const contactus = require('../model/contactus')
const answerCount = require('../model/answercount')
const register = require('../model/register')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const router = express.Router();

// Register

router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { firstName, lastName, email } = req.body;

        const oldUser = await register.findOne({ email });

        if (oldUser) {
            return res.send("User Already Exist. Please Login");
        }

        // Create user in our database
        const user = await register.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize

        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


// Get user name

router.post("/getuser", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input

        const { email } = req.body

        const oldUser = await register.findOne({ email });

        if (oldUser) {
            return res.status(201).json(oldUser);;
        }

    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

// Login

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email } = req.body;

    // Validate user input
    if (!(email)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await register.findOne({ email });

    if (user) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
    
  // Our login logic ends here
       
    }
    catch (err) {
        console.log(err)
    }
});


// to get Quiz Question

router.get("/getQuestion", async function (req, res) {
    try {
        const name = await User.find({})
        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)
    }
})

// to post new question

router.post("/postQuestion", async function (req, res) {
    try {
        const { Question, option1, option2, option3, Answer } = req.body;
        const name = await User.create({
            Question: Question,
            option1: option1,
            option2: option2,
            option3: option3,
            Answer: Answer,
        })

        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)

    }
})

// to update question

router.put("/updateQuestion/:id", async function (req, res) {
    try {
        const name = await User.findByIdAndUpdate(req.params.id, req.body)
        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)
    }
})

// to delete question

router.delete("/deleteQuestion/:id", async function (req, res) {
    try {
        const name = await User.findByIdAndDelete(req.params.id)
        if (name) {
            res.send(name)
            return res.send("deleted successfully")
        }
    }
    catch (err) {
        console.log(err)
    }
})

//to post contact us

router.post("/postcontactus", async function (req, res) {
    try {
        const { Username, UserContactNo, questionenquiry } = req.body;
        const contact = await contactus.create({
            Username: Username,
            UserContactNo: UserContactNo,
            questionenquiry: questionenquiry,
        })
        if (contact) {
            res.send(contact)
        }
    }
    catch (err) {
        console.log(err)
    }
})


// to get contact us post

router.get("/getcontactus", async function (req, res) {
    try {
        const contact = await contactus.find({})
        if (contact) {
            res.send(contact)
        }
    }
    catch (err) {
        console.log(err)
    }
})


// to delete contact us post

router.delete("/deletecontactus/:id", async function (req, res) {
    try {
        const contact = await contactus.findOneAndDelete(req.params.id)
        if (contact) {
            res.send(contact)
        }
    }
    catch (err) {
        console.log(err)
    }
})


// to post Answer Count 

router.post("/postAnswerCount", async function (req, res) {
    try {
        const { correctAnswerCount, questionAnswered } = req.body;
        const name = await answerCount.create({
            correctAnswerCount: correctAnswerCount,
            questionAnswered: questionAnswered,
        })

        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)

    }
})


// to get answer count

router.get("/getAnswerCount", async function (req, res) {
    try {
        const name = await answerCount.find({})
        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;