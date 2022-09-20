const passport = require('passport');
const { accessChat, fetchChats } = require('../../../controllers/chat.controller');

const router = require('express').Router();


router.post("/",accessChat)

router.get("/",fetchChats)



module.exports = router