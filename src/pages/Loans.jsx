import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../hooks/useAxios";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridMoreVertIcon, GridToolbar } from "@mui/x-data-grid";

import { loansModel, paymentModel } from "../helperData/dataModel";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";
import FormComponent from "../components/FormComponent";
import ConfirmDialog from "../components/ConfirmDialog";
import { Add, ViewColumn } from "@mui/icons-material";
import FullScreenDialog from "../components/FullScreenDialog";
import AccountForm from "../components/Loan/AccountForm";
import { processLoanData, removeEmptyValues } from "../utils/core.services";
import { loansColumn } from "../helperData/dataGrid";

const Loans = () => {
  const { t, i18n } = useTranslation();

  const [formState, setFormState] = useState(false);
  const [updateFormState, setUpdateFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [createPaymentForm, setCreatePaymentForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loans, setLoans] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const options = useMemo(() => ({}), []);
  const { data, loading, error, refetch } = useAxios("/loans", options);

  useEffect(() => {
    if (data) {
      setLoans(data);
    }
  }, [data]);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setUpdateData(row);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
  };

  const handleClickOpen = () => {
    setFormState(true);
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/loans/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting loans:", error);
    }
    dispatch(
      showSnackbar({
        message: "loans deleted successfully!",
        severity: "success",
      })
    );
    handleMenuClose();
    setConfirmDialogOpen(false);
  };
  const handleFormSubmit = async (formData, update) => {
    processLoanData(formData);
    removeEmptyValues(formData);

    try {
      let response;
      if (update) {
        response = await axiosInstance.put(
          `/loans/${updateData.loan_id}`,
          formData
        );
      } else {
        response = await axiosInstance.post("/loans", formData);
      }

      refetch();
    } catch (error) {
      throw error;
    }
  };
  const handlePaymentFormSubmit = async (formData) => {
    try {
      await axiosInstance.post("/payments", formData);
      refetch();
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = (data) => {
    setUpdateData(
      Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      )
    );
    setUpdateFormState(true);
  };
  const columns = useMemo(() => {
    return [
      ...loansColumn.map((item, index) => {
        if (item.field === "payment") {
          return {
            field: "actions",
            headerName: t("actions"),
            minWidth: "200",
            renderCell: (params) => (
              <Grid item>
                <Button
                  onClick={() => {
                    setCreatePaymentForm(true);
                  }}
                >
                  <Add color="primary" style={{ marginRight: 8 }} />
                  {t("add_payment")}
                </Button>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, params.row)}
                >
                  <GridMoreVertIcon />
                </IconButton>
              </Grid>
            ),
          };
        }
        return {
          ...item,
          headerName: t(item.headerName),
        };
      }),
    ];
  }, [t, anchorEl]);
  const updatedLoansModel = useMemo(() => {
    return loansModel.map((item) => {
      if (item.name === "name") {
        item.name = "user_name";
      }
      return item;
    });
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        {t("loans")}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        mb={2}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {t("create_new")}
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 650,
          overflow: "scroll",
        }}
      >
        <DataGrid
          rows={loans}
          columns={columns}
          getRowId={(row) => {
            return row.loan_id;
          }}
          sx={{
            flexGrow: 1,
          }}
          pageSizeOptions={[10, 100, { value: 1000, label: "1,000" }]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <Dialog
        open={formState}
        onClose={() => {
          setFormState(false);
          setSelectedRow(null);
        }}
      >
        <FormComponent
          dataModel={updatedLoansModel}
          formTitle={t("create_loan")}
          onSubmit={handleFormSubmit}
          setFormState={setFormState}
        >
          <AccountForm />
        </FormComponent>
      </Dialog>
      <Dialog
        open={updateFormState}
        onClose={() => {
          setUpdateFormState(false);
          setSelectedRow(null);
        }}
      >
        <FormComponent
          dataModel={updatedLoansModel}
          formTitle={t("update_loan")}
          update={true}
          updateData={updateData}
          preSetValues={updateData}
          onSubmit={handleFormSubmit}
          setFormState={setUpdateFormState}
        >
          <AccountForm />
        </FormComponent>
      </Dialog>
      <Dialog
        open={createPaymentForm}
        onClose={() => {
          setCreatePaymentForm(false);
          setSelectedRow(null);
        }}
      >
        <FormComponent
          dataModel={paymentModel}
          formTitle={t("create_payment")}
          preSetValues={{
            ...selectedRow,
            amount: selectedRow?.amount * (selectedRow?.interest_rate / 100),
          }}
          onSubmit={handlePaymentFormSubmit}
          setFormState={setCreatePaymentForm}
        >
          <AccountForm />
        </FormComponent>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setLoansDialogState(true);
            handleMenuClose();
          }}
        >
          <ViewColumn color="primary" style={{ marginRight: 8 }} />
          {t("view_payments")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEdit(selectedRow);
            handleMenuClose();
          }}
        >
          <EditIcon color="primary" style={{ marginRight: 8 }} />
          {t("edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setConfirmDialogOpen(true);
            handleMenuClose();
          }}
        >
          <DeleteIcon color="secondary" style={{ marginRight: 8 }} />
          {t("delete")}
        </MenuItem>
      </Menu>
      <ConfirmDialog
        confirmType="secondary"
        confirmTitle={t("confirm_delete")}
        confirmDescription={
          t("confirm_delete_message") + " : " + selectedRow?.loan_id
        }
        open={confirmDialogOpen}
        handleClose={() => {
          setConfirmDialogOpen(false);
        }}
        handleConfirm={(confirm) =>
          confirm && handleDelete(selectedRow.loan_id)
        }
      />
    </Container>
  );
};

export default Loans;
