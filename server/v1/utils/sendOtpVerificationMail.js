const ConfirmationTokenModel = require("../models/confirmationToken.model")
const {createOtp, verifyOtp} = require("./createOtp");
const mailTransporter = require("./EmailTransporter");


const mail = process.env.EMAIL_ID;

const checkExpiry = (expirationDate)=>{
    const d = Date.now();
    const e = new Date(expirationDate).getTime();
   return d>e? true:false;
}



module.exports.sendOtpVerificationMail = async(user,res,next)=>{
    const {otp,hashedOtp} = await createOtp();
    console.log("++++++++++++otp+++++++++++++++");
    console.log(otp,hashedOtp);
    const oldDoc = await ConfirmationTokenModel.findOne({userId:user._id});
    if(oldDoc) oldDoc.deleteOne();
    console.log("Old token doc deleted");
    const confirmationToken = await ConfirmationTokenModel.create({
              user: user._id,
              token:hashedOtp,
              expiresAt:Date.now()+10*60*60*1000
    });
    console.log("New token doc created");
    const message = 
    `<p> Dear ${user.name}, <br/> We received a request to verify your email. Your OTP is ${otp}
    `
    const mailOptions = {
        from:mail,
        to: user.email,
        subject:"Account Verification OTP",
        html:message

    }
    return new Promise((resolve,reject)=>{
        mailTransporter.sendMail(mailOptions,function(err,info){
            if(err){
                reject(err)
            }else{
                resolve(info)
            }
        })
    })
}

module.exports.verifyUser = async(userId,otp)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const confirmationDoc = await ConfirmationTokenModel.findOne({user:userId})
            console.log("+++++++++Confirmation token doc found+++++");
            console.log(confirmationDoc);
            const token = confirmationDoc.token;
            const expiryDate = confirmationDoc.expiresAt;
            checkExpiry(expiryDate)?resolve("expired"):null;
            const verified = await verifyOtp(otp,token);
            if(verified){
                confirmationDoc.deleteOne();
            }
            resolve(verified);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}


