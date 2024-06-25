import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackbarSlice";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { generateValidationSchema } from "../../utils/validationSchema";

const FormDialogue = ({
  formState,
  setFormState,
  dataModel,
  formTitle,
  update = false,
  updateData = null,
  additionalData = {},
  onSubmit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Create validation schema based on the dataModel
  const validationSchema = generateValidationSchema(dataModel, t);
  const formik = useFormik({
    initialValues: Object.keys(dataModel).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmit(
          {
            ...values,
            ...additionalData,
          },
          update
        );

        dispatch(
          showSnackbar({
            message: update
              ? t("Updated successfully!")
              : t("Added successfully!"),
            severity: "success",
          })
        );

        if (!update) {
          resetForm();
        }

        setFormState(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(
          showSnackbar({
            message: t("Something went wrong!"),
            severity: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (update && updateData) {
      formik.setValues(updateData);
    }
  }, [update, updateData]);

  return (
    <Dialog open={formState} onClose={() => setFormState(false)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            {Object.keys(dataModel).map((item, index) => (
              <Grid key={index} item xs={12}>
                <TextField
                  label={`${t(`${item}`)}${
                    dataModel[item]?.required ? "*" : ""
                  }`}
                  variant="outlined"
                  fullWidth
                  name={item}
                  value={formik.values[item] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[item] && Boolean(formik.errors[item])}
                  helperText={formik.touched[item] && formik.errors[item]}
                  disabled={formik.isSubmitting}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFormState(false)}
            color="secondary"
            disabled={formik.isSubmitting}
          >
            {t("cancel")}
          </Button>
          <Button type="submit" color="primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? (
              <CircularProgress size={24} />
            ) : update ? (
              t("update")
            ) : (
              t("add")
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

FormDialogue.propTypes = {
  formState: PropTypes.bool.isRequired,
  setFormState: PropTypes.func.isRequired,
  dataModel: PropTypes.object.isRequired,
  formTitle: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
  updateData: PropTypes.object,
  apiURL: PropTypes.string.isRequired,
  additionalData: PropTypes.object,
};

export default FormDialogue;
