import RacerRegForm from "./RacerRegForm";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import RacerListPoints from "./RacerListPoints";
import { TabPanelProps } from "../models";
import { DataRacers } from "../models";
type Props = {};

const InputAdm = styled.input`
  font-size: 20px;
  margin: 10px;
  width: 350px;
  height: 40px;
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const EventStartName = (props: Props) => {
  const [eventTitle, setEventTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState<any>();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [dataType, setDataType] = useState<string>();

  const checkCheckbox = (text: string): boolean => {
    if (dataType && dataType === text) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        return setDataType(docSnapshot.data().rules);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setData(docSnapshot.data());
        setChecked(docSnapshot.data().event);
        console.log(data);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    const userRef = doc(db, "Admin", "event");
    try {
      await setDoc(userRef, { event: !checked }, { merge: true });
      console.log("Имя обновлено");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleUpdateTitle = async () => {
    const userRef = doc(db, "Admin", "event");
    try {
      await setDoc(userRef, { title: eventTitle }, { merge: true });
      console.log("Имя обновлено");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleUpdateRules = async (e: any) => {
    const userRef = doc(db, "Admin", "event");
    try {
      await setDoc(userRef, { rules: e }, { merge: true });
      console.log("Имя обновлено");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  return (
    <div>
      <Box>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChanges}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              width: "100%",
              background: "linear-gradient(60deg, #ad0000, #b35000)",
              padding: "10px",
              boxShadow: "0px 3px 15px rgba(34, 35, 58, 0.5)",
              [`& .${tabsClasses.indicator}`]: {
                height: "100%",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.418)",
                color: "red",
              },
            }}
          >
            <Tab label="Even Starter" {...a11yProps(0)} />
            <Tab label="Driver Reg" {...a11yProps(1)} />
            <Tab label="Racer Points" {...a11yProps(2)} />
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Пользователь вышел");
                  })
                  .catch((error) => {
                    console.error("Ошибка при выходе:", error);
                  });
              }}
            >
              LOGOUT
            </button>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Switch
            checked={checked}
            onChange={handleChange}
            onClick={() => {
              handleUpdate();
            }}
          />
          <InputAdm
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="event title"
          />
          <button
            onClick={() => {
              handleUpdateTitle();
              console.log(data);
            }}
          >
            Set Title
          </button>
          <FormControl>
            <FormLabel>Set Event</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={(e) => {
                handleUpdateRules(e.target.value);
              }}
            >
              <FormControlLabel
                checked={checkCheckbox("drift")}
                value="drift"
                control={<Radio />}
                label="Drift"
              />
              <FormControlLabel
                checked={checkCheckbox("drag")}
                value="drag"
                control={<Radio />}
                label="Drag"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RacerRegForm />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <RacerListPoints />
        </TabPanel>
      </Box>
    </div>
  );
};

export default EventStartName;
