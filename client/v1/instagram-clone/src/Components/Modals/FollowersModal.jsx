import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../Service/api";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import followLogic from "../../Utils/folowLogic";

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

export default function FollowersModal() {
  const {
    token,
    followers,
    following,
    setFollowing,
    followUser,
    setErrorOpen,
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([...followers]);

  useEffect(() => {
    if (following.length > 0) {
      const d = followLogic(followers, following);
      setData([...d]);
    }
  }, [followers]);

  return (
    <div>
      <Button onClick={handleOpen}>Followers</Button>
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
          <Typography textAlign="center">Followers</Typography>
          {data ? (
            data.map((u) => {
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
                        variant={u.user.following ? "outlined" : "contained"}
                        onClick={(e) => {
                          followUser(u.user._id);
                          if (e.target.textContent === "follow") {
                            e.target.textContent = "unfollow";
                          } else {
                            e.target.textContent = "follow";
                          }
                        }}
                      >
                        {u.user.following ? "unfollow" : "follow"}
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              );
            })
          ) : (
            <>
              <Typography>No Followers</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
