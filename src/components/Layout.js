import { Box } from "@mantine/core";

const Layout = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        color: "#fff",
        background: theme.fn.linearGradient(
          45,
          theme.colors.dark[8],
          theme.colors.dark[7]
        ),
        maxWidth: "480px",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        boxSizing: "border-box",
      })}
    >
      {children}
    </Box>
  );
};

export default Layout;
