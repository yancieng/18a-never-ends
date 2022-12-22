import * as React from "react";
import { useAuth } from "contexts/AuthContext";
import { Box } from "@mantine/core";

const UserIcon = ({
  newUser,
  size,
  sx,
}: {
  newUser?: { color: string; name: string };
  size: "sm" | "md" | "lg";
  sx?: Record<string, any>;
}) => {
  const { registeredUser } = useAuth();

  const Width = {
    sm: "30px",
    md: "25px",
    lg: "160px",
  };
  const FontSize = {
    sm: "16px",
    md: "14px",
    lg: "80px",
  };
  const BorderSize = {
    sm: "1px",
    md: "2px",
    lg: "3px",
  };

  const { name, color } = newUser || registeredUser;

  const getInitial = () => name?.substring(0, 1)?.toUpperCase();
  const getColorCode = () => color?.split("-");

  const getColor = (theme: any) => {
    if (getColorCode()[1])
      return theme.colors[getColorCode()[0]][getColorCode()[1]];
    return theme.colors[getColorCode()[0]];
  };

  return (
    <Box
      sx={(theme) => ({
        width: Width[size],
        height: Width[size],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 500,
        fontSize: FontSize[size],
        backgroundColor: getColor(theme),
        borderRadius: "50%",
        border: `${BorderSize[size]} solid`,
        borderColor: theme.colors.cyan[6],
        ...sx,
      })}
    >
      {getInitial()}
    </Box>
  );
};

export default UserIcon;
