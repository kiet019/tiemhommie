import React, { useContext } from "react";
import { IconButton, Badge } from "@mui/material";
import { useRouter } from "next/router";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import StyledLink from "../navLink/Link";
import { setup } from "@/config/setup";
export default function CartIconButton({ url, ...props }: any) {
  return (
    <StyledLink href={url}>
      <IconButton
        {...props}
        size="large"
        sx={{
          color: "white",
          backgroundColor: setup.colorCode
        }}
      >
        <Badge color="error">
          <LocalGroceryStoreIcon />
        </Badge>
      </IconButton>
    </StyledLink>
  );
}
