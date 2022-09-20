import {
  AppBar,
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomMenuBar from "../Components/BottomMenuBar";
import TopMenuBar from "../Components/TopMenuBar";
import { UserContext } from "../Context/UserContext";
import { Buffer } from "buffer";
import { Box } from "@mui/system";

const BaseLayout = () => {
  const {
    token,
    fetchUserData,
    setUser,
    setUserProfileImage,
    error,
    setError,
    clearStorage,
    clearStates,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    clearStorage();
    clearStates();
    navigate("/auth/login");
  };

  useEffect(() => {
    fetchUserData(token)
      .then((res) => {
        const user = res.data;
        setUser({ ...user });
        setUserProfileImage(user.profilePic);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        localStorage.clear();
        navigate("/auth/login");
      });
  }, []);

  return (
    <>
      <Box
        elevation={0}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <TopMenuBar />
        <Outlet />
      </Box>

      <Paper
        elevation={0}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <AppBar
          elevation={0}
          position="static"
          sx={{
            backgroundColor: "#05386B",
          }}
        >
          <Container
            sx={{
              maxWidth: "1000px",
            }}
          >
            <Toolbar>
              <Typography
                flexGrow={1}
                style={{
                  fontFamily: "'Dancing Script', 'cursive'",
                }}
                className="appLogo"
                variant="h4"
                noWrap
                component="a"
                href="/"
              >
                Friends Media
              </Typography>
              <Button
                variant="standard"
                sx={{ color: "white" }}
                onClick={logOut}
              >
                Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container
          sx={{
            maxWidht: "1000px",
          }}
        >
          <Outlet />
        </Container>

        <BottomMenuBar />
      </Paper>
    </>
  );
};

export default BaseLayout;
