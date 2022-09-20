import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import api from "../Service/api";
import FriendsComponent from "./FriendsComponents/FriendsComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingOverlay from "react-loading-overlay";
const FindFriendsComponent = () => {
  const { token } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [userResult, setUserResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const getAllUsers = () => {
    api
      .get("/user/findUsers", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.result;
          setAllUsers([...data]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };

  const followUser = (userToFollow) => {
    api
      .get(`friends/follow/${userToFollow}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.operation === "follow") {
          const filteredUser = allUsers.filter((u) => {
            if (u._id !== userToFollow) {
              return u;
            }
          });
          setAllUsers([...filteredUser]);
          userResult.map((u) => {
            if (u._id === userToFollow) u["following"] = true;
          });
        }
        if (res.status === 200 && res.data.operation === "unfollow") {
          userResult.map((u) => {
            if (u._id === userToFollow) u["following"] = false;
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };

  const handleSearch = async (e) => {
    setSearchLoading(true);
    e.preventDefault();
    const searchElement = e.target.search.value;
    console.log(searchElement);
    if (!searchElement) {
      setSearchResult([]);
      setErrorOpen(true);
      setUserResult([]);
      setSearchLoading(false);
      return setErrorMessage("Nothing to search");
    }
    try {
      const response = await api.get(`/user/search/${searchElement}`, {
        headers: {
          Authorization: token,
        },
      });
      setSearchResult([...response.data.hashtags]);
      setUserResult([...response.data.users]);
      setSearchLoading(false);
    } catch (error) {
      console.log(error);
      setSearchLoading(false);
      setErrorMessage("");
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container
      style={{
        backgroundColor: "white",
        margin: "2% auto",
        maxWidth: "900px",
        minHeight: "80vh",
        padding: "10px",
        borderRadius: "10px",
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
          {errorMessage || "Something went wrong! please try again later"}
        </Alert>
      </Collapse>
      <Container sx={{ width: "auto" }}>
        <Box width="80%" padding="10px" margin="5% auto" textAlign="center">
          <form onSubmit={handleSearch}>
            <Box display="flex" justifyContent="center">
              <TextField
                type="text"
                autoFocus="on"
                name="search"
                placeholder="Search by hashtag or username"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "large",
                }}
              />
              <IconButton type="submit">
                <TravelExploreIcon fontSize="large" />
              </IconButton>
            </Box>
          </form>
        </Box>
        <LoadingOverlay active={searchLoading} spinner text="Please Wait....">
          <div
            style={{
              width: "fit-content",
              margin: "auto",
              color: "#ebebe0",
            }}
          >
            {searchResult.length === 0 && userResult.length === 0 ? (
              <TravelExploreIcon
                style={{
                  fontSize: "200px",
                }}
              />
            ) : null}
          </div>
          <Container>
            <br />
            {userResult.length > 0 ? (
              <FriendsComponent
                text="Users"
                allUsers={userResult}
                setAllUsers={getAllUsers}
                followUser={followUser}
                loading={loading}
              />
            ) : null}

            <Box sx={{ backgroundColor: "#ebebe0", padding: "10px" }}>
              {searchResult.length > 0 ? (
                <Typography textAlign="center" fontSize="larger">
                  Result based on #tags
                </Typography>
              ) : null}

              {searchResult.length > 0 &&
                searchResult.map((u) => {
                  return (
                    <Container
                      key={u._id}
                      sx={{
                        margin: "auto",
                        width: "90%",
                        backgroundColor: "white",
                      }}
                    >
                      <Typography p={1} fontWeight="bolder">
                        <small
                          style={{ fontSize: "small", fontWeight: "lighter" }}
                        >
                          #tag
                        </small>{" "}
                        {u.hashtags}
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        margin="auto"
                      >
                        <Grid item xs={12} md={4} p={1}>
                          <Box display="flex" alignItems="center">
                            <img
                              style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "10px",
                              }}
                              src={u.image}
                              alt=""
                            />
                            <Typography marginLeft={1}>{u.caption}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={5}>
                          <Box display="flex" alignItems="center">
                            <Avatar src={u.author.profilePic}>
                              {u.author.username.substring(0, 1)}
                            </Avatar>
                            <Typography>{u.author.username}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            onClick={() => {
                              navigate("/post/" + u._id);
                            }}
                          >
                            View
                          </Button>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Container>
                  );
                })}
            </Box>
          </Container>
        </LoadingOverlay>
      </Container>
    </Container>
  );
};

export default FindFriendsComponent;
