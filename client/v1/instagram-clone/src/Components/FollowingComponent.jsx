import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import api from "../Service/api";
import followLogic from "../Utils/folowLogic";

const boxStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  margin: "10px auto",
  textAlign: "center",
  minHeight: "30vh",
  overflowX: "hidden",
};

const FollowingComponent = () => {
  const {
    following,
    followers,
    token,
    setErrorOpen,
    setFollowing,
    getFollowing,
    setFollowers,
  } = useContext(UserContext);

  const followUser = (userToFollow) => {
    api
      .get(`friends/follow/${userToFollow}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.operation === "unfollow") {
          const flwrs = [...followers];
          // getting the unfollowed user from followed list
          const u = followers.filter((u) => {
            if (u.user._id == userToFollow) {
              u.user["following"] = false;
              return u;
            }
          });
          if (!u.length > 0) {
            const d = following.filter((user) => {
              if (user.user._id !== userToFollow) return user;
            });
            return setFollowing([...d]);
          }
          const d = following.filter((user) => {
            if (u[0].user._id !== user.user._id) {
              return user;
            }
          });
          setFollowing([...d]);
          // console.log(followers);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };

  useEffect(() => {
    getFollowing();
  }, []);
  return (
    <>
      <Paper elevation={10} sx={boxStyle}>
        <Typography
          sx={{
            backgroundColor: "whitesmoke",
            borderRadius: "10px",
            fontSize: "x-large",
          }}
        >
          Following ({following.length > 0 ? following.length : "0"})
        </Typography>
        <Box
          padding={1}
          sx={{
            maxHeight: "auto",
          }}
        >
          {following.length > 0 ? (
            following.map((item) => {
              return (
                <Box key={item._id} sx={{ margin: "auto", width: "100%" }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    margin="auto"
                    textAlign="center"
                  >
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar src={item.user.profilePic || "profilepic"} />
                        <div
                          style={{
                            padding: "10px",
                            listStyle: "none",
                          }}
                        >
                          <li>{item.user.username}</li>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          followUser(item.user._id);
                        }}
                      >
                        {" "}
                        Unfollow{" "}
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              );
            })
          ) : (
            <Typography margin="50% auto">NO following</Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default FollowingComponent;
