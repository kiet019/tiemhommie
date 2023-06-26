import { setup } from "@/config/setup";
import {
  CardMedia,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import Head from "next/head";
import LoginCard from "@/component/auth/LoginCard";
export default function Login() {

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <CardMedia
        component="img"
        alt="green iguana"
        image="/assets/images/banner.jpg"
        style={{
          height: "100vh",
          position: "absolute",
        }}
      />
      <Dialog open={true} maxWidth="xs" fullWidth sx={{
        "& .MuiPaper-root": {
          border: "3px solid #FEAFA2",
          borderRadius: "1rem"
        }
      }}>
        <DialogTitle
          sx={{
            display: {
              xs: "none", sm: "block", cursor: "pointer",
              letterSpacing: '.1rem',
            },
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
            fontFamily: 'Roboto Serif',
          }}
        >
          {setup.name}
        </DialogTitle>
        <DialogContent>
          <LoginCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
