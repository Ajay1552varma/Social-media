import { Box, Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import LoginFormSchema from "../../Schema/LoginFormSchema";
import ReactLoading from "react-loading";

const LoginForm = () => {
  const { login, email, setEmail, setInvalid, userId, setUserId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    setLoading(true);
    login(values)
      .then((res) => {
        if (res.data.success === true) {
          const jwt = res.data.Bearer;
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("jwt-auth", true);
          setInvalid(false);
          setLoading(false);
          navigate("/");
        }
        if (res.data.success === false) {
          setEmail(res.data.email);
          setUserId(res.data.userId);
          setLoading(false);
          navigate("/auth/verifyaccount");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setInvalid(true);
      });
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginFormSchema}
      onSubmit={submitHandler}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            padding="10px"
            sx={{
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  className="inputField"
                  variant="outlined"
                  name="username"
                  type="text"
                  placeholder="username"
                />
                {/* Errors */}
                <>
                  {errors.username && touched.username ? (
                    <div style={{ color: "red" }}>{errors.username}</div>
                  ) : null}
                </>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  className="inputField"
                  variant="outlined"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <>
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                </>
              </Grid>
            </Grid>
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
                <>Login</>
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
