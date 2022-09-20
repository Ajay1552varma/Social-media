import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const ChatComponent = ({ users, loadingUser }) => {
  const { setSelectedChat, accessChat } = useContext(ChatContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const selectHandler = async (userId) => {
    const chat = await accessChat(userId);
    setActive(userId);
    setSelectedChat({ ...chat });
    navigate("/chat/" + userId);
  };

  return (
    <Container maxWidth="fit-content">
      <Box
        sx={{
          display: { xs: "block", md: "none", xs: "flex" },
          width: "device-width",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          listStyle: "none",
        }}
      >
        {users &&
          users.map((u) => {
            return (
              <Box
                sx={{
                  padding: "10px",
                  width: "70px",
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: u._id === active ? "rgb(233, 247, 236)" : "",
                }}
              >
                <li
                  id={u._id}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    selectHandler(u._id);
                  }}
                >
                  <Avatar src={u.profilePic} style={{ margin: "auto" }} />
                  {u.name.substring(0, 5)}..
                </li>
              </Box>
            );
          })}
      </Box>
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          minHeight: "100%",
          backgroundColor: "rgb(246, 246, 246)",
        }}
      >
        <Stack>
          <Typography
            sx={{
              width: "auto",
              textAlign: "center",
              padding: 2,
              backgroundColor: "rgb(246, 246, 246)",
              fontWeight: "bold",
            }}
          >
            Chats
          </Typography>
          <Divider />

          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div
                  key={user._id}
                  onClick={() => {
                    selectHandler(user._id);
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        user._id === active ? "rgb(233, 247, 236)" : "white",
                    }}
                  >
                    <Box
                      display="flex"
                      maxWidth="fit-content"
                      padding="20px"
                      alignItems="center"
                    >
                      <Avatar src={user.profilePic} />
                      <Typography textAlign="center" marginLeft="5vh">
                        {user.name}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                </div>
              );
            })
          ) : (
            <>
              <>
                <Box
                  display="flex"
                  maxWidth="fit-content"
                  padding="20px"
                  alignItems="center"
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={200} height={40} />
                </Box>
                <Box
                  display="flex"
                  maxWidth="fit-content"
                  padding="20px"
                  alignItems="center"
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={200} height={40} />
                </Box>
                <Box
                  display="flex"
                  maxWidth="fit-content"
                  padding="20px"
                  alignItems="center"
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={200} height={40} />
                </Box>
                <Box
                  display="flex"
                  maxWidth="fit-content"
                  padding="20px"
                  alignItems="center"
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={200} height={40} />
                </Box>
              </>
            </>
          )}
          {users.length < 0 && <h1>No users</h1>}
        </Stack>
      </Box>
    </Container>
  );
};

export default ChatComponent;
