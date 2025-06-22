import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LiveEventScore from "./LiveEventScore";
import LiveEventRules from "./LiveEventRules";
import LiveEventLiveYouTube from "./LiveEventLiveYouTube";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Box
        sx={{
          margin: "20px",
          borderBottom: 1,

          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "red", // меняем цвет индикатора через sx
            },
          }}
        >
          <Tab
            label="Live"
            {...a11yProps(0)}
            sx={{
              color: "white", // цвет по умолчанию
              "&.Mui-selected": {
                color: "red", // цвет активной вкладки
                fontWeight: "bold",
              },
            }}
          />
          <Tab
            label="Score Board"
            {...a11yProps(1)}
            sx={{
              color: "white", // цвет по умолчанию
              "&.Mui-selected": {
                color: "red", // цвет активной вкладки
                fontWeight: "bold",
              },
            }}
          />
          <Tab
            label="Rules"
            {...a11yProps(2)}
            sx={{
              color: "white", // цвет по умолчанию
              "&.Mui-selected": {
                color: "red", // цвет активной вкладки
                fontWeight: "bold",
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LiveEventLiveYouTube />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LiveEventScore />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <LiveEventRules />
      </CustomTabPanel>
    </Box>
  );
}
