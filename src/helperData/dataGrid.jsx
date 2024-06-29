import React from "react";
import { convertDate } from "../utils/core.services";

export const customersColumn = [
  {
    field: "user_id",
    headerName: "user_id",
    minWidth: 150,
    flex: 1,
    align: "left",
    pinnable: true,
  },
  {
    field: "name",
    headerName: "name",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "tamil_name",
    headerName: "tamil_name",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "alias",
    headerName: "alias",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
  {
    field: "email",
    headerName: "email",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
  {
    field: "phone",
    headerName: "phone",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "address",
    headerName: "address",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "cibil",
    headerName: "cibil",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
];

export const loansColumn = [
  {
    field: "loan_id",
    headerName: "loan_id",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
  {
    field: "user_id",
    headerName: "user_id",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "user_name",
    headerName: "user_name",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "amount",
    headerName: "amount",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => <strong>{params.value.toUpperCase()} Rs</strong>,
  },

  {
    field: "loan_type_name",
    headerName: "loan_type_name",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "loan_date",
    headerName: "loan_date",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => {
      return convertDate(params.value);
    },
  },
  {
    field: "next_due_date",
    headerName: "next_due_date",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => {
      return convertDate(params.value);
    },
  },
  {
    field: "payment",
  },
  {
    field: "balance",
    headerName: "balance",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => (
      <strong style={{ color: "red" }}>{params.value.toUpperCase()} Rs</strong>
    ),
  },

  {
    field: "end_date",
    headerName: "end_date",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => {
      return convertDate(params.value);
    },
  },

  {
    field: "interest_rate",
    headerName: "interest_rate",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "due_tenure",
    headerName: "due_tenure",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "due_frequency",
    headerName: "due_frequency",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "due_time_unit",
    headerName: "due_time_unit",
    minWidth: 150,
    flex: 1,
    align: "left",
  },

  {
    field: "status",
    headerName: "status",
    minWidth: 150,
    flex: 1,
    align: "left",
    renderCell: (params) => (
      <strong
        style={{ color: `${params.value === "active" ? "green" : "red"}` }}
      >
        {params.value.toUpperCase()}
      </strong>
    ),
  },
];
