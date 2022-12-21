import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button } from "@mantine/core";

const Login = () => {
  const { login } = useAuth();
  return (
    <Layout>
      Login page <Button onClick={login}>Login</Button>
    </Layout>
  );
};

export default Login;
