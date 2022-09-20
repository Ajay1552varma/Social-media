import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Buffer } from "buffer";
import resizeFile from "../Utils/resizeImage";

const EditPageComponent = () => {
  const {
    token,
    updateUserData,
    fetchUserData,
    user,
    setUser,
    userProfileImage,
    setUserProfileImage,
  } = useContext(UserContext);
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [pic, setPic] = useState();
  const [file, setFile] = useState();
  const [success, setSuccess] = useState(false);
  // const [userProfileImage, setUserProfileImage] = useState();

  const previewImage = (e) => {
    setFile(e.target.files[0]);
    setPic(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "name") {
      setName(value);
    }
    if (name == "bio") {
      setBio(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    resizeFile(file).then((rFile) => {
      if (!file) rFile = userProfileImage;
      console.log(file);
      console.log(rFile);
      updateUserData(token, name, bio, rFile)
        .then((res) => {
          const user = res.data.user;
          console.log(user);
          if (res.status === 200) {
            console.log("Successfuly updated");
            setUser({ ...user });
            setUserProfileImage(user.profilePic);
            // setUserProfileImage(
            //   `data:${user.profilePic.contentType};base64, ${Buffer.from(
            //     user.profilePic.data
            //   ).toString("base64")}`
            // );

            setSuccess(true);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  useEffect(() => {
    fetchUserData(token)
      .then((res) => {
        const { name, bio, profilePic } = res.data;
        setName(name);
        setBio(bio);
        setUserProfileImage(profilePic);
        // setUserProfileImage(
        //   `data:${profilePic.contentType};base64, ${Buffer.from(
        //     profilePic.data
        //   ).toString("base64")}`
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container
        sx={{
          padding: "10px",
          margin: "2% auto",
          minWidth: "fit-content",
        }}
      >
        {success ? (
          <div>
            <Typography color="green" textAlign="center">
              Updated Successfully
            </Typography>
          </div>
        ) : null}
        <Paper
          elevation={0}
          sx={{
            maxWidth: "30rem",
            margin: "auto",
            padding: "20px",
            backgroundColor: "rgb(244, 244, 244)",
          }}
        >
          <Typography component="h3" variant="h5" textAlign="center">
            Update your details
          </Typography>
          <br />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{}}>
                  <Avatar
                    sx={{
                      margin: "auto",
                      height: "150px",
                      width: "150px",
                    }}
                    src={pic || userProfileImage}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="profilePic">Change picture</label>
                  <input
                    className="inputField"
                    variant="outlined"
                    name="profilePic"
                    onChange={previewImage}
                    type="file"
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    className="inputField"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="Bio">Bio</label>
                  <input
                    type="text"
                    className="inputField"
                    name="bio"
                    placeholder="bio"
                    value={bio}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                sx={{
                  width: "100%",
                }}
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            </Box>
          </form>
        </Paper>
        <br />
      </Container>
    </>
  );
};

export default EditPageComponent;
