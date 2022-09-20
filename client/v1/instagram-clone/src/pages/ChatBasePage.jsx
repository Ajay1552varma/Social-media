import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ChatComponent from "../Components/ChatComponent";
import { UserContext } from "../Context/UserContext";
import { ChatContext } from "../Context/ChatContext";
import api from "../Service/api";

const ChatPage = () => {
  const { token } = useContext(UserContext);
  const { selectedChat, users, setUsers } = useContext(ChatContext);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    api
      .get("/user/getAllUsers", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUsers([...res.data]);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        maxWidth: "95%",
        margin: "auto",
        height: "90vh",
        borderRadius: "10px",
      }}
    >
      <Box
        margin="10px auto"
        sx={{
          height: "80vh",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={5}>
            <ChatComponent users={users} loadingUser={loadingUser} />
          </Grid>
          <Grid item xs={12} md={7}>
            {Object.keys(selectedChat).length === 0 ? (
              <Typography
                textAlign="center"
                fontSize="large"
                marginTop="30%"
                fontWeight="bold"
              >
                Select the person to Chat
              </Typography>
            ) : (
              ""
            )}
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatPage;
