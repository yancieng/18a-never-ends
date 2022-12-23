import { useState } from "react";
import {
  ActionIcon,
  Box,
  Drawer,
  Text,
  useMantineTheme,
  Button,
  TextInput,
  Flex,
  Radio,
  NumberInput,
  SegmentedControl,
  Chip,
} from "@mantine/core";
import { BsPlusLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "@mantine/form";
import * as dayjs from "dayjs";
import { DatePicker } from "@mantine/dates";
import { useUsers } from "contexts/UsersContext";
import { useAuth } from "contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { showNotification } from "@mantine/notifications";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const NewTask = () => {
  const theme = useMantineTheme();
  const { userList } = useUsers();
  const { registeredUser } = useAuth();
  const [view, setView] = useState(false);

  const getConvertUserList = () =>
    userList.reduce((prev, cur) => {
      registeredUser.email !== cur.email && prev.push(cur);
      return [...prev];
    }, []);

  const convertUserList = getConvertUserList();
  const getSharingValue = () => convertUserList.map((user) => user.email);

  const form = useForm({
    initialValues: {
      name: "",
      type: "recurring",
      counts: 1,
      unit: "day",
      tracking: WEEK,
      endDate: dayjs(new Date()).toDate(),
      trackingDate: "",
      shared: "shared",
      sharing: getSharingValue(),
    },

    validate: {
      name: (value) => (Boolean(value) ? null : "Enter something!"),
    },
  });

  const handleSubmit = async (value) => {
    try {
      await addDoc(collection(db, "Tasks"), value);
      setView(false);
      form.reset();
      showNotification({
        title: "Task Added",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Something went wrong",
        message: error.toString(),
        color: "red",
      });
    }
  };

  return (
    <>
      <Box sx={{ position: "absolute", bottom: "5%", right: "8%" }}>
        <ActionIcon
          color="cyan"
          size="53px"
          radius="lg"
          variant="filled"
          onClick={() => setView(true)}
        >
          <BsPlusLg size={20} />
        </ActionIcon>
      </Box>

      <Drawer
        position="bottom"
        size="full"
        withCloseButton={false}
        opened={view}
      >
        <Flex justify="space-between" align="center" m="20px">
          <Text
            size="lg"
            fw="bold"
            color={theme.colors.pink[6]}
            sx={{ fontFamily: "Exo, sans-serif" }}
          >
            Create a New Task
          </Text>
          <Box sx={{ color: theme.colors.gray[6] }}>
            <IoCloseSharp size="2em" onClick={() => setView(false)} />
          </Box>
        </Flex>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box
            p="0 20px"
            sx={{
              height: "calc(100vh - 100px)",
              overflowY: "scroll",
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <TextInput
                label="Title"
                placeholder="Name of your task"
                {...form.getInputProps("name")}
                color="pink"
                size="md"
                mb="xl"
              />
              <Radio.Group
                name="type"
                label="Type"
                size="md"
                mb="xl"
                {...form.getInputProps("type")}
              >
                <Radio value="recurring" label="Recurring Tasks" color="pink" />
                <Radio value="single" label="Single Task" color="pink" />
              </Radio.Group>
              {form.values.type === "recurring" && (
                <>
                  <Box mb="xl">
                    <Text fw="bold">Frequency</Text>
                    <Text size="sm" c={theme.colors.gray[6]} mb="xs">
                      How often should the task be completed?
                    </Text>
                    <Flex align="center">
                      <NumberInput
                        sx={{
                          input: {
                            width: 60,
                            textAlign: "center",
                            fontSize: "14px",
                          },
                        }}
                        hideControls
                        mr="sm"
                        max={99}
                        min={1}
                        size="xs"
                        {...form.getInputProps("counts")}
                      />
                      <Text mr="xs">Times</Text>
                      <Text mr="xs">/</Text>
                      <SegmentedControl
                        color="pink"
                        name="unit"
                        data={[
                          { label: "Day", value: "day" },
                          { label: "Week", value: "week" },
                          { label: "Month", value: "month" },
                        ]}
                        {...form.getInputProps("unit")}
                      />
                    </Flex>
                  </Box>

                  <Box mb="xl">
                    <Text fw="bold">Tracking</Text>
                    <Text size="sm" c={theme.colors.gray[6]}>
                      On which day should the task be tracked?
                    </Text>
                    {form.values.unit === "day" ? (
                      <Chip color="pink" mt={15} checked={true}>
                        Everyday
                      </Chip>
                    ) : (
                      <Chip.Group
                        name="tracking"
                        position="center"
                        multiple
                        mt={15}
                        {...form.getInputProps("tracking")}
                      >
                        {WEEK.map((item) => (
                          <Chip key={item} value={item} color="pink">
                            {item}
                          </Chip>
                        ))}
                      </Chip.Group>
                    )}
                  </Box>
                </>
              )}
              {form.values.type === "single" && (
                <>
                  <Box>
                    <DatePicker
                      mb="xl"
                      size="md"
                      label="Complete by"
                      minDate={dayjs(new Date()).toDate()}
                      {...form.getInputProps("endDate")}
                    />
                  </Box>
                  <Box>
                    <Text fw="bold">Tracking</Text>
                    <Text size="sm" c={theme.colors.gray[6]}>
                      On which day should the task be tracked?
                    </Text>
                    <Radio.Group
                      name="trackingDate"
                      size="md"
                      mb="xl"
                      {...form.getInputProps("trackingDate")}
                    >
                      <Radio value="" label="Everyday" color="pink" />
                      <Radio
                        value={form.values.endDate.toString()}
                        label="On Completion Day"
                        color="pink"
                      />
                    </Radio.Group>
                  </Box>
                </>
              )}
              <Box>
                <Radio.Group
                  name="shared"
                  label="Sharing"
                  size="md"
                  {...form.getInputProps("shared")}
                >
                  <Radio value="shared" label="Shared" color="pink" />
                  <Radio value="private" label="Private" color="pink" />
                </Radio.Group>
                {form.values.shared === "shared" && (
                  <Chip.Group
                    name="sharing"
                    multiple
                    {...form.getInputProps("sharing")}
                  >
                    {convertUserList.map((user) => (
                      <Chip key={user.email} value={user.email} color="pink">
                        {user.name}
                      </Chip>
                    ))}
                  </Chip.Group>
                )}
              </Box>
            </Box>

            <Button type="submit" mt="xl" fullWidth color="cyan">
              Save Task
            </Button>
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default NewTask;
