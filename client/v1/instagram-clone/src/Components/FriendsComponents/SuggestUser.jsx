import { Avatar, Box, Button, Container, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../../Service/api";
import FriendsComponent from "./FriendsComponent";

const SuggestUser = () => {
  const { token } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOpen, setErrorOpen] = useState(false);

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
            if (u._id !== userToFollow) return u;
          });
          setAllUsers([...filteredUser]);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Container sx={{ width: "auto" }}>
        <FriendsComponent
          text="Users you may Know"
          allUsers={allUsers}
          setAllUsers={getAllUsers}
          followUser={followUser}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default SuggestUser;
