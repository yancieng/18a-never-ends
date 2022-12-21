import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button } from "@mantine/core";

const Home = () => {
  const { logout } = useAuth();
  return (
    <Layout>
      Home page <Button onClick={logout}>Logout</Button>
    </Layout>
  );
};

export default Home;
