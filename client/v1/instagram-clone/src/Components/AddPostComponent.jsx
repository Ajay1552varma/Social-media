import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import { resizePost } from "../Utils/resizeImage";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const AddPostComponent = ({ handleClose }) => {
  const { posts, setPosts, createPost } = useContext(PostContext);
  const [file, setFile] = useState();
  const [pic, setPic] = useState();
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const previewImage = (e) => {
    setFile(e.target.files[0]);
    setPic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    const data = {
      hashtags,
      caption,
    };
    resizePost(file)
      .then((rFile) => {
        createPost(data, rFile)
          .then((res) => {
            if (res.status == 201) {
              const p = [...posts];
              const createdPost = { ...res.data.post };
              setPosts([createdPost, ...p]);
              setPic(null);
              setHashtags("");
              setLoading(false);
              setCaption("");
              handleClose();
              navigate("/");
            }
          })
          .catch((err) => {
            setLoading(false);
            setError("Something went wrong! Try later");
          });
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong! Try later");
      });
  };

  return (
    <>
      <Box
        sx={{
          margin: "20px auto",
          maxWidth: "fit-content",
          backgroundColor: "white",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography fontSize="larger" fontWeight="bold" textAlign="center">
          Post a new feed
        </Typography>
        <FormControl>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ padding: "10px" }}
          >
            <label
              htmlFor="image"
              style={{ cursor: "pointer" }}
              label="Click Here to Add Image"
            >
              <div className="wrapper">
                {(() => {
                  if (pic) {
                    return <img src={pic} />;
                  } else {
                    return (
                      <img
                        src="http://cdn.onlinewebfonts.com/svg/img_212915.png"
                        style={{ width: "100%" }}
                      />
                    );
                  }
                })()}
              </div>
            </label>
            <samll style={{ color: "#777", fontSize: "15px" }}>
              Click on icon to add image
            </samll>
            <input
              className="inputField"
              style={{
                display: "none",
              }}
              onChange={previewImage}
              type="file"
              name="image"
              id="image"
              required
            />
            <TextField
              name="caption"
              style={{ margin: "10px 0px 10px 0px" }}
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              required
              placeholder="Caption"
            />
            <br />
            <TextField
              name="hashtags"
              style={{ margin: "10px 0px 10px 0px" }}
              onChange={(e) => setHashtags(e.target.value)}
              value={hashtags}
              required
              placeholder="HashTags"
            />
            <br />
            {error && <Typography color="red">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                height: "50px",
                color: "white",
                backgroundColor: "#05386B",
                ":hover": {
                  backgroundColor: "#05386B",
                },
              }}
            >
              POST
              {loading && <ReactLoading type="bubbles" color="white" />}
            </Button>
          </form>
        </FormControl>
      </Box>
    </>
  );
};

export default AddPostComponent;
