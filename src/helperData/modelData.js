//help
// formDialogue = {
//   formState: "state",
//   setFormState: "setState",
//   dataModel: "model",
//   formTitle: "string",
//   update: "boolean",
//   updateData: "object",
//   apiURL: "string",
//   additionalData: "object",
// };

export const customersModel = {
  user_id: {
    required: true,
    validation: "number",
  },
  name: {
    required: true,
  },
  tamil_name: {},
  alias: {},
  email: {
    validation: "email",
  },
  phone: {
    required: true,
    validation: "phone",
  },
  address: {
    required: true,
  },
  cibil: {
    validation: "number",
  },
};
