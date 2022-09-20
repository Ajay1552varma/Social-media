import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Container } from "@mui/system";
import UserPost from "./UserPost";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import FollowersModal from "./Modals/FollowersModal";
import FollowingModal from "./Modals/FollowingModal";
import CloseIcon from "@mui/icons-material/Close";

const UserComponent = () => {
  const {
    token,
    fetchUserData,
    userProfileImage,
    followers,
    following,
    errorOpen,
    setErrorOpen,
    getFollowers,
    getFollowing,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUserData(token)
      .then((res) => {
        setUser({ ...res.data });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    getFollowing();
    getFollowers();
  }, []);

  return (
    <Box
      style={{
        backgroundColor: "white",
        margin: "15px auto",
        width: "90%",
        height: "auto",
        borderRadius: "10px",
        paddingBottom: "100px",
      }}
    >
      <br />
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
          Something went wrong! please try again later
        </Alert>
      </Collapse>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "20px",
            margin: "auto",
          }}
        >
          <Grid item xs={4}>
            {loading ? (
              <Skeleton variant="circular">
                <Avatar
                  sx={{
                    height: "auto",
                    maxHeight: "9rem",
                    margin: "auto",
                    width: "auto",
                    maxWidth: "9rem",
                  }}
                />
              </Skeleton>
            ) : (
              <Avatar
                src={userProfileImage}
                sx={{
                  height: "auto",
                  maxHeight: "9rem",
                  margin: "auto",
                  width: "auto",
                  maxWidth: "9rem",
                }}
              />
            )}
          </Grid>

          <Grid item xs={8} sx={{}} textAlign="left">
            <Container style={{}}>
              {loading ? (
                <>
                  <Skeleton width="50%" />
                  <Skeleton width="80%" />
                  <Skeleton width="80%" />
                </>
              ) : (
                <>
                  <p>
                    <span className="username"> {user.username}</span>
                    <span> </span>
                    <Link className="editLink" to="/user/edit">
                      Edit profile
                    </Link>
                  </p>

                  <Container
                    sx={{
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <br />
                    <table
                      width="90%"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <tr>
                        <th>POST</th>
                        <th>
                          <FollowersModal followers={followers} />
                        </th>
                        <th>
                          <FollowingModal following={following} />
                        </th>
                      </tr>
                      <tr>
                        <td>{user.post ? user.post.length : 0}</td>
                        <td>{followers ? followers.length : 0}</td>
                        <td>{following ? following.length : 0}</td>
                      </tr>
                    </table>
                    <br />
                    <p style={{ fontWeight: "bold" }}>{user.name}</p>
                    <p style={{ fontWeight: "lighter" }}>{user.bio}</p>
                  </Container>
                </>
              )}
            </Container>
          </Grid>
          <br />
        </Grid>

        <Container
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {loading ? (
            <Skeleton
              sx={{
                margin: "auto",
              }}
              variant="rectangular"
              height={70}
              width="90%"
            />
          ) : (
            <>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <small>NAME: </small>
                  {user.name}
                </li>
                <li>
                  <br />
                  <small>ABOUT: </small>
                  {user.bio}
                </li>
              </ul>
              <table
                width="100%"
                style={{
                  textAlign: "center",
                }}
              >
                <tr>
                  <th>POST</th>
                  <th>
                    <FollowersModal followers={followers} />
                  </th>
                  <th>
                    <FollowingModal following={following} />
                  </th>
                </tr>
                <tr>
                  <td>{user.post ? user.post.length : 0}</td>
                  <td>{followers ? followers.length : 0}</td>
                  <td>{following ? following.length : 0}</td>
                </tr>
              </table>
            </>
          )}
        </Container>
        <Divider>
          <Chip label="POST" />
        </Divider>
        <UserPost />
      </Container>
    </Box>
  );
};

export default UserComponent;
