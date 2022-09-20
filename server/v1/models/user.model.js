// import modules
require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Followers = require('./followers.model');
const Following = require('./following.model');
const saltCount = parseInt(process.env.SALT)

// user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is required"],
        minlength:[3,"Minimum length of name is 3"]
    },
    dob:{
        type: Date,
        default: new Date()
    },
    email:{
        type: String,
        // required: [true,"Email is required"],
        unique: [true,"Eamil already registered"],
        lowercase: true,
        validate: [isEmail,"Please enter valid email"]
    },
    bio:{
        type: String,
        maxlength:[50,"maximum 50 characters allowed"],
        default:""
    },
    // profilePic:{
    //     data:Buffer,
    //     contentType: String
    // },
    profilePic:{
        type:String
    },
    username:{
        type: String,
        required: [true,"User name is required"],
        unique: [true,"user name already registered"],
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength:[8, "Password length must be minmum 5 characters"],
        maxlength: 1024
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
},{timestamps:true})

// hash the password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(saltCount);
    this.password = await bcrypt.hash(this.password,salt);
    await mongoose.model('Follower').create({ user: this._id });
    await mongoose.model('Following').create({ user: this._id });
    next();
})


// login function
userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        console.log(auth);
        if(auth){
            return user;
        }
        throw Error("Incorrect password!");
    }
    throw Error("Incorrect Username")
}

const User = mongoose.model('User',userSchema);

module.exports=User;