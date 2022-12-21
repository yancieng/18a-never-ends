import { Box } from "@mantine/core";

const Layout = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        color: "#fff",
        backgroundColor: theme.colors.gray[9],
        maxWidth: "480px",
        width: "100%",
        padding: "20px",
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
