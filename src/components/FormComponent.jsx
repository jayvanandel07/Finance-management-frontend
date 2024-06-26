import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackbarSlice";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { generateValidationSchema } from "../../utils/validationSchema";

const FormComponent = ({
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
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {formTitle}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(dataModel).map((item, index) => (
            <Grid key={index} item xs={12}>
              <TextField
                label={`${t(`${item}`)}${dataModel[item]?.required ? "*" : ""}`}
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
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          style={{ marginTop: 16 }}
        >
          <Grid item>
            <Button
              type="submit"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} />
              ) : update ? (
                t("update")
              ) : (
                t("submit")
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

FormComponent.propTypes = {
  dataModel: PropTypes.object.isRequired,
  formTitle: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
  updateData: PropTypes.object,
  additionalData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default FormComponent;
