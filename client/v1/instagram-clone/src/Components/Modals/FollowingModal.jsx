import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../../Service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  minWidth: "350px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ContainerStyle = {
  margin: "auto",
  textAlign: "right",
};

export default function FollowingModal() {
  const { token, followers, setErrorOpen, following, setFollowing } =
    useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const followUser = (userToFollow) => {
    api
      .get(`friends/follow/${userToFollow}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.operation === "follow") {
          if (followers) {
            const u = followers.filter((u) => {
              if (u.user._id == userToFollow) {
                return u;
              }
            });
            setFollowing([...following, ...u]);
          }
        }
        if (res.status === 200 && res.data.operation === "unfollow") {
          const u = followers.filter((u) => {
            if (u.user._id == userToFollow) {
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
          console.log(d);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Following</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="delete"
            onClick={handleClose}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography textAlign="center">Following</Typography>
          {following ? (
            following.map((u) => {
              return (
                <Container sx={ContainerStyle} key={u._id}>
                  <Grid
                    container
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
                        <Avatar src={u.user.profilePic} />
                        <div
                          style={{
                            padding: "10px",
                            listStyle: "none",
                          }}
                        >
                          <li>{u.user.username}</li>
                          <li>{u.user.name}</li>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          followUser(u.user._id);
                        }}
                      >
                        {" "}
                        Unfollow{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              );
            })
          ) : (
            <>
              <Typography>No Followings</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
