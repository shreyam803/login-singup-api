require('dotenv').config();

const express = require("express");
const app = express();
require('./db/db');
const User = require("./models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(express.json());

const port = process.env.PORT;

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ teamLeaderEmail: req.body.teamLeaderEmail });
        
        if (!user) {
            res.status(400).send('Unable to login.');
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            res.status(400).send('Unable to login.');
        }

       // res.status(200).send('Logged in successfully.');

        const token = jwt.sign({
            teamName: req.body.teamName
        },process.env.JWT_SECRET_KEY);


        res.json({ user, token });

    }
    catch (e) {
        res.status(400).send('Unable to login.')
    }
});


app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            teamName: req.body.teamName,
            teamLeaderName: req.body.teamLeaderName,
            teamLeaderEmail: req.body.teamLeaderEmail,
            password: hashedPassword
        })
        const userCreated = await user.save();

       // res.status(201).send('User created successfully..!');

        const token = jwt.sign({
            teamName: req.body.teamName
        },process.env.JWT_SECRET_KEY);

        res.json({user, token });

    }
    catch (e) {
        res.status(400).send("Unable to register");
    }
})



app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})