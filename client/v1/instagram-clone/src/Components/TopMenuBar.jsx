import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const TopMenuBar = () => {
  const { userProfileImage, clearStates, clearStorage } =
    useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (title) => {
    setActive(title);
  };

  const menuItems = [
    {
      title: "home",
      icon: (
        <HomeIcon
          className={`tob-bar-icons `}
          sx={{
            fontSize: "40px",
          }}
        />
      ),
      route: "/",
    },
    {
      title: "friends",
      icon: (
        <TravelExploreIcon
          className="tob-bar-icons"
          sx={{ fontSize: "40px" }}
        />
      ),
      route: "/friends",
    },
    {
      title: "chat",
      icon: <ChatIcon className="tob-bar-icons" sx={{ fontSize: "40px" }} />,
      route: "/chat",
    },
  ];

  const logOut = () => {
    clearStorage();
    clearStates();
    handleCloseUserMenu();

    navigate("/auth/login");
  };
  const navigateProfile = () => {
    setActive("");
    handleCloseUserMenu();
    navigate("/user");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setActive("home");
  }, []);

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        // backgroundColor: "#0EBD60",
        backgroundColor: "#05386B",
      }}
    >
      <Box sx={{ width: "80%", margin: "auto" }}>
        <Toolbar disableGutters>
          <Typography
            style={{
              fontFamily: "'Dancing Script', 'cursive'",
              marginLeft: "10px",
            }}
            className="appLogo"
            noWrap
            variant="h4"
            component="a"
            href="/"
          >
            Friends Media
          </Typography>
          <Box
            sx={{
              width: "30%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.title}
                  to={item.route}
                  title={item.title}
                  onClick={() => handleSelect(item.title)}
                  style={{
                    color: item.title === active ? "#1cd9ff" : "white",
                    borderRadius: "10px",
                  }}
                >
                  {item.icon}
                </Link>
              );
            })}
            {/* <Link to="/post" title="New Post">
            <AddAPhotoIcon
              className="tob-bar-icons"
              sx={{ fontSize: "40px" }}
            />
          </Link> */}
          </Box>

          <Box marginRight={10}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={userProfileImage ? userProfileImage : ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile" onClick={navigateProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              {/* <MenuItem key="Theme" onClick={handleCloseUserMenu}>
                <Link to="/user" style={{ textDecoration: "none" }}>
                  <Typography textAlign="center">Theme</Typography>
                </Link>
              </MenuItem> */}
              <MenuItem key="LogOut" onClick={logOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default TopMenuBar;
