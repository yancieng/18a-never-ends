import { useState } from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/AuthContext";
import {
  Box,
  Text,
  Input,
  Button,
  Drawer,
  ColorSwatch,
  useMantineTheme,
} from "@mantine/core";
import UserIcon from "components/UserIcon";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const Register = ({ closeEdit }) => {
  const { logout, updateUserProfile, registeredUser } = useAuth();
  const theme = useMantineTheme();
  const ColorSchemes = Object.keys(theme.colors);
  const newUser = !Boolean(closeEdit);

  const [show, setShow] = useState(false);
  const [name, setName] = useState(registeredUser?.name || "");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [colorScheme, setColorScheme] = useState();
  const [color, setColor] = useState(
    registeredUser?.color ||
      ColorSchemes[Math.floor(Math.random() * ColorSchemes.length)]
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
    !newUser && closeEdit();
  };

  return (
    <Layout>
      <Box sx={{ color: theme.colors.gray[6], float: "right" }}>
        <IoCloseSharp size="2em" onClick={newUser ? logout : closeEdit} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "11vh",
          "& input": {
            textAlign: "center",
            fontSize: "2.5em",
            fontFamily: "Rubik, sans-serif",
            color: theme.colors.pink[6],
          },
        }}
      >
        <UserIcon newUser={{ name, color }} size="lg" />
        <Button
          variant="subtle"
          color="dark"
          mt="md"
          sx={{ textDecoration: "underline" }}
          onClick={() => setShow(true)}
        >
          change color
        </Button>

        <Input
          mt="8vh"
          variant="unstyled"
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="xl"
        />

        <Button
          mt="21vh"
          size="md"
          disabled={!name}
          rightIcon={<BiRightArrow />}
          color="cyan"
          onClick={handleContinue}
          loading={loading}
        >
          {newUser ? "Let's go!" : "Save"}
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
              {ColorSchemes.map((color) => (
                <ColorSwatch
                  key={color}
                  color={theme.colors[color][6]}
                  onClick={() => handlePickColorScheme(color)}
                  size="60px"
                />
              ))}
            </Box>
          </Box>
        )}
        {step === 2 && (
          <Box p="md">
            <AiOutlineArrowLeft size="18px" onClick={handleBack} />
            <Box sx={{ width: "fit-content", margin: "0 auto" }}>
              <ColorSwatch
                color={theme.colors[colorScheme][6]}
                onClick={handleBack}
                size="100px"
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
                <ColorSwatch
                  key={code}
                  color={theme.colors[colorScheme][code]}
                  onClick={() => handlePickColor(code)}
                  size="60px"
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
