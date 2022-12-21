import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button } from "@mantine/core";

const Register = () => {
  const { logout } = useAuth();
  return (
    <Layout>
      Register page <Button onClick={logout}>logout</Button>
    </Layout>
  );
};

export default Register;
