const passport = require('passport');
const { sendMessage, allMessages } = require('../../../controllers/message.controller');

const router = require('express').Router();


router.post("/",sendMessage)

router.get("/:chatId",allMessages);



module.exports = router