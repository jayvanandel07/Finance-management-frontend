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

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      maxWidth="sm" // Set maxWidth to control the dialog's width
      fullWidth // Makes the dialog take the full width of the maxWidth value
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{t("confirm_delete")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("confirm_delete_message")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("cancel")}
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
