import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import api from "../Service/api";
import LoadingOverlay from "react-loading-overlay";
import CloseIcon from "@mui/icons-material/Close";

const ContainerStyle = {
  margin: "auto",
  textAlign: "right",
};

const inputStyle = {
  width: "90%",
  height: "40px",
  fontSize: "large",
  padding: "4px",
  borderRadius: "5px",
};

const SinglePostPage = () => {
  const { postId } = useParams();
  const { token, user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const navigate = useNavigate();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const header = {
    Authorization: token,
  };

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/getUserPost/${postId}`, {
        headers: header,
      });
      console.log(response);
      if (response.data.success == true) {
        setPost({ ...response.data.post });
        setCaption(response.data.post.caption);
        setHashtags(response.data.post.hashtags);
      }
    } catch (error) {
      setErrorMessage("Error fetching data! Navigating to profile page");
      setErrorOpen(true);
      setTimeout(() => {
        navigate("/user");
      }, 5000);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await api.delete(`post/deleteUserPost/${id}`, {
        headers: header,
      });
      if (response.data.success == true) {
        // console.log("Post deleted successfully");
        setSuccessMessage(
          "Post deleted Successfully! Navigating to profile page"
        );
        setSuccessOpen(true);
        setTimeout(() => {
          navigate("/user");
        }, 5000);
      }
    } catch (error) {
      setErrorMessage("Cannot delete post! try later");
      setErrorOpen(true);
    }
  };

  const updatePost = async (id) => {
    setUpdateLoading(true);
    const body = { caption, hashtags };
    try {
      const response = await api.patch(`post/updatePost/${id}`, body, {
        headers: header,
      });
      if (response.status == 200 && response.data.success == true) {
        const data = response.data;
        setCaption(data.updatedPost.caption);
        setHashtags(data.updatedPost.hashtags);
        setUpdateLoading(false);
        setSuccessOpen(true);
        setSuccessMessage("Successfullly Updated");
      } else {
        setErrorOpen(true);
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setUpdateLoading(false);
      setErrorOpen(true);
    }
  };
  console.log(post);

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      {Object.keys(post).length > 0 ? (
        <>
          <Collapse sx={{ width: "50%", margin: "auto" }} in={errorOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>Error!</AlertTitle>
              {errorMessage || "Something went wrong! try later"}
            </Alert>
          </Collapse>
          <Collapse sx={{ width: "50%", margin: "auto" }} in={successOpen}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccessOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>Success!</AlertTitle>
              {successMessage || "Operation suceessfully completed"}
            </Alert>
          </Collapse>
          <Paper
            style={{
              maxWidth: "500px",
              minWidth: "fit-content",
              margin: "20px auto",
            }}
          >
            <LoadingOverlay active={updateLoading} spinner text="Updating....">
              {Object.keys(post).length > 0 && (
                <Grid container>
                  {post.author._id === user.id ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <Box padding="10px">
                          <img
                            src={`${post.image}`}
                            style={{ maxWidth: "400px" }}
                            alt=""
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box textAlign="center">
                          <form>
                            <label htmlFor="caption">Caption: </label>
                            <input
                              style={inputStyle}
                              onChange={(e) => setCaption(e.target.value)}
                              disabled={
                                post.author._id === user.id ? false : true
                              }
                              type="text"
                              name="caption"
                              id="caption"
                              value={caption}
                            />
                            <br />
                            <br />
                            <label htmlFor="hashtags">Hashtags: </label>
                            <input
                              onChange={(e) => setHashtags(e.target.value)}
                              style={inputStyle}
                              disabled={
                                post.author._id === user.id ? false : true
                              }
                              type="text"
                              name="hashtags"
                              id="hashtags"
                              value={hashtags}
                            />
                            <Button
                              disabled={
                                post.author._id === user.id ? false : true
                              }
                              onClick={() => updatePost(post._id)}
                            >
                              Update
                            </Button>{" "}
                            <Button
                              variant="contained"
                              disabled={
                                post.author._id === user.id ? false : true
                              }
                              onClick={() => deletePost(post._id)}
                              style={{
                                backgroundColor: "red",
                              }}
                            >
                              Delete
                            </Button>
                          </form>
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Card elevation={5} width="fit-content" key={post._id}>
                        <CardHeader
                          sx={{}}
                          avatar={<Avatar src={post.author.profilePic} />}
                          title={
                            <Typography>{post.author.username}</Typography>
                          }
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
                        <Typography
                          variant="h5"
                          marginLeft={2}
                          fontWeight="bold"
                        >
                          {post.caption}
                        </Typography>
                        <Typography marginLeft={2}>{post.hashtags}</Typography>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              )}
              <br />
              <Divider />
              <Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Liked Users</Typography>

                    <Box>
                      {Object.keys(post).length > 0 && post.likes.length > 0 ? (
                        <Box>
                          {Object.keys(post).length > 0 &&
                            post.likes.map((user) => {
                              return (
                                <Container
                                  sx={ContainerStyle}
                                  key={user.author._id}
                                >
                                  <Grid
                                    container
                                    borderRight="1px solid black"
                                    spacing={2}
                                    alignItems="center"
                                    textAlign="center"
                                  >
                                    <Grid item xs={6}>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar src={user.author.profilePic} />
                                        <div
                                          style={{
                                            padding: "10px",
                                            listStyle: "none",
                                          }}
                                        >
                                          <li>{user.author.username}</li>
                                          <li>{user.author.name}</li>
                                        </div>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Container>
                              );
                            })}
                        </Box>
                      ) : (
                        <Typography>No Likes</Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography>Comments</Typography>
                      {Object.keys(post).length > 0 &&
                      post.comments.length > 0 ? (
                        post.comments.map((comment) => {
                          return (
                            <Box
                              key={comment.author._id}
                              sx={{
                                padding: "10px",
                              }}
                            >
                              <small
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={comment.author.profilePic} />
                                <Typography>
                                  {comment.author.username}
                                </Typography>
                              </small>
                              <Typography
                                fontSize="large"
                                fontWeight="bolder"
                                marginLeft="20px"
                              >
                                {comment.comment}
                              </Typography>
                              <Divider />
                            </Box>
                          );
                        })
                      ) : (
                        <Typography>No Comments</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </LoadingOverlay>
          </Paper>
        </>
      ) : (
        <Paper
          style={{
            maxWidth: "70%",
            margin: "20px auto",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box padding="10px" margin="auto">
                <Skeleton width={400} height={400} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" height={40} width={150} />
              <Skeleton variant="text" height={40} width={150} />
            </Grid>
          </Grid>
          <Skeleton
            style={{
              margin: "0 auto",
              padding: "10px",
            }}
            variant="rectangular"
            height={70}
            width="400px"
          />
        </Paper>
      )}
    </>
  );
};

export default SinglePostPage;
