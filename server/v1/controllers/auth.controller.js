require('dotenv').config();
const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
const secrete = process.env.SECRETE
const {handleError} = require('../utils/handleError');
const createToken = require("../utils/createToken");
const fs = require('fs');
const path = require("path");
const createOtp = require("../utils/createOtp");
const {sendOtpVerificationMail, verifyUser} = require("../utils/sendOtpVerificationMail");

const host = process.env.HOST_NAME

// register controller
module.exports.register_controller = async(req,res)=>{
    const inputData = req.body
    // console.log(inputData);
    // console.log(req.file);
    // inputData.profilePic = {
    //     data:fs.readFileSync(path.join(__dirname,"..",req.file.path)),
    //     contentType:'image/jpeg' 
    //     };
   try {
      const user = await User.create(inputData);
      const info = await sendOtpVerificationMail(user);
      console.log("+++++++++++++++++info+++++++++++++++");
      console.log(info);
    //   send email here

      const token = createToken(user._id,false);
      res.cookie('Bearer Token',token,{httpOnly:true,maxAge:1000*24*60*60})
        res.json({
            success:true,
            userId:user._id,
            status:info,
            email:user.email,
            Bearer: "Bearer "+ token
        })
   } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json({errors})
    }
}


module.exports.verify_controller=async(req,res)=>{

    try {
        const {userId,otp}= req.body;
        const verified = await verifyUser(userId,otp);
        if(verified ==='expired'){
            return res.json({
                status:"failure",
                message:"OTP Expired! please click SEND button"
            })
        }
        if(verified){
            const user = await User.findByIdAndUpdate(userId,{$set:{confirmed:true} })
            console.log(user);
            res.status(200).json({
                status:"success",
                message:"Account verified"
            })
        }else{
            res.json({
                status:"failure",
                message:"Invalid otp! account not verified"
            })
    }
        
    } catch (error) {
        res.status(400).json(error)
    }

}


module.exports.changeEmail_controller=async(req,res)=>{
    const {userId,email} = req.body;
    console.log("Email++++++++++"+email);
    try {
        const user = await User.findByIdAndUpdate(userId,{$set:{email:email}},{new:true});
        console.log("Email updated");
        console.log("User++++++++",user);
        const info = await sendOtpVerificationMail(user);
        console.log("Email set to ");
        console.log(info);
        res.status(200).json({
            status:"success",
            info:info,
            message:"Email Updated and otp sent! Please check your email"
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status:"failure",
            info:error,
            message:"Error in updating email! Use another email adddress"
        })
    }
    
}


// login controller
module.exports.login_controller = async(req,res)=>{
    const {username,password} = req.body;
    console.log(req.body);
   try {
      const user = await User.login(username,password);
      const userId = user._id;
      if(!user.confirmed){
        return res.status(200).json({
            success:false,
            email:user.email,
            userId:userId,
            status:"verification pending"
        })
      }
        const token = jwt.sign({userId,isFb:false},secrete,{expiresIn:'1d'},(err,token)=>{
        res.cookie('jwt',token);
        res.json({
            success:true,
            Bearer: "Bearer "+ token
        });
    })
   } catch (error) {
    const errors = handleError(error)
    res.status(400).json(errors)
   }
}

// fb sigin controller
module.exports.fb_controller = (req,res)=>{
    const id = req.user._id;
    const token = createToken(id,true);
    const url = host+"/auth/login?status=success&"+"bearer="+token
    res.redirect(url)
}