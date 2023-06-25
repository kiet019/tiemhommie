import { setup } from "@/config/setup";
import { Typography } from "@mui/material";
import router from "next/router";
import React from "react";
import StyledLink from "../navLink/Link";

const LogoTitle = () => {
  return (
    <StyledLink
      href="/"
      style={{
        marginRight: "2rem",
        color: setup.colorCode,
        textDecoration: "none",
      }}
    >
      <Typography
        component="div"
        sx={{
          display: {
            xs: "none",
            sm: "block",
            letterSpacing: ".1rem",
          },
          fontSize: "2rem",
          fontWeight: "700",
          fontFamily: "Roboto Serif",
        }}
      >
        {setup.name}
      </Typography>
      <Typography
        component="div"
        sx={{
          display: {
            xs: "none",
            sm: "block",
            letterSpacing: ".1rem",
            fontFamily: "Charm",
            fontWeight: "600",
            textAlign: "center"
          },
        }}
      >
        Decoration and Gift
      </Typography>
    </StyledLink>
  );
};

export default LogoTitle;
