const User = require("../models/user.model");
const Chat = require('../models/chat.model')


module.exports.accessChat = async (req,res)=>{
 const {userId} = req.body;
    if(!userId){
        return res.sendStatus(400);
    }
    let isChat = await Chat.find({
        $and:[
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },     
        ]
    })
    .populate("users","-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name username profilePic email"
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        const chatData = {
            users:[req.user._id,userId],
        };
        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).send(FullChat)
        } catch (error) {
            console.log(error.message);
            res.status(400)
        }
    }

}


module.exports.fetchChats = async(req,res)=>{
    try {
        const chats = await Chat
                            .find({users:{$elemMatch:{$eq:req.user._id}}})
                            .populate("users","-password")
                            .populate("latestMessage")
                                .sort({updatedAt:-1})
        const results = await User.populate(chats,{
            path:"latestMessage.sender",
            select:"name username profilePic,email"
        })                        
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
    
}