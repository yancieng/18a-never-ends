import NewTask from "pages/tasks/NewTask";
import { Box } from "@mantine/core";

const Today = () => {
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
      }}
    >
      <NewTask />
    </Box>
  );
};

export default Today;
