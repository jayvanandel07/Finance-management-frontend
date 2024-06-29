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

import { convertDate } from "../utils/core.services";

export const customersModel = [
  { name: "user_id", required: true, validation: "number" },
  { name: "name", required: true },
  { name: "tamil_name" },
  { name: "alias" },
  { name: "email", validation: "email" },
  { name: "phone", required: true, validation: "phone" },
  { name: "address", required: true },
  { name: "cibil", validation: "number" },
];

export const loansModel = [
  { name: "user_id", required: true, validation: "number", disabled: true },
  { name: "name", required: true, disabled: true },
  { name: "amount", required: true, validation: "number" },
  {
    name: "accounts",
    type: "custom",
    apiUrl: "/accounts",
  },

  {
    name: "loan_type_id",
    label: "type_name",
    type: "dropdown",
    apiUrl: "/loanTypes",
    required: true,
    setFields: [
      {
        name: "interest_rate",
        value: "interest_rate",
      },
      {
        name: "due_frequency",
        value: "frequency",
      },
      {
        name: "due_time_unit",
        value: "time_unit",
      },
      {
        name: "due_tenure",
        value: "tenure",
      },
    ],
  },
  {
    name: "interest_rate",
    value: "interest_rate",
  },
  {
    name: "due_frequency",
    value: "frequency",
  },
  {
    name: "due_time_unit",
    value: "time_unit",
  },
  {
    name: "due_tenure",
    value: "tenure",
  },
  {
    name: "loan_created",
    value: "loan_created",
    default: "As New",
    required: true,
  },

  { name: "loan_date", type: "date", required: true, size: "md" },
  { name: "start_date", type: "date", size: "md" },
];

export const paymentModel = [
  { name: "loan_id", required: true, disabled: true },
  { name: "user_name", required: true, disabled: true },
  {
    name: "account_no",
    label: "name",
    required: true,
    type: "dropdown",
    apiUrl: "/accounts",
    size: "md",
    setFields: [
      {
        name: "account_no",
        value: "account_no",
      },
    ],
  },

  {
    name: "account_no",
    required: true,
    validation: "number",
    disabled: true,
    size: "md",
  },
  {
    name: "amount",
    required: true,
    validation: "number",
  },
  {
    name: "payment_date",
    type: "date",
    required: true,
  },
];
