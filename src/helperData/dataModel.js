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
  { name: "user_id", required: true, validation: "number" },
  { name: "amount", required: true },
  { name: "interest_rate" },
  { name: "loan_type_id" },
  { name: "loan_date" },
  { name: "start_date" },
  { name: "end_date" },
  { name: "next_due_date" },
  { name: "balance" },
  { name: "status" },
];
