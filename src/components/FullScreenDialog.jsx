import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function FullScreenDialog({ openState = false, setOpenState, children }) {
  const { t } = useTranslation();
  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={openState}
      onClose={() => {
        setOpenState(false);
      }}
    >
      <DialogContent>{children}</DialogContent>

      <DialogActions sx={{ borderTop: "1px solid #ddd" }}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpenState(false);
            }}
          >
            {t("close")}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default FullScreenDialog;
