import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const ConfirmDialog = ({
  open,
  handleClose,
  handleConfirm,
  confirmTitle = "Confirm",
  confirmDescription = "Are you sure?",
  confirmType = "primary",
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      maxWidth="sm" // Set maxWidth to control the dialog's width
      fullWidth // Makes the dialog take the full width of the maxWidth value
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{confirmTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{confirmDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="primary">
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          color={confirmType}
          onClick={() => handleConfirm(true)}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
