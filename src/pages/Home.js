import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button } from "@mantine/core";
import Register from "./user/Register";
import Navigator from "components/Navigator";

const Home = () => {
  const { registeredUser, logout } = useAuth();
  console.log("registeredUser", registeredUser);

  if (registeredUser === "unset") return null;

  if (!registeredUser) return <Register />;

  return (
    <Layout>
      Home page <Button onClick={logout}>Logout</Button>
      <Navigator />
    </Layout>
  );
};

export default Home;
