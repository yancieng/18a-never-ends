import { useState } from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import Register from "./user/Register";
import Navigator, { MENU } from "components/Navigator";
import Header from "components/Header";
import Today from "pages/today";
import Tasks from "./tasks";
import { Flex, Box } from "@mantine/core";

const VIEW_MAP = {
  [MENU.today]: <Today />,
  [MENU.task]: <Tasks />,
};

const Home = () => {
  const [current, setCurrent] = useState(MENU.today);
  const [editPage, setEditPage] = useState(false);
  const { registeredUser } = useAuth();

  if (registeredUser === "unset") return null;

  if (!registeredUser || editPage)
    return <Register closeEdit={() => setEditPage(false)} />;

  return (
    <Layout>
      <Flex direction="column" sx={{ height: "100%" }}>
        <Header current={current} editProfile={() => setEditPage(true)} />
        <Box sx={{ flexGrow: 1 }}>{VIEW_MAP[current]}</Box>
        <Navigator current={current} setCurrent={setCurrent} />
      </Flex>
    </Layout>
  );
};

export default Home;
