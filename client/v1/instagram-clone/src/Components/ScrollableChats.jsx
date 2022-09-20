import { Avatar, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { UserContext } from "../Context/UserContext";
import ReactLoading from "react-loading";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Utils/ChatLogics";
import LoadingOverlay from "react-loading-overlay";

const ScrollableChats = ({ messages }) => {
  const { user } = useContext(UserContext);

  return (
    <ScrollableFeed>
      {messages.length > 0 ? (
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {/* {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start">
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.profilePic}
                />
              </Tooltip>
            )} */}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))
      ) : (
        <div
          style={{
            width: "fit-content",
            margin: "50% auto",
          }}
        >
          <Typography
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            No messages found
          </Typography>
        </div>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChats;
