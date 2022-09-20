import {
  Alert,
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  colors,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import api from "../Service/api";
import EditIcon from "@mui/icons-material/Edit";
import LikeButtonLogic from "../Utils/LikesLogic";
import { Box } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const UserPost = () => {
  const { token, user } = useContext(UserContext);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const header = {
    Authorization: token,
  };

  const navigateToUpdate = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await api.delete(`post/deleteUserPost/${id}`, {
        headers: header,
      });
      if (response.data.success == true) {
        // console.log("Post deleted successfully");
        const filteredPost = userPost.filter((post) => {
          if (post._id !== id) return post;
        });
        setUserPost([...filteredPost]);
        setSuccessMessage("Post deleted Successfully!");
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getUserPost = async () => {
    try {
      const response = await api.get("/post/getUserPost", {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success == true) {
        setUserPost([...response.data.posts]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <Container sx={{ margin: "auto", width: "fit-content" }}>
      {userPost.length > 0 ? (
        <Grid
          container
          spacing={1}
          style={{
            margin: "auto",
          }}
        >
          {userPost.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item._id}>
              <Card
                elevation={5}
                sx={{ minWidth: "40vh", maxWidth: "fit-content" }}
              >
                <CardHeader
                  avatar={<Avatar sx={user.profilePic} />}
                  action={
                    <>
                      <IconButton
                        onClick={() => {
                          navigateToUpdate(item._id);
                        }}
                      >
                        <EditIcon style={{ color: "GrayText" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDeletePost(item._id);
                        }}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </>
                  }
                  title={<Typography>{user.username}</Typography>}
                  subheader={
                    <Typography>
                      <small>{item.createdAt.substring(0, 10)}</small>
                    </Typography>
                  }
                />
                <CardMedia>
                  <div
                    style={{
                      margin: "auto",
                      maxWidth: "30vh",
                      maxHeight: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      style={{
                        objectFit: "scale-down",
                      }}
                    />
                  </div>
                </CardMedia>
                <CardActions disableSpacing>
                  <Box>
                    <IconButton onClick={() => {}}>
                      {LikeButtonLogic(item.likes, user.id) ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "red" }} />
                      )}
                    </IconButton>
                    <br />
                    <small style={{ margin: 15 }}>{item.likes.length}</small>
                  </Box>
                  <Box>
                    <IconButton onClick={() => {}}>
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                    <br />
                    <small style={{ margin: 15 }}>{item.comments.length}</small>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <br />
          <br />
          <Typography
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: "larger",
            }}
          >
            NO POST
          </Typography>
        </>
      )}
      {loading && (
        <ImageList
          sx={{ maxWidth: "100%", width: "auto", height: 450 }}
          cols={3}
          rowHeight="auto"
        >
          <ImageListItem sx={{}}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "250px",
              }}
            />
          </ImageListItem>
          <ImageListItem>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "250px",
              }}
            />
          </ImageListItem>
          <ImageListItem>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "250px",
              }}
            />
          </ImageListItem>
        </ImageList>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserPost;
