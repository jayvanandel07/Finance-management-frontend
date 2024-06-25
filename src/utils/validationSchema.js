import * as yup from "yup";

export const generateValidationSchema = (dataModel, t) => {
  return yup.object().shape(
    Object.keys(dataModel).reduce((acc, key) => {
      let fieldSchema = yup.string();

      if (dataModel[key].required) {
        fieldSchema = fieldSchema.required(`${t(key)} is required`);
      }

      if (dataModel[key].validation === "number") {
        fieldSchema = fieldSchema.matches(
          /^\d+$/,
          t(`${t(key)} must be a number`)
        );
      }
      if (dataModel[key].validation === "email") {
        fieldSchema = fieldSchema.email("Invalid email format");
      }

      if (dataModel[key].validation === "phone") {
        fieldSchema = fieldSchema.test(
          "is-valid-phone",
          "Invalid phone number format",
          function (value) {
            if (!value) return true; // If the field is not required, skip validation if it's empty
            const phoneNumbers = value.split(",");
            const phoneRegex = /^(\+?\d{1,3})?[789]\d{9}$/;
            return phoneNumbers.every((phone) => phoneRegex.test(phone.trim()));
          }
        );
      }

      acc[key] = fieldSchema;
      return acc;
    }, {})
  );
};
