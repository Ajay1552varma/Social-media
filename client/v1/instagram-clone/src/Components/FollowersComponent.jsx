import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import followLogic from "../Utils/folowLogic";

const boxStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  margin: "10px auto",
  textAlign: "center",
  minHeight: "30vh",
  //   maxHeight: "400px",
  //   overflowY: "scroll",
  overflowX: "hidden",
};

const FollowersComponent = () => {
  const { followers, setFollowers, following, getFollowers, followUser } =
    useContext(UserContext);

  useEffect(() => {
    getFollowers();
  }, []);
  useEffect(() => {
    if (following.length > 0) {
      followLogic(followers, following);
    }
  }, [followers]);

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
          Followers ({followers.length > 0 ? followers.length : "0"})
        </Typography>
        <Box
          padding={1}
          sx={{
            maxHeight: "auto",
          }}
        >
          {followers.length > 0 ? (
            followers.map((item) => {
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
                        variant={item.user.following ? "outlined" : "contained"}
                        onClick={(e) => {
                          followUser(item.user._id);
                        }}
                      >
                        {item.user.following ? "unfollow" : "follow"}
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              );
            })
          ) : (
            <Typography margin="50% auto">NO Followers</Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default FollowersComponent;
