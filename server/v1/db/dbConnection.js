// import the modues
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config')


const user = process.env.USER;
const pass = process.env.PASSWORD;
const dbName = config.get('db.name')

uri = `mongodb+srv://ashok:${pass}@instagram-cluster.px44yvz.mongodb.net/${dbName}?retryWrites=true&w=majority`

const connectToDb =()=>{
   mongoose.connect(uri,(err)=>{
    if(err){
        console.log("--Could not connect to database--");
    }
    else
        console.log("++Connected to Database++");
    })
}

module.exports = connectToDb;