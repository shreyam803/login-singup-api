const express = require("express");
const app = express();
require('./db/db');
const User = require("./models/user")
const bcrypt= require('bcrypt');

const port = process.env.PORT || 3000;
app.set('view-engine','ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.post('/login',async (req,res)=>{
    const user = await User.findOne({ email: req.body.email });
  
});

app.get('/register',(req,res)=>{
    res.render('register.ejs');
})

app.post('/register',async (req,res)=>{
    try{    const hashedPassword = await bcrypt.hash(req.body.password,10)
           const user = new User({
               name:req.body.name,
               email:req.body,email,
               password:hashedPassword
           })
           const userCreated = await user.save();
           res.status(201).redirect('/login');
           console.log(user);
    }
    catch(e){
            res.status(400).send(e);
    }
})
 


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})