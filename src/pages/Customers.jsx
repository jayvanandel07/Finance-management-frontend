import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../hooks/useAxios";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridMoreVertIcon, GridToolbar } from "@mui/x-data-grid";
import { customersColumn } from "../helperData/dataGrid";
import { customersModel, loansModel } from "../helperData/dataModel";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";
import FormComponent from "../components/FormComponent";
import ConfirmDialog from "../components/ConfirmDialog";
import Loans from "./Loans";
import { Add, ViewColumn } from "@mui/icons-material";
import FullScreenDialog from "../components/FullScreenDialog";
import AccountForm from "../components/Loan/AccountForm";
import { processLoanData, removeEmptyValues } from "../utils/core.services";

const Customers = () => {
  const { t, i18n } = useTranslation();

  const [formState, setFormState] = useState(false);
  const [updateFormState, setUpdateFormState] = useState(false);
  const [createLoanFormSate, setCreateLoanFormSate] = useState(false);
  const [loansDialogState, setLoansDialogState] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const options = useMemo(() => ({}), []);
  const { data, loading, error, refetch } = useAxios(
    "/users/role/Borrower",
    options
  );

  useEffect(() => {
    if (data) {
      setCustomers(data);
    }
  }, [data]);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setUpdateData(row);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);

    setSelectedRow(null);
  };

  const handleClickOpen = () => {
    setFormState(true);
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
    dispatch(
      showSnackbar({
        message: "User deleted successfully!",
        severity: "success",
      })
    );
    handleMenuClose();
    setConfirmDialogOpen(false);
  };
  const handleFormSubmit = async (formData, update) => {
    removeEmptyValues(formData);
    try {
      let response;
      if (update) {
        response = await axiosInstance.put(
          `/users/${updateData.user_id}`,
          formData
        );
      } else {
        response = await axiosInstance.post("/users", formData);
      }

      refetch();
    } catch (error) {
      throw error;
    }
  };
  const handleCreateLoanFormSubmit = async (formData) => {
    processLoanData(formData);
    removeEmptyValues(formData);

    try {
      await axiosInstance.post("/loans", formData);
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
      ...customersColumn.map((item) => {
        return {
          ...item,
          headerName: t(item.headerName),
        };
      }),
      {
        field: "actions",
        headerName: t("actions"),

        renderCell: (params) => (
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuOpen(event, params.row)}
            >
              <GridMoreVertIcon />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [t, anchorEl]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        {t("customers")}
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
          rows={customers}
          columns={columns}
          getRowId={(row) => {
            return row.user_id;
          }}
          sx={{ flexGrow: 1 }}
          pageSizeOptions={[10, 100, { value: 1000, label: "1,000" }]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <Dialog open={formState} onClose={() => setFormState(false)}>
        <FormComponent
          dataModel={customersModel}
          formTitle={t("create_new_customer")}
          update={false}
          updateData={null}
          onSubmit={handleFormSubmit}
          setFormState={setFormState}
        />
      </Dialog>
      <Dialog open={updateFormState} onClose={() => setUpdateFormState(false)}>
        <FormComponent
          dataModel={customersModel}
          formTitle={t("update_customer")}
          update={true}
          updateData={updateData}
          onSubmit={handleFormSubmit}
          setFormState={setUpdateFormState}
        />
      </Dialog>
      <Dialog
        open={createLoanFormSate}
        onClose={() => setCreateLoanFormSate(false)}
      >
        <FormComponent
          dataModel={loansModel}
          formTitle={t("create_loan")}
          preSetValues={updateData}
          onSubmit={handleCreateLoanFormSubmit}
          setFormState={setCreateLoanFormSate}
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
          {t("view_loans")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCreateLoanFormSate(true);
            handleMenuClose();
          }}
        >
          <Add color="primary" style={{ marginRight: 8 }} />
          {t("create_loan")}
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
          t("confirm_delete_message") + " : " + selectedRow?.user_id
        }
        open={confirmDialogOpen}
        handleClose={() => {
          setConfirmDialogOpen(false);
        }}
        handleConfirm={(confirm) =>
          confirm && handleDelete(selectedRow.user_id)
        }
      />
      <FullScreenDialog
        openState={loansDialogState}
        setOpenState={setLoansDialogState}
      >
        <Loans user={selectedRow}></Loans>
      </FullScreenDialog>
    </Container>
  );
};

export default Customers;
