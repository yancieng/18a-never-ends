import { useState } from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import Register from "./user/Register";
import Navigator, { MENU } from "components/Navigator";
import Header from "components/Header";
import Today from "pages/today";
import Tasks from "./tasks";

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
      <Header current={current} editProfile={() => setEditPage(true)} />
      {VIEW_MAP[current]}
      <Navigator current={current} setCurrent={setCurrent} />
    </Layout>
  );
};

export default Home;
