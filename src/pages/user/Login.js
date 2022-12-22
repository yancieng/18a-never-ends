import { useState } from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Button, Box, Text } from "@mantine/core";
import mainLogo from "assets/mainLogo.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login();
    setLoading(false);
  };
  return (
    <Layout>
      <Box mt="12vh" sx={{ textAlign: "center" }}>
        <img src={mainLogo} alt="logo" />

        <Button
          leftIcon={<FcGoogle />}
          color="cyan"
          onClick={handleLogin}
          loading={loading}
          mt="19vh"
        >
          Login with Google
        </Button>
        <Text
          m="20px auto"
          p="10px"
          size="sm"
          sx={(theme) => ({
            width: "fit-content",
            borderTop: "3px dotted",
            borderColor: theme.colors.dark[6],
            color: theme.colors.dark[3],
            fontFamily: "Exo, sans-serif",
          })}
        >
          That's the only way to login. <br /> Take it or leave it.
        </Text>
      </Box>
    </Layout>
  );
};

export default Login;
