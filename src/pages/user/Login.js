import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button, Box } from "@mantine/core";
import mainLogo from "assets/mainLogo.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login } = useAuth();
  return (
    <Layout>
      <Box mt="80px" sx={{ textAlign: "center" }}>
        <img src={mainLogo} alt="logo" />
        <Button
          leftIcon={<FcGoogle />}
          variant="white"
          color="indigo"
          mt="40px"
          onClick={login}
        >
          Login with Google
        </Button>
      </Box>
    </Layout>
  );
};

export default Login;
