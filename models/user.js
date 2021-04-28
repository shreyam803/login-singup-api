const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    teamName:{
        type:String,
        required:true,
        trim: true,
        minlength: 4,
        maxlength: 15
    },
    teamLeaderName:{
        type:String,
        required:true
    },
    teamLeaderEmail:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
},
{
    timestamps: true
});


const User = new mongoose.model("User",userSchema);

module.exports = User;