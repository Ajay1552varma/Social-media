import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      <Container
        sx={{
          padding: "10px",
          margin: "5% auto",
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
            <Typography>Sign up to see photos from your friends</Typography>
          </Box>
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
          <Divider>
            <Chip label="OR" />
          </Divider>
          <SignUpForm />
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
            Already have an account? <span />
            <Link to="/auth/login" color="blue">
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
