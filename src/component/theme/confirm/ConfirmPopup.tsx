import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function ConfirmPopup() {
  return (
    <Dialog
      open={false}
      maxWidth="xs"
      onClose={() => {
      }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="secondary"
          onClick={() => {
          }}
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => {
          }}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
