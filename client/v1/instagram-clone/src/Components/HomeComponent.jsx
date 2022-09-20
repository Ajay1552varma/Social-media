import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PostCard from "./PostComponents/PostCard";
import { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import api from "../Service/api";
import { UserContext } from "../Context/UserContext";
import LikeButtonLogic from "../Utils/LikesLogic";

const HomeComponent = () => {
  const { token, user } = useContext(UserContext);
  const { createPost, posts, setPosts, fetchPost, loading } =
    useContext(PostContext);
  const [like, setLike] = useState("");
  const [comment, setComment] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const header = {
    Authorization: token,
  };

  const handleLike = async (id) => {
    setLikeLoading(true);
    try {
      const response = await api.patch(
        `/post/postLike/${id}`,
        {},
        {
          headers: header,
        }
      );
      const likes = [...response.data.post.likes];
      const postId = response.data.post._id;
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          post.likes = [...likes];
        }
        return post;
      });
      setPosts([...updatedPosts]);
      setLikeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const postComment = async (e, postId) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/post/postComment/${postId}`,
        { comment },
        {
          headers: header,
        }
      );
      if (response.status == 200 && response.data.success == true) {
        const comment = response.data.post;
        const p = posts.filter((post) => {
          if (post._id === comment._id) {
            post.comments = [...comment.comments];
            console.log("Found same");
          }
          return post;
        });
        setPosts([...p]);
        console.log(posts);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxWidth="600px" maxHeight="100vh" margin="auto" padding="10px">
      {loading ? <PostCard loading={true} /> : null}
      {/* post */}
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <>
              <Card elevation={5} width="fit-content" key={post._id}>
                <CardHeader
                  sx={{}}
                  avatar={<Avatar src={post.author.profilePic} />}
                  title={<Typography>{post.author.username}</Typography>}
                  subheader={
                    <Typography>
                      <small>{post.createdAt.substring(0, 10)}</small>
                    </Typography>
                  }
                />
                <CardMedia
                  component="img"
                  style={{
                    objectFit: "down-scale",
                    maxHeight: "auto",
                    minWidth: "auto",
                  }}
                  height="400px"
                  width="400px"
                  image={post.image}
                />
                <CardActions disableSpacing>
                  <Box>
                    <IconButton onClick={() => handleLike(post._id)}>
                      {LikeButtonLogic(post.likes, user.id) ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "red" }} />
                      )}
                    </IconButton>
                    <br />
                    <small style={{ margin: 15 }}>{post.likes.length}</small>
                  </Box>
                  {/* <IconButton>
                    <MapsUgcIcon titleAccess="Comment" />
                  </IconButton> */}
                </CardActions>
                <Typography variant="h5" marginLeft={2} fontWeight="bold">
                  {post.caption}
                </Typography>
                <Typography marginLeft={2}>{post.hashtags}</Typography>
                <CardContent>
                  <Typography>Comments</Typography>
                  <Box sx={{ backgroundColor: "whitesmoke", padding: "10px" }}>
                    {post.comments.length > 0 ? (
                      <>
                        {post.comments.map((c) => {
                          return (
                            <Box key={c.comment}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={c.author.profilePic} />
                                <Typography>{c.author.username}</Typography>
                              </Box>
                              <Typography
                                marginLeft={10}
                                style={{
                                  backgroundColor: "white",
                                  width: "fit-content",
                                  padding: "5px",
                                }}
                              >
                                {c.comment}
                              </Typography>
                              <Divider />
                            </Box>
                          );
                        })}
                      </>
                    ) : (
                      "No comments yet"
                    )}
                  </Box>
                </CardContent>
                <form id={post._id} onSubmit={(e) => postComment(e, post._id)}>
                  <TextField
                    variant="standard"
                    type="text"
                    required
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    id="comment"
                    placeholder="type your comment here....."
                    style={{
                      width: "80%",
                      marginLeft: 10,
                    }}
                  />
                  <IconButton type="submit">
                    <AddCommentOutlinedIcon />
                  </IconButton>
                </form>
              </Card>
              <br />
              <Divider />
              <br />
            </>
          );
        })
      ) : (
        <Box margin="200px auto">
          <Typography textAlign="center" fontSize="larger" fontWeight="bold">
            No post available!
            <br />
            Try to add a new post
          </Typography>
        </Box>
      )}
      {posts.length > 0 && (
        <Divider>
          <Chip label="End of post" />
        </Divider>
      )}
    </Box>
  );
};

export default HomeComponent;
