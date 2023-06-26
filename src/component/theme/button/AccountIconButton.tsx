import { setup } from "@/config/setup";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import StyledLink from "../navLink/Link";

const AccountIconButton = ({ ...props }: any) => {
  return (
    <StyledLink href="/login">
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
    </StyledLink>
  );
};

export default AccountIconButton;
