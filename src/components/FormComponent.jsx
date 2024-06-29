import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { generateValidationSchema } from "../utils/validationSchema";
import axiosInstance from "../api/axiosInstance";
import { formatDateFromData } from "../utils/core.services";

const FormComponent = ({
  dataModel,
  formTitle,
  update = false,
  updateData = null,
  additionalData = {},
  onSubmit,
  singleAction = false,
  setFormState = {},
  preSetValues = [],
  children,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // State to store dropdown options
  const [apiData, setApiData] = useState({});

  // Create validation schema based on the dataModel
  const validationSchema = generateValidationSchema(dataModel, t);
  const formik = useFormik({
    initialValues: Object.keys(dataModel).reduce((acc, key) => {
      acc[dataModel[key].name] = dataModel[key]?.default || "";
      return acc;
    }, {}),
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values = formatDateFromData(values, dataModel);
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
              : t("Submitted successfully!"),
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
            message: `${t("Something went wrong!")} : ${
              error.response.data.error
            }`,
            severity: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch dropdown options based on apiUrl
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      const newDropdownOptions = {};
      await Promise.all(
        dataModel.map(async (item) => {
          if (item.apiUrl) {
            try {
              const response = await axiosInstance.get(item.apiUrl);
              newDropdownOptions[item.name] = response.data;
            } catch (error) {
              console.error(
                `Error fetching dropdown options for ${item.name}:`,
                error
              );
            }
          }
        })
      );
      setApiData(newDropdownOptions);
    };
    fetchDropdownOptions();
  }, [dataModel]);

  useEffect(() => {
    if (update && updateData) {
      formik.setValues(updateData);
    }
  }, [update, updateData]);

  useEffect(() => {
    if (preSetValues) {
      Object.keys(preSetValues).forEach((item) => {
        formik.setFieldValue(item, preSetValues[item]);
      });
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
            <Grid key={index} item xs={item?.size === "md" ? 6 : 12}>
              {item?.type === "optional" ? (
                <TextField
                  label={`${t(`${item.name}`)}${item?.required ? "*" : ""}`}
                  variant="outlined"
                  fullWidth
                  name={item?.name}
                  value={formik.values[item.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[item.name] &&
                    Boolean(formik.errors[item.name])
                  }
                  helperText={
                    formik.touched[item.name] && formik.errors[item.name]
                  }
                  disabled={formik.isSubmitting}
                />
              ) : item.type === "dropdown" ? (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{`${t(`${item.name}`)}${
                    item?.required ? "*" : ""
                  }`}</InputLabel>
                  <Select
                    label={`${t(`${item.name}`)}${item?.required ? "*" : ""}`}
                    name={item.name}
                    value={formik.values[item.name] || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[item.name] &&
                      Boolean(formik.errors[item.name])
                    }
                    disabled={formik.isSubmitting}
                  >
                    {apiData[item.name]?.map((option) => {
                      return (
                        <MenuItem
                          key={option[item.name]}
                          value={option[item.name]}
                          onClick={() => {
                            if (item.setFields) {
                              const data = apiData[item.name].filter(
                                (apiItem) => {
                                  return (
                                    apiItem[item.name] === option[item.name]
                                  );
                                }
                              )[0];

                              item.setFields.forEach((field) => {
                                formik.setFieldValue(
                                  field.name,
                                  data[field.value]
                                );
                              });
                            }
                          }}
                        >
                          {option[item.label]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : item.type === "date" ? (
                <TextField
                  label={`${t(`${item.name}`)}${item?.required ? "*" : ""}`}
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name={item.name}
                  value={formik.values[item.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[item.name] &&
                    Boolean(formik.errors[item.name])
                  }
                  helperText={
                    formik.touched[item.name] && formik.errors[item.name]
                  }
                  disabled={formik.isSubmitting}
                />
              ) : item.type === "custom" ? (
                React.Children.map(children, (child) => {
                  return React.cloneElement(child, {
                    // Pass props to children here
                    apiData: apiData,
                    formik: formik,
                    t: t, // Example of passing formik instance
                    // Add more props as needed
                  });
                })
              ) : (
                <TextField
                  label={`${t(`${item.name}`)}${item?.required ? "*" : ""}`}
                  variant="outlined"
                  fullWidth
                  name={item.name}
                  value={formik.values[item.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[item.name] &&
                    Boolean(formik.errors[item.name])
                  }
                  helperText={
                    formik.touched[item.name] && formik.errors[item.name]
                  }
                  disabled={item.disabled || formik.isSubmitting}
                />
              )}
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
  update: PropTypes.bool,
  updateData: PropTypes.object,
  additionalData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  singleAction: PropTypes.bool,
  setFormState: PropTypes.func,
  children: PropTypes.node,
};

export default FormComponent;
