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
import { showSnackbar } from "../redux/snackbarSlice";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { generateValidationSchema } from "../utils/validationSchema";

const FormComponent = ({
  dataModel,
  formTitle,
  update = false,
  updateData = null,
  additionalData = {},
  onSubmit,
  singleAction = false,
  setFormState = {},
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Create validation schema based on the dataModel
  const validationSchema = generateValidationSchema(dataModel, t);
  const formik = useFormik({
    initialValues: Object.keys(dataModel).reduce((acc, key) => {
      acc[dataModel[key].name] = "";
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
        if (setFormState) {
          setFormState(false);
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
          {dataModel.map((item, index) => (
            <Grid key={index} item xs={12}>
              <TextField
                label={`${t(`${item.name}`)}${item?.required ? "*" : ""}`}
                variant="outlined"
                fullWidth
                name={item.name}
                value={formik.values[item.name] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[item.name] && Boolean(formik.errors[item.name])
                }
                helperText={
                  formik.touched[item.name] && formik.errors[item.name]
                }
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
          {!singleAction && (
            <Grid item width={singleAction ? "100%" : "fit-content"}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                disabled={formik.isSubmitting}
                onClick={() => {
                  setFormState(false);
                }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  t("cancel")
                )}
              </Button>
            </Grid>
          )}
          <Grid item width={singleAction ? "100%" : "fit-content"}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
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
  dataModel: PropTypes.array.isRequired,
  formTitle: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
  updateData: PropTypes.object,
  additionalData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  singleAction: PropTypes.bool,
  setFormState: PropTypes.func,
};

export default FormComponent;
