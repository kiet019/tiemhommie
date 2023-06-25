import dynamic from "next/dynamic";
import React from "react";
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"), {
  ssr: false,
});

const StyledLoadingButton = ({ children, ...props }: any) => {
  return <LoadingButton {...props}>{children}</LoadingButton>;
};

export default StyledLoadingButton;
