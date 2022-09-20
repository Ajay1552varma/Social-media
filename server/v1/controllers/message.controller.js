const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const User = require('../models/user.model')

module.exports.sendMessage = async (req,res)=>{
 const {chatId,content} = req.body;
 
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400)
    }

    let newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender","name username")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path:"chat.users",
            select:"name username email"
        });
         await Chat.findByIdAndUpdate(chatId,{
            latestMessage:message
         })
         res.json(message)
    } catch (error) {
        console.log(error);
        res.status(400)
        
    }

}


module.exports.allMessages = async (req,res)=>{
    try {
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name username profilePic email")
                                        .populate("chat")
        res.json(messages)
    } catch (error) {
        res.sendStatus(400)
        console.log(error);
    }
}