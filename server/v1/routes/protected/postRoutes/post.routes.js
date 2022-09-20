const {
  createPost,
  getPost,
  likePost,
  commentPost,
} = require("../../../controllers/post.controller");
const Post = require("../../../models/post.model");

const router = require("express").Router();

router.post("/createPost", createPost);

// fetch all posts for the user
router.get("/getPost", getPost);

// fetch user post
router.get("/getUserPost",async(req,res)=>{
  const userId = req.user._id;
  try {
    const post = await Post.find({author:userId})
                .populate("likes.author","username name profilePic")
                .populate("comments.author","username name profilePic")

    res.status(200).json({success:true,posts:post})
  } catch (error) {
    res.status(400).json({success:false,error:"Something went wrong while fetching posts"})
  }
})

router.get('/getUserPost/:postId',async(req,res)=>{
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId)
                .populate("author","username name profilePic")
                .populate("likes.author","username name profilePic")
                .populate("comments.author","username name profilePic")
    if(post){
      res.status(200).json({success:true,post:post})
    }else{
      res.status(200).json({success:false,error:"Post not found!"})
    }
  } catch (error) {
    res.status(400).json({success:false,error:"Something went wrong!"})
  }
})

router.delete("/deleteUserPost/:postId",async(req,res)=>{
  const postId = req.params.postId;
  const userId = req.user._id;
  try {
    const deletedPost = await Post.findOneAndDelete({
      $and:[
        {_id:postId},
        {author:userId}
      ]
    })
    
    if(deletedPost){
      res.status(200).json({success:true,deletedPost})
    }
    else{
      res.status(200).json({success:false,message:"User Cannot delete this post!"})
    }
  } catch (error) {
    res.status(400).json({success:false,error:"Something went wrong!"})
  }

})


router.patch("/updatePost/:postId",async(req,res)=>{
  const {caption,hashtags} = req.body;
  const postId = req.params.postId;
  const userId = req.user._id;
  try {
    const updatedPost = await Post.findOneAndUpdate({
      $and:[
        {_id:postId},
        {author:userId}
      ]
    },
    {caption,hashtags},
    {new:true}
    )
    
    if(updatedPost){
      res.status(200).json({success:true,updatedPost})
    }
    else{
      res.status(200).json({success:false,message:"User Cannot update this post!"})
    }
  } catch (error) {
    res.status(400).json({success:false,error:"Something went wrong!"})
  }

})

router.patch("/postLike/:postId", likePost);

router.patch("/postComment/:postId", commentPost);

module.exports = router;
