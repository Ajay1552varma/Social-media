const passport = require('passport');
const User = require('../../../models/user.model');
const upload = require('../../../utils/imageStorage');
const router = require('express').Router();
const fs = require('fs');
const path = require("path");
const sharp = require('sharp');
const Followers = require('../../../models/followers.model');
const Following = require('../../../models/following.model');
const Post = require('../../../models/post.model');



// get current user details
router.get('/getUser',async(req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId)
    res.status(200).json({
        id:userId,
        name:user.name,
        username:user.username,
        bio:user.bio,
        email:user.email,
        profilePic:user.profilePic
    })
})

// get all other users expect current user
router.get("/getAllUsers",async(req,res)=>{
    const userId = req.user._id;
    try {
        const users = await User.find({_id:{$ne:userId}},"name username profilePic");
        res.json(users)
    } catch (error) {
        res.status(400).send("Error occured")
    }
})

router.get('/findUsers',async(req,res)=>{
    const userId = req.user._id;
    let following = [];
    let users = [];
    try {
        const result = await Following.findOne({user:userId},"following")
        const folowingIds = result.following.map(f=>{
            return( f.user.toString());
        })
        
        const userResult = await User.find({ _id: { $nin: [userId,...folowingIds] } },"username profilePic name");
        res.status(200).json({result:userResult})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// update user's details - bio,name,profilePic
router.put('/updateUser',upload.single('profilePic'),(req,res)=>{
    const {name,bio,profilePic} = req.body;
    const inputData ={};
    inputData.name = name;
    inputData.bio = bio;    
    inputData.profilePic = profilePic
    // if(req.file){
    //     inputData.profilePic = {
    //         data:fs.readFileSync(path.join(__dirname,"../../..",req.file.path)),
    //         contentType:'image/jpeg' 
    //     }
    // }
    
    const userId = req.user._id;
    User.findByIdAndUpdate(userId,inputData)
    .then((data)=>{
        console.log("updated data");
        res.status(200).json({
            success:true,
            user:data
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(424).json({
            success:false,
            error:err
        })
    })
})

// get all followers for current user
router.get('/getFollowers',async (req,res)=>{
    const user_id = req.user._id;
    try {
        let result= await Followers.findOne({user:user_id}).populate("followers.user","name username profilePic");
        const followers = [...result.followers]
        res.status(200).json(followers)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({error:"Something went wrong! try later"})
    }
})

router.get('/getFollowing',async (req,res)=>{
    try {
        const user_id = req.user._id;
        let result= await Following.findOne({user:user_id}).populate("following.user","name username profilePic");
        const following = [...result.following]
        res.status(200).json(following)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({error:"Something went wrong! try later"})
    }
})

router.get('/suggestUser',async(req,res)=>{
    const userId = req.user._id;
    var d = new Date();
    d.setDate(d.getDate() - 1);
    try {
        const newUsers = await User.find({
            createdAt:{
                $gte: d,
                $lt: new Date()
            }
        })
        const {following} = await Following.findOne({user:userId},"following")
        let followingIds = [];
        res.status(200).json({success:true,followingIds})
    } catch (error) {
        
    }

})


router.get('/search/:element',async(req,res)=>{
    const searchElement = req.params.element;
    const regex = new RegExp(searchElement)
    try {
        const hashtagResult = await Post.find(
            {"hashtags":{$regex:regex,$options:"i"}
        }
        ).populate("author","username name profilePic")
        const users = await User.find(
            {username:{$regex:regex,$options:"i"}}
            )
        res.json({hashtags:hashtagResult,users})
    } catch (error) {
        return res.status(400,{error:"Something went wrong try later"})
    }
})

module.exports = router