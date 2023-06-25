import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
import React from "react";

const LoadingIconButton = ({ children, loading, ...props }: any) => {
  return (
    <LoadingButton
      loading={loading}
      sx={{
        visibility: loading === true ? "visible" : "hidden",
      }}
    >
      <IconButton
        {...props}
        sx={{
          visibility: loading === true ? "hidden" : "visible",
        }}
      >
        {children}
      </IconButton>
    </LoadingButton>
  );
};

export default LoadingIconButton;
