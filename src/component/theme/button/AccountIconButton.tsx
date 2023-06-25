import { setup } from "@/config/setup";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const AccountIconButton = ({ ...props }: any) => {
  return (
    <IconButton
      {...props}
      size="large"
      sx={{
        margin: "0 1rem",
        color: "white",
        backgroundColor: setup.colorCode,
      }}
    >
      <PersonIcon />
    </IconButton>
  );
};

export default AccountIconButton;
