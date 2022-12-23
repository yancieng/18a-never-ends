import { Flex, Text, Menu, Box } from "@mantine/core";
import UserIcon from "./UserIcon";
import { FiEdit } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "contexts/AuthContext";

const Header = ({ current, editProfile }) => {
  const { registeredUser, logout } = useAuth();
  return (
    <Flex sx={{ justifyContent: "space-between" }} p="20px">
      <Text sx={{ fontWeight: 700, fontFamily: "Exo, sans-serif" }} size="lg">
        {current}
      </Text>

      <Menu shadow="md" position="bottom-end">
        <Menu.Target>
          <Box>
            <UserIcon size="md" />
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{registeredUser.name}</Menu.Label>
          <Menu.Item icon={<FiEdit size={14} />} onClick={editProfile}>
            Edit Profile
          </Menu.Item>
          <Menu.Item icon={<BiLogOut size={14} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default Header;
