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

export const loansModel = {
  user_id: {
    required: true,
    validation: "number",
  },
  amount: {
    required: true,
  },
  interest_rate: {},
  loan_type_id: {},
  loan_date: {},
  start_date: {},
  end_date: {},
  next_due_date: {},
  balance: {},
  status: {},
};
