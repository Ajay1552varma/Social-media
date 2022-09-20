import {
  Avatar,
  Button,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

function FriendsComponent({ allUsers, followUser, loading, text }) {
  const { following, getFollowing } = useContext(UserContext);

  useEffect(() => {
    getFollowing();
    if (allUsers.length > 0 && following.length > 0) {
      allUsers.forEach((user) => {
        following.forEach((following) => {
          if (user._id === following.user._id) {
            user["following"] = true;
          }
        });
      });
    }
  }, []);

  return (
    <>
      <Container>
        <Typography textAlign="center" fontSize="larger">
          {text}
        </Typography>
        <br />
        {loading && (
          <Container sx={{ margin: "auto", width: "90%" }}>
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
                  <Skeleton variant="circular">
                    <Avatar />
                  </Skeleton>
                </Box>
              </Grid>
              <Skeleton variant="rectangular" />
              <Grid item xs={6}>
                <Skeleton variant="rectangle">
                  <Button />
                </Skeleton>
              </Grid>
            </Grid>
          </Container>
        )}
        <Divider />
        <br />
        {allUsers.length > 0 ? (
          allUsers.map((u) => {
            return (
              <Container key={u._id} sx={{ margin: "auto", width: "100%" }}>
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
                      <Avatar src={u.profilePic || "profilepic"} />
                      <div
                        style={{
                          padding: "10px",
                          listStyle: "none",
                        }}
                      >
                        <li>{u.username}</li>
                        {/* <li>{u.name}</li> */}
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant={u.following ? "outlined" : "contained"}
                      onClick={(e) => {
                        followUser(u._id);
                      }}
                    >
                      {u.following ? "unfollow" : "follow"}
                    </Button>
                  </Grid>
                </Grid>
                <Divider />
              </Container>
            );
          })
        ) : (
          <Box textAlign="center">
            <Typography
              style={{
                fontSize: "large",
                backgroundColor: "GrayText",
                width: "fit-content",
                textAlign: "center",
                margin: "auto",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              No New Users Found
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default FriendsComponent;
