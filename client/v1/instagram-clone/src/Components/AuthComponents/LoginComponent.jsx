import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { invalid, error, setError } = useContext(UserContext);
  const url = new URL(window.location.href);
  const status = url.searchParams.get("status");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    if (status === "success") {
      const key = url.searchParams.get("bearer");
      const jwt = "Bearer " + key;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("jwt-auth", true);
      window.location.replace("http://localhost:3001/");
    }
    if (status === "failure") {
      const error = url.searchParams.get("error");
      setEmailError(
        "Accound already exist with this email used in FB please try with another account"
      );
    }
  }, []);

  return (
    <>
      <Container
        sx={{
          padding: "10px",
          margin: "10% auto",
          minWidth: "fit-content",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: "30rem",
            margin: "auto",
            padding: "20px",
            backgroundColor: "rgb(244, 244, 244)",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              style={{
                fontFamily: "'Dancing Script', 'cursive'",
                textDecoration: "none",
                color: "black",
              }}
              flex={1}
              variant="h4"
              component="a"
              href="/"
            >
              Friends Media
            </Typography>
          </Box>
          {invalid ? (
            <Typography
              sx={{
                textAlign: "center",
              }}
              color="red"
            >
              Invalid Credentials
            </Typography>
          ) : null}
          {error ? (
            <Typography
              sx={{
                textAlign: "center",
              }}
              color="red"
            >
              Something Went Wrong! please try later.
            </Typography>
          ) : null}

          {emailError ? (
            <Typography
              sx={{
                textAlign: "center",
              }}
              color="red"
            >
              {emailError}
            </Typography>
          ) : null}
          <LoginForm />

          <Divider>
            <Chip label="OR" />
          </Divider>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Button
              variant="text"
              onClick={() =>
                window.location.replace("http://localhost:3000/auth/facebook")
              }
            >
              <FacebookIcon color="blue" />
              Login with facebook
            </Button>
          </Box>
        </Paper>
        <br />
        <Paper
          elevation={0}
          sx={{
            maxWidth: "30rem",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "rgb(244, 244, 244)",
          }}
        >
          <Typography>
            Don't have an account? <span />
            <Link to="/auth/signup" color="blue">
              Sign up
            </Link>{" "}
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
