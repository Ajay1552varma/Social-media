
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Followers = require('../../../models/followers.model');
const Following = require('../../../models/following.model');
const User = require('../../../models/user.model');

router.get("/follow/:userId",async(req,res)=>{
    const userId = req.params.userId;
    const presentUserId = req.user._id;
    if(!ObjectId.isValid(userId)){
        return res.status(400)
            .send({error:"Invalid userId"})
    }
    if(userId==presentUserId){
        return res.status(400)
            .send({error:"User cannot follow own account"})
    }
    try {
        const userToFollow = await User.findById(userId);
        if(!userToFollow){
            return res.status(400)
            .send({error:"Could not find a user with that id."});
        }
        const followerUpdate = await Followers.updateOne(
                {user:userId, 'followers.user': {$ne: presentUserId}},
                {$push:{followers:{user:presentUserId}}}
        );
        const followingUpdate = await Following.updateOne(
            {user:presentUserId,'following.user':{$ne: userId}},
            {$push: {following:{user:userId}}}
        );
        if(followerUpdate.modifiedCount ===0 || !followingUpdate.modifiedCount ===0 ){
            // if(!followerUpdate.ok || !followingUpdate.ok){
            //     return res
            //         .status(500)
            //         .send({error:"could not follow user please try again later---"})
            // }



            // if user already following unfollow the user
            const followerUnfollowUpdate = await Followers.updateOne(
                {
                    user:userId,
                },
                {$pull:{followers:{user:presentUserId}}}
            )
    
            const followingUnfollowUpdate = await Following.updateOne(
                {user: presentUserId},
                {$pull: {following:{user:userId}}}
            );
    
            // if(!followerUnfollowUpdate.ok || !followingUnfollowUpdate.ok){
            //     return res
            //         .status(500)
            //         .send({error:"Could not follow user please try again later"})
            // }
            return res.send({success:true,operation:"unfollow"})
        }        

        const sender = await User.findById(presentUserId,'username name profilePic');
        const isFollowing = await Following.findOne({
            user: userId,
            "following.user":presentUserId
        })
        res.send({success:true,operation:"follow"})


    } catch (error) {
        console.log(error);
    }





})



module.exports = router