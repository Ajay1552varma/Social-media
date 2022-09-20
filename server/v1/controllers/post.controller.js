const Following = require("../models/following.model");
const Post = require("../models/post.model");

module.exports.createPost = async(req,res)=>{
    const {image,hashtags,caption} = req.body;
    const userId = req.user._id;
    try {
        const createdPost = await Post.create({
            image,
            caption,
            hashtags,
            author:userId
        });
        const post = await Post.findById(createdPost._id)
                    .populate("author","username name profilePic")
                    .populate("likes.author","username name profilePic")
                    .populate("comments.author","username name profilePic")
        res.status(201).json({success:true,post:post,likes:[],comments:[]});
    } catch (error) {
        console.log(error.message);
        res.status(400).send({error:"Can't post feed try later"})
    }
}


module.exports.getPost = async(req,res)=>{
    const userId = req.user._id;
    try {
        const result = await Following.findOne({user:userId},"following")
        const folowingIds = result.following.map(f=>{
            return( f.user.toString());
        })
        const posts = await Post.find({author:{$in:[userId,...folowingIds]}})
                                .populate("author",'username name profilePic')
                                .populate('likes.author','profilePic username name')
                                .populate('comments.author','profilePic username name')
                                .sort([['createdAt',-1]])
        return res.status(200).json({success:true,posts:posts})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,error:"Something went wrong while fetching posts."})
    }
}

module.exports.likePost = async(req,res)=>{
    const postId = req.params.postId;
    const userId = req.user._id;
    try {
        const postLike = await Post.updateOne(
            {_id:postId,'likes.author':{$ne:userId}},
            {
                $push:{likes:{author:userId}}
            },
            {new:true}
            
            )
        let likedPost = await Post.findById(postId)
                            .populate("likes.author","username name profilePic")
        if(postLike.modifiedCount===0){
            const postDislike = await Post.findByIdAndUpdate(postId,
                {$pull:{likes:{author:userId}}},
                {new:true}
            );
            return res.status(200).json({success:true,operation:"dislike",post:postDislike})
        }
        else{
            return res.status(200).json({success:true,operation:"like",post:likedPost})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,error:"Something went wrong try later!"});
    }
}

module.exports.commentPost = async(req,res)=>{
    const message = req.body.comment;
    const postId = req.params.postId;
    const userId = req.user._id;
    const comment = {
        comment:message,
        author: userId
    }
    try {
        const postComment = await Post.findByIdAndUpdate(postId,
            {$push:{comments:comment}},
            {new:true}
            ).populate("comments.author","username name profilePic")
        return res.status(200).json({success:true,post:postComment})
    } catch (error) {
        res.status(200).json({success:false,error:"Can't post comment to this post"})
        
    }
}