import * as yup from "yup";

export const generateValidationSchema = (dataModel, t) => {
  return yup.object().shape(
    dataModel.reduce((acc, field) => {
      let fieldSchema = yup.string();

      if (field.required) {
        fieldSchema = fieldSchema.required(`${t(field.name)} is required`);
      }

      if (field.validation === "number") {
        fieldSchema = fieldSchema.matches(
          /^\d+$/,
          `${t(field.name)} must be a number`
        );
      }

      if (field.validation === "email") {
        fieldSchema = fieldSchema.email("Invalid email format");
      }

      if (field.validation === "phone") {
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

      acc[field.name] = fieldSchema;
      return acc;
    }, {})
  );
};
