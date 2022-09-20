import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { ChatContext } from "../Context/ChatContext";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
let socket;

const IndividualChatPage = () => {
  const { token } = useContext(UserContext);
  const { selectedChat } = useContext(ChatContext);
  const navigate = useNavigate();

  const { userId } = useParams();
  const [chats, SetChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        const data = { ...res.data };
        console.log(data);
        socket.emit("new message", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchChats = async () => {
    axios
      .get("http://localhost:3000/message/" + selectedChat._id, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMessages([messages, ...res.data]);
        socket.emit("join chat", selectedChat._id);
      })
      .catch((err) => {
        navigate("/chat");
      });
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
  }, []);

  useEffect(() => {
    fetchChats();
  }, [userId, fetchAgain]);
  useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      setMessages([...messages, newMessageReceived]);
    });
  }, []);
  return (
    <>
      <h1>CHat of {userId}</h1>

      {messages.length > 0 &&
        messages.map((m) => {
          return (
            <div key={m.content}>
              <h1>{m.content}</h1>
            </div>
          );
        })}
      <form onSubmit={sendMessage}>
        <label htmlFor="msg">Message</label>
        <input
          type="text"
          name="msg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <br />
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default IndividualChatPage;
