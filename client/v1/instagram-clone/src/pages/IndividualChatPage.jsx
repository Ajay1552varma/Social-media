import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { ChatContext } from "../Context/ChatContext";
import api from "../Service/api";
import { io } from "socket.io-client";
import { Box } from "@mui/system";
import ScrollableChats from "../Components/ScrollableChats";
import { Container, Divider, TextField } from "@mui/material";
import LoadingOverlay from "react-loading-overlay";

const ENDPOINT = "http://localhost:3000";

let socket, selectedChatCompare;

const IndividualChatPage = () => {
  const { token, user } = useContext(UserContext);
  const { selectedChat, messages, setMessages } = useContext(ChatContext);
  const navigate = useNavigate();
  const { uId } = useParams();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [socketConected, setSocketConected] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        content,
        chatId: selectedChat._id,
      };
      const response = await api.post("/message", config, {
        headers: {
          Authorization: token,
        },
      });
      socket.emit("new message", response.data);
      setMessages([...messages, response.data]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    if (Object.keys(selectedChat).length <= 0) return navigate("/chat");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      setLoading(true);
      const response = await api.get(`/message/${selectedChat._id}`, config);
      // console.log(response.data);
      setMessages(response.data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      // navigate("/chat");
      console.log(error);
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConected(true);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        Object.keys(selectedChatCompare).length > 0 &&
        selectedChatCompare._id === newMessageReceived.chat._id
      ) {
        console.log("Setting current user");
        setMessages([...messages, newMessageReceived]);
      } else {
        console.log("Notificationhere");
        // setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <>
      <LoadingOverlay active={loading} spinner text="Loading....">
        {/* small screen */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            minHeight: "50vh",
            maxHeight: "70vh",
            overflow: "scroll",
          }}
        >
          <div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundColor: "rgb(233, 247, 236)",
                minHeight: "600px",
                maxHeight: "600px",
              }}
            >
              <ScrollableChats messages={messages} />
            </div>
          </div>
          <div style={{}}>
            <form onSubmit={sendMessage}>
              <TextField
                type="text"
                variant="filled"
                autoComplete="off"
                required
                sx={{
                  width: "100%",
                }}
                name="msg"
                placeholder="Type your message...."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type="submit" hidden />
            </form>
          </div>
        </Box>

        {/* large screen */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundColor: "rgb(233, 247, 236)",
              minHeight: "80vh",
              maxHeight: "80vh",
            }}
          >
            <ScrollableChats loading={loading} messages={messages} />
          </div>
          <div style={{}}>
            <form onSubmit={sendMessage}>
              <TextField
                type="text"
                variant="filled"
                autoComplete="off"
                required
                sx={{
                  width: "100%",
                }}
                name="msg"
                placeholder="Type your message...."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type="submit" hidden />
            </form>
          </div>
        </Box>
      </LoadingOverlay>
    </>
  );
};

export default IndividualChatPage;
