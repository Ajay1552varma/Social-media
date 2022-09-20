// import the modules
require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const upload = require('../../utils/imageStorage')

const host = process.env.HOST_NAME

// controllers
const {register_controller,login_controller,fb_controller, verify_controller, changeEmail_controller} = require('../../controllers/auth.controller');
const User = require('../../models/user.model');


// jwt register
router.post('/register',upload.single('profilePic'),register_controller)

// login 
router.post('/login',login_controller)


router.post('/verify',verify_controller)

router.patch("/changeEmail",changeEmail_controller)


// fb login test
router.get('/fb/login',(req,res)=>{
    res.render('fbTest')
})
// register test
router.get('/register',(req,res)=>{
    res.render('registerUserTest')
})







router.get('/facebook',passport.authenticate('facebook',{session:false,
    // scope:['email, gender','user_birthday'],
    profile_actions:['profileUrl','user_birthday','gender']
}))


function fbErrorHandler(err, req, res, next) {
    if(err){
        const url = host+"/auth/login?status=failure&"+"error=DuplicateKeyError"
        res.redirect(url)
    }
    else{next()}
}

router.get('/facebook/redirect',
    passport.authenticate('facebook',{session:false}),
    fbErrorHandler,
    fb_controller)



module.exports = router;