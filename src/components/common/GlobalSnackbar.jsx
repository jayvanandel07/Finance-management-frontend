import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { selectSnackbar, hideSnackbar } from "../../redux/snackbarSlice";

const GlobalSnackbar = () => {
  const { open, message, severity } = useSelector(selectSnackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Adjust as needed
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity} // Change severity as per your needs
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
