require('dotenv').config();

const express = require("express");
const app = express();
require('./db/db');
const User = require("./models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = process.env.PORT;
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            res.status(400).send('Unable to login.');
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            res.status(400).send('Unable to login.');
        }

       // res.status(200).send('Logged in successfully.');

        const token = jwt.sign({
            name: req.body.name
        },process.env.JWT_SECRET_KEY);

        console.log(token);

        res.json({ user, token });

    }
    catch (e) {
        res.status(400).send('Unable to login.')
    }
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const userCreated = await user.save();

       // res.status(201).send('User created successfully..!');

        const token = jwt.sign({
            name: req.body.name
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