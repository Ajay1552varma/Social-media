import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function BottomMenuBar() {
  const [value, setValue] = React.useState("recents");
  const { userProfileImage } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        display: "block",
        position: "fixed",
        bottom: 0,
        width: "100% ",
        textAlign: "center",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <Link to="/">
            <HomeIcon className="tob-bar-icons" />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Post"
        value="newPost"
        icon={
          <Link to="post">
            <AddAPhotoIcon className="tob-bar-icons" />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Friends"
        value="friends"
        icon={
          <Link to="friends">
            <TravelExploreIcon className="tob-bar-icons" />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={
          <Link to="chat">
            <ChatIcon className="tob-bar-icons" />
          </Link>
        }
      />
      <BottomNavigationAction
        label="user"
        value="user"
        icon={
          <Link to="/user">
            <Avatar
              src={userProfileImage ? userProfileImage : ""}
              sx={{
                height: 40,
              }}
            />
          </Link>
        }
      />
    </BottomNavigation>
  );
}

export default BottomMenuBar;
