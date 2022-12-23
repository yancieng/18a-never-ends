import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./contexts/AuthContext";
import { UsersProvider } from "contexts/UsersContext";
import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: "dark",
        components: {
          Input: {
            styles: (theme) => ({
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.pink[6],
                },
              },
            }),
          },
        },
      }}
    >
      <NotificationsProvider position="top-right">
        <UsersProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UsersProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
