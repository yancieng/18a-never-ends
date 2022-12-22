import { Box } from "@mantine/core";
import { BsListCheck, BsCalendar3 } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";

const MenuItem = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "0 20px",
      fontSize: "12px",
      lineHeight: "30px",
      paddingTop: "5px",
      "& svg": {
        fontSize: "20px",
      },
    }}
  >
    {children}
  </Box>
);

const Navigator = () => (
  <Box
    sx={(theme) => ({
      position: "absolute",
      bottom: "0",
      backgroundColor: theme.colors.pink[7],
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      right: "0",
    })}
  >
    <MenuItem>
      <BsListCheck />
      Today
    </MenuItem>
    <MenuItem>
      <BsCalendar3 />
      Calendar
    </MenuItem>
    <MenuItem>
      <HiSpeakerphone />
      Report
    </MenuItem>
    <MenuItem>
      <FiSettings />
      Setting
    </MenuItem>
  </Box>
);

export default Navigator;
