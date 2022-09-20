// import modules
require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail');


const saltCount = parseInt(process.env.SALT)

// fbUser schema
const fbUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is required"],
        minlength:[3,"Minimum length of name is 3"]
    },
    dob:{
        type: Date
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Eamil already registered"],
        lowercase: true,
        validate: [isEmail,"Please enter valid email"]
    },
    bio:{
        type: String,
        maxlength:[50,"maximum 50 characters allowed"]
    },
    profilePic:{
        type: String
    },
    userId:{
        type: String,
        required: [true,"User name is required"],
        unique: [true,"user name already registered"],
    },
    token:{
        type: String,
        required: [true,"token is required"],
        minlength:[8, "Password length must be minmum 5 characters"],
        maxlength: 1024
    },
    followers:[{type: Schema.Types.ObjectId, ref:'User'}],
    following:[{type: Schema.Types.ObjectId, ref:'User'}],
})



const FbUser = mongoose.model('FbUser',fbUserSchema);

module.exports=FbUser;