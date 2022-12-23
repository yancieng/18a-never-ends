import NewTask from "pages/tasks/NewTask";
import { Box } from "@mantine/core";

const Tasks = () => {
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

export default Tasks;
