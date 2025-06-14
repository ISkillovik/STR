import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import liceIcon from "../icon/live-stream.png";
import icoStr from "../icon/strlogo.png";
import styled from "styled-components";
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
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
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

const NavMenu = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [liveEv, setLiveEv] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
    if (docSnapshot.exists()) {
      setLiveEv(docSnapshot.data().event);
    } else {
      console.log("Document does not exist");
    }
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
              <AppBar
                sx={{
                  height: 80,
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
                        setValue(0);
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

                  <Tabs
                    sx={{
                      [`& .${tabsClasses.indicator}`]: {
                        height: "100%",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, .2)",
                      },
                    }}
                    value={value}
                    onChange={handleChange}
                    centered
                  >
                    {liveEv ? (
                      <Tab
                        sx={{
                          [`&.${tabClasses.selected}`]: {
                            color: "#fff",
                          },
                          "&:hover": {
                            borderRadius: "8px",
                            backgroundColor: "rgba(255, 255, 255, .2)",
                          },
                          color: "#ffffff",
                        }}
                        icon={<IcoLive src={liceIcon} alt="My Icon" />}
                        iconPosition="start"
                        component={Link}
                        to="/liveevents"
                        label="Event"
                      />
                    ) : (
                      <></>
                    )}
                    <Tab
                      sx={{
                        letterSpacing: 0.5,
                        margin: theme.spacing(0, 2),
                        [`&.${tabClasses.selected}`]: {
                          color: "#fff",
                        },
                        "&:hover": {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, .2)",
                        },
                        color: "#ffffff",
                      }}
                      component={Link}
                      to="/about"
                      label="About"
                    />
                    <Tab
                      sx={{
                        letterSpacing: 0.5,
                        margin: theme.spacing(0, 2),
                        [`&.${tabClasses.selected}`]: {
                          color: "#fff",
                        },
                        "&:hover": {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, .2)",
                        },
                        color: "#ffffff",
                      }}
                      component={Link}
                      to="/about"
                      label="Rules"
                    />
                    <Tab
                      sx={{
                        letterSpacing: 0.5,
                        margin: theme.spacing(0, 2),
                        [`&.${tabClasses.selected}`]: {
                          color: "#fff",
                        },
                        "&:hover": {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, .2)",
                        },
                        color: "#ffffff",
                      }}
                      component={Link}
                      to="/about"
                      label="Records"
                    />
                    <Tab
                      sx={{
                        marginRig: 3,
                        [`&.${tabClasses.selected}`]: {
                          color: "#fff",
                        },
                        "&:hover": {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, .2)",
                        },
                        color: "#ffffff",
                      }}
                      component={Link}
                      to="/racers"
                      label="Racers"
                    />
                  </Tabs>
                </Toolbar>
              </AppBar>
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
          sx={{ display: "flex", width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Tabs
            orientation="vertical"
            sx={{
              [`& .${tabsClasses.indicator}`]: {
                height: "100%",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, .2)",
              },
            }}
            value={value}
            onChange={handleChange}
            centered
          >
            {liveEv ? (
              <Tab
                sx={{
                  textTransform: "initial",
                  margin: theme.spacing(0, 2),
                  minWidth: 0,
                  fontWeight: "normal",
                  letterSpacing: 0.5,
                  [`&.${tabClasses.selected}`]: {
                    color: "#fff",
                  },
                  [theme.breakpoints.up("md")]: {
                    minWidth: 0,
                  },
                  borderRadius: "8px",
                  color: "#ffffff",
                  display: "flex",
                }}
                icon={<IcoLive src={liceIcon} alt="My Icon" />}
                iconPosition="start"
                component={Link}
                to="/liveevents"
                label="Event"
              />
            ) : (
              <></>
            )}

            <Tab
              sx={{
                letterSpacing: 0.5,
                margin: theme.spacing(0, 2),
                [`&.${tabClasses.selected}`]: {
                  color: "#fff",
                },
                "&:hover": {
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, .2)",
                },
                color: "#ffffff",
              }}
              component={Link}
              to="/about"
              label="Rules"
            />
            <Tab
              sx={{
                letterSpacing: 0.5,
                margin: theme.spacing(0, 2),
                [`&.${tabClasses.selected}`]: {
                  color: "#fff",
                },
                "&:hover": {
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, .2)",
                },
                color: "#ffffff",
              }}
              component={Link}
              to="/about"
              label="Records"
            />
            <Tab
              sx={{
                color: "#ffffff",
              }}
              component={Link}
              to="/about"
              label="About"
            />
            <Tab
              sx={{
                color: "#ffffff",
              }}
              component={Link}
              to="/racers"
              label="Racers"
            />
          </Tabs>
        </Box>
      </Drawer>
    </>
  );
};

export default NavMenu;
