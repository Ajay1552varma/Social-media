const bcrypt = require('bcrypt')
require('dotenv').config({path:'../.env'})

const saltCount = parseInt(process.env.SALT)


module.exports.createOtp = ()=>{

    return new Promise(async(resolve,reject)=>{
        try {  
        const otp = `${Math.floor(1000+Math.random()*9000)}`;
        const salt = await bcrypt.genSalt(saltCount);
        const hashedOtp = await bcrypt.hash(otp,salt);
        const verificationCreds = {
            otp,
            hashedOtp
        }
        resolve(verificationCreds)
        } catch (error) {
            reject(error)
        }

    })
}


module.exports.verifyOtp = (otp,hashedOtp)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const verified = await bcrypt.compare(otp,hashedOtp)
            resolve(verified)
        } catch (error) {
            reject(error)    
        }
    })
}