require('dotenv').config();
const jwt = require('jsonwebtoken')

const secrete = process.env.SECRETE

const createToken = (id,fb)=>{
    return jwt.sign({userId:id,isFb:fb},secrete,{expiresIn:'1d'})
}

module.exports = createToken;
