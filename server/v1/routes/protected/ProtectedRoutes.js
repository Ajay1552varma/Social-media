const passport = require('passport')
const router = require('express').Router();

router.get('/home',(req,res)=>{
    res.send("Protected page")
})

router.use('/user',require('./userRoutes/user.routes'))

router.use('/chat',require("./chatRoutes/chat.routes"))

router.use('/message',require("./chatRoutes/messages.routes"))
router.use('/friends',require('./friendsRoutes/friends.routes'))

router.use('/post',require('./postRoutes/post.routes'))



module.exports = router;