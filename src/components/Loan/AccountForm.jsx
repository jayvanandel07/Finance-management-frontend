import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function AccountForm({ apiData, formik, t }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (apiData?.accounts) {
      apiData?.accounts.map((item, index) => {
        formik.setFieldValue(`account_no${index + 1}`, item.account_no);
        formik.setFieldValue(`amount${index + 1}`, "");
      });
      setAccounts(apiData?.accounts);
    }
  }, [apiData]);
  return (
    <>
      {accounts.map((item, index) => (
        <Grid key={index + 1} item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={`${t("account")} ${item.name}`}
              variant="outlined"
              fullWidth
              name={`account_no${index + 1}`}
              value={formik.values[`account_no${index + 1}`] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={`${t("amount")}`}
              variant="outlined"
              fullWidth
              name={`amount${index + 1}`}
              value={formik.values[`amount${index + 1}`] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default AccountForm;
