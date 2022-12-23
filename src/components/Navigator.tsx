import * as React from "react";
import { Flex } from "@mantine/core";
import { BsListCheck, BsCalendar3 } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { CgList } from "react-icons/cg";

export enum MENU {
  today = "Today",
  task = "Tasks",
  calendar = "Calendar",
  report = "Report",
}

const MENU_LIST = [
  {
    name: MENU.today,
    icon: <BsListCheck />,
  },
  {
    name: MENU.task,
    icon: <CgList />,
  },
  {
    name: MENU.calendar,
    icon: <BsCalendar3 />,
  },
  {
    name: MENU.report,
    icon: <HiSpeakerphone />,
  },
];

const MenuItem = ({
  current,
  handleCurrent,
  children,
}: {
  current: boolean;
  handleCurrent: () => void;
  children: any;
}) => (
  <Flex
    onClick={handleCurrent}
    direction="column"
    align="center"
    sx={(theme: any) => ({
      margin: "0 20px",
      fontSize: "12px",
      lineHeight: "30px",
      paddingTop: "5px",
      "& svg": {
        fontSize: "20px",
      },
      color: current ? theme.colors.pink[6] : theme.colors.gray[5],
    })}
  >
    {children}
  </Flex>
);

const Navigator = ({
  current,
  setCurrent,
}: {
  current: MENU;
  setCurrent: any;
}) => (
  <Flex
    justify="space-between"
    align="center"
    sx={(theme: any) => ({
      backgroundColor: theme.colors.dark[7],
      height: "70px",
      width: "100%",
    })}
  >
    {MENU_LIST.map((item) => (
      <MenuItem
        current={item.name === current}
        key={item.name}
        handleCurrent={() => setCurrent(item.name)}
      >
        {item.icon}
        {item.name}
      </MenuItem>
    ))}
  </Flex>
);

export default Navigator;
