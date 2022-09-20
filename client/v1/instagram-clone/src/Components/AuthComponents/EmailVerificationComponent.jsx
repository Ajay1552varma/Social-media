import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import api from "../../Service/api";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
const EmailVerificationComponent = () => {
  const { invalid, error, email, setEmail, setError, userId } =
    useContext(UserContext);
  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [successResponse, setSuccessResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [navigateMessage, setNavigateMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.toString().length <= 6) setOtp(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target.otp.value);
    api
      .post("/auth/verify", {
        userId: userId,
        otp: otp,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setErrorResponse("");
          setSuccessResponse(res.data.message);
          setNavigateMessage("Navigating to Login page");
          setTimeout(() => {
            navigate("/");
          }, [5000]);
        }
        if (res.data.status === "failure") {
          setErrorResponse(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse("Something went wrong!");
      });
  };

  const handleDisable = () => {
    setDisabled(!disabled);
  };

  // change email id
  const changeEmailHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Email " + e.target.email.value);
    api
      .patch("/auth/changeEmail", {
        userId: userId,
        email: e.target.email.value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setSuccessResponse(res.data.message);
          setLoading(false);
        } else {
          setErrorResponse(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorResponse("Something went wrong! try later");
      });
  };

  useEffect(() => {
    if (!email && !userId) {
      return navigate("/");
    }

    setNavigateMessage("");
    setSuccessResponse();
    setErrorResponse();
    setLoading(false);
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
            {successResponse ? (
              <Typography color="green">{successResponse}</Typography>
            ) : (
              ""
            )}
            {navigateMessage ? (
              <Typography color="green">{navigateMessage}</Typography>
            ) : (
              ""
            )}
            {errorResponse ? (
              <Typography color="red">{errorResponse}</Typography>
            ) : (
              ""
            )}
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

          <Box textAlign="center">
            <Typography>Check your email</Typography>
            <Typography>OTP sent to this Mail Id: {email}</Typography>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              padding: "10px",
              width: "70%",
              margin: "0 auto",
            }}
          >
            {/* change email */}
            <form onSubmit={changeEmailHandler}>
              <input
                className="inputField"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                disabled={disabled}
                required={true}
                placeholder="OTP"
              />
              <br />
              <br />
              <Grid container spacing={3}>
                <Grid item sx={6} margin="auto">
                  <Button
                    sx={{
                      width: "100px",
                      margin: "0 auto",
                    }}
                    variant="outlined"
                    onClick={handleDisable}
                  >
                    Change
                  </Button>
                </Grid>
                <Grid item sx={6} margin="auto">
                  <Button
                    sx={{
                      width: "100px",
                      margin: "0 auto",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    SEND
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
            <form onSubmit={submitHandler}>
              <input
                className="inputField"
                style={{
                  width: "100px",
                  textAlign: "center",
                }}
                variant="outlined"
                name="otp"
                onChange={handleChange}
                value={otp}
                type="number"
                required={true}
                placeholder="OTP"
              />
              <br />
              <br />
              <Button
                sx={{
                  width: "100%",
                  height: "50px",
                }}
                variant="contained"
                type="submit"
              >
                {loading ? (
                  <ReactLoading type="bubbles" color="white" />
                ) : (
                  <>Verify</>
                )}
              </Button>
            </form>
          </Box>
        </Paper>
        <br />
      </Container>
    </>
  );
};

export default EmailVerificationComponent;
