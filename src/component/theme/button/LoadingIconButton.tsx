import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"), {
  ssr: false,
});

const LoadingIconButton = ({ children, loading, ...props }: any) => {
  return (
    <LoadingButton
      loading={loading}
      sx={{
        visibility: loading === true ? "visible" : "hidden",
        padding: "0rem",
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
