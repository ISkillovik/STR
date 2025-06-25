import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import liceIcon from "../icon/live-stream.png";
import icoStr from "../icon/strlogo.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const IcoLive = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
`;
const IcoStr = styled.img`
  width: 200px;
  padding-top: 20px;
`;
const NavDiv = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background: "#000000";
  color: "#ffffff";
  position: static;
`;

const NavElemStyle = styled.nav`
  display: flex;
  gap: 20px;
  margin-left: auto;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    margin-top: 50px;
    margin-left: 0;
  }
`;

const NavLinkStyle = styled(NavLink)`
  margin-right: 25px;
  display: flex;
  gap: 8px;
  padding: 6px 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  height: 50px;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`;

const NavMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [liveEv, setLiveEv] = useState<boolean | undefined>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  console.log(isMobile);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setLiveEv(docSnapshot.data().event);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe(); // очистка подписки
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            background: "#000000",
          }}
        >
          {isMobile ? (
            <>
              <AppBar
                sx={{
                  height: 50,
                  background: "#000000",
                  color: "#ffffff",
                }}
                position="static"
              >
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      zIndex: "10",
                      boxShadow: "10px 5px 5px black",
                      position: "relative",
                      width: 200,
                      height: 80,
                      backgroundColor: " #171717",
                      transform: "skewX(-30deg)",
                      transformOrigin: "100% -100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      onClick={() => {
                        navigate("/");
                      }}
                      sx={{
                        transform: "skewX(30deg)",
                      }}
                      variant="h6"
                      component="div"
                    >
                      <IcoStr
                        style={{ paddingTop: 10, width: 120 }}
                        src={icoStr}
                        alt="My Icon"
                      />
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer(true)}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
            </>
          ) : (
            <>
              <NavDiv>
                <Box
                  sx={{
                    zIndex: "10",
                    position: "relative",
                    boxShadow: "10px 5px 5px black",
                    width: 300,
                    height: 100,
                    backgroundColor: "#171717",
                    transform: "skewX(-30deg)",
                    transformOrigin: "100% -100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    onClick={() => {
                      navigate("/");
                    }}
                    sx={{
                      transform: "skewX(30deg)",
                    }}
                    variant="h6"
                    component="div"
                  >
                    <IcoStr src={icoStr} alt="My Icon" />
                  </Typography>
                </Box>
                <NavElemStyle>
                  {liveEv ? (
                    <NavLinkStyle to="/liveevents">
                      <IcoLive src={liceIcon} alt="My Icon" /> LIVE
                    </NavLinkStyle>
                  ) : (
                    ""
                  )}

                  <NavLinkStyle to="/about"> ABOUT</NavLinkStyle>
                  <NavLinkStyle to="/racers">RACERS</NavLinkStyle>
                </NavElemStyle>
              </NavDiv>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "#3a3a3a",
            color: "#fff",
            width: 260,
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <IcoStr
          style={{
            filter: "brightness(0) invert(0)",
            margin: 10,
            paddingTop: 10,
            width: 120,
          }}
          src={icoStr}
          alt="My Icon"
        />

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            borderTop: "2px solid black",
            margin: "10px auto",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <NavElemStyle>
            {liveEv ? (
              <NavLinkStyle to="/liveevents">
                <IcoLive src={liceIcon} alt="My Icon" /> LIVE
              </NavLinkStyle>
            ) : (
              ""
            )}

            <NavLinkStyle to="/about"> ABOUT</NavLinkStyle>
            <NavLinkStyle to="/racers">RACERS</NavLinkStyle>
          </NavElemStyle>
        </Box>
      </Drawer>
    </>
  );
};

export default NavMenu;
