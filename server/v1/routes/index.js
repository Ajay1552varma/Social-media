require('dotenv').config();
var express = require('express');
const jwt = require('jsonwebtoken')
const passport = require('passport');
var router = express.Router();



// auth router
router.use('/auth',require('./auth/auth.routes'))

// all protected routes
router.use(passport.authenticate('jwt',{session:false}),require('./protected/ProtectedRoutes'))


// test auth routes using views
router.use('/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send("Reached")
})

module.exports = router;