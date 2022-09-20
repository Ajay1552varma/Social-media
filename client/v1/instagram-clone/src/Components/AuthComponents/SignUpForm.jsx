import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import SignUpFormSchema from "../../Schema/SignUpFormSchema";
import resizeFile from "../../Utils/resizeImage";
import ReactLoading from "react-loading";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [file, setFile] = useState();
  const { register, setEmail, userId, setUserId } = useContext(UserContext);
  const [errorRes, setErrorRes] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorUsername, setErrorUsername] = useState(null);
  const [disable, setDisable] = useState(false);
  const [type, setType] = useState("text");
  const [loading, setLoading] = useState(false);

  const previewImage = (e) => {
    setFile(e.target.files[0]);
    setPic(URL.createObjectURL(e.target.files[0]));
  };
  const handleFocus = (e) => {
    setType("date");
  };

  const handleSubmit = (values) => {
    setDisable(true);
    setLoading(true);
    resizeFile(file).then((rFile) => {
      register(values, rFile)
        .then((res) => {
          setEmail(res.data.email);
          setUserId(res.data.userId);
          navigate("/auth/verifyaccount");
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_BAD_REQUEST") {
            const errors = err.response.data.errors;
            setErrorEmail(errors.email);
            setErrorPassword(errors.password);
            setErrorUsername(errors.username);
            setDisable(false);
            setLoading(false);
          }
          setErrorRes(true);
          setDisable(false);
          setLoading(false);
        });
    });
  };
  return (
    <>
      {errorRes ? (
        <>
          <div>
            <Typography
              sx={{
                textAlign: "center",
              }}
              color="red"
            >
              Something went wrong! <br />
              {errorEmail || errorPassword || errorUsername}
            </Typography>
          </div>
        </>
      ) : null}
      <Formik
        initialValues={{
          name: "",
          dob: "",
          bio: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={SignUpFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form encType="multipart/form-data">
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
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                  {/* Errors */}
                  <>
                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }}>{errors.name}</div>
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
                    name="dob"
                    onFocus={handleFocus}
                    type={type}
                    placeholder="Date of Birth"
                  />
                  {/* Errors */}
                  <>
                    {errors.dob && touched.dob ? (
                      <div style={{ color: "red" }}>{errors.dob}</div>
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
                    name="bio"
                    type="text"
                    placeholder="bio"
                  />
                  {/* Errors */}
                  <>
                    {errors.bio && touched.bio ? (
                      <div style={{ color: "red" }}>{errors.bio}</div>
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
                    name="email"
                    type="text"
                    placeholder="email"
                  />
                  {/* Errors */}
                  <>
                    {errors.email && touched.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                  </>
                </Grid>
              </Grid>
              <br />

              <Grid container spacing={2}>
                <Grid item xs={6} sx={{}}>
                  <Avatar
                    src={pic}
                    sx={{
                      margin: "auto",
                      height: "auto",
                      width: "auto",
                      maxHeight: "6rem",
                      maxWidth: "6rem",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  Choose Profile Picture
                  <input
                    className="inputField"
                    variant="outlined"
                    name="profilePic"
                    onChange={previewImage}
                    type="file"
                    placeholder="profilePic"
                  />
                </Grid>
              </Grid>
              <br />

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
                disabled={disable}
                variant="contained"
                type="submit"
              >
                Sign Up{" "}
                {loading && <ReactLoading type="bubbles" color="white" />}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
