
const nodemailer = require('nodemailer');
require('dotenv').config({path:"../.env"});

const mail = process.env.EMAIL_ID;
const pass = process.env.EMAIL_PASSWORD;


const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:mail,
    pass: pass
  }
});

module.exports = mailTransporter


// const mailOptions = {
//   from: 'capstone.project.78@gmail.com',
//   to: ['ashokangappan@gmail.com','mailakashok2@gmail.com'],
//   subject: 'Sending Email using Node.js',
//   // text: 'That was easy!',
//   html:`<h1>Hello world</h1>`,
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

