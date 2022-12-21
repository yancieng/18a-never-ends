import { useState } from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import { Box, Text, Input, Button, Drawer } from "@mantine/core";
import UserIcon from "components/UserIcon";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { COLOR_SCHEME } from "components/UserIcon";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [colorScheme, setColorScheme] = useState();
  const [color, setColor] = useState(
    COLOR_SCHEME[Math.floor(Math.random() * COLOR_SCHEME.length)]
  );
  const { logout, updateUserProfile } = useAuth();

  const ColorBox = ({ size, color, code, onClick }) => (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        width: size || "60px",
        height: size || "60px",
        backgroundColor: theme.colors[color][code],
        borderRadius: "50%",
      })}
    ></Box>
  );

  const handlePickColorScheme = (color) => {
    setColorScheme(color);
    setStep(2);
  };

  const handleClose = () => {
    handleBack();
    setShow(false);
  };

  const handleBack = () => {
    setColorScheme();
    setStep(1);
  };

  const handlePickColor = (code) => {
    setColor(`${colorScheme}-${code}`);
    setShow(false);
    setStep(1);
  };

  const handleContinue = async () => {
    setLoading(true);
    await updateUserProfile({ name, color });
    setLoading(false);
  };

  return (
    <Layout>
      <Box sx={(theme) => ({ color: theme.colors.gray[6], float: "right" })}>
        <IoCloseSharp size="20px" onClick={logout} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          "& input": {
            textAlign: "center",
            fontSize: "36px",
          },
        }}
      >
        <UserIcon newUser={{ name, color }} size="lg" />
        <Text
          mt="md"
          sx={{ textDecoration: "underline" }}
          onClick={() => setShow(true)}
        >
          change color
        </Text>

        <Input
          mt="50px"
          variant="unstyled"
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="xl"
        />

        <Button
          mt="xl"
          size="lg"
          disabled={!name}
          rightIcon={<BiRightArrow />}
          variant="gradient"
          gradient={{ from: "blue", to: "pink" }}
          onClick={handleContinue}
          loading={loading}
        >
          Let's go!
        </Button>
      </Box>

      <Drawer
        opened={show}
        position="bottom"
        onClose={handleClose}
        withCloseButton={false}
        size="350px"
      >
        {step === 1 && (
          <Box p="md">
            <Text mb="md">Pick your Color Scheme:</Text>
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridRowGap: "10px",
                gridColumnGap: "10px",
              }}
            >
              {COLOR_SCHEME.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  code={6}
                  onClick={() => handlePickColorScheme(color)}
                />
              ))}
            </Box>
          </Box>
        )}
        {step === 2 && (
          <Box p="md">
            <AiOutlineArrowLeft size="18px" onClick={handleBack} />
            <Box sx={{ width: "fit-content", margin: "0 auto" }}>
              <ColorBox
                size="100px"
                color={colorScheme}
                code={6}
                onClick={handleBack}
              />
            </Box>
            <Text mt="md" mb="md">
              Pick your Color:
            </Text>
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridRowGap: "10px",
                gridColumnGap: "10px",
              }}
            >
              {[...Array(10)].map((_, code) => (
                <ColorBox
                  key={code}
                  color={colorScheme}
                  code={code}
                  onClick={() => handlePickColor(code)}
                />
              ))}
            </Box>
          </Box>
        )}
      </Drawer>
    </Layout>
  );
};

export default Register;
