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
import { loansColumn } from "../helperData/dataGrid";
import FormComponent from "../components/FormComponent";
import { loansModel } from "../helperData/modelData";
import axiosInstance from "../api/axiosInstance";

import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";
import ConfirmDeleteDialog from "../components/confirmDialogue";

const Loans = () => {
  const { t, i18n } = useTranslation();

  const [formState, setFormState] = useState(false);
  const [updateFormState, setUpdateFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);
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
      await axiosInstance.delete(`/loans/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
    dispatch(
      showSnackbar({
        message: "Loan deleted successfully!",
        severity: "success",
      })
    );
    handleMenuClose();
    setConfirmDialogOpen(false);
  };
  const handleFormSubmit = async (formData, update) => {
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
      handleMenuClose();
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
      ...loansColumn.map((item) => {
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
    <Container sx={{ padding: "16px" }}>
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
          height: 600,
          overflow: "scroll",
        }}
      >
        <DataGrid
          rows={loans}
          columns={columns}
          getRowId={(row) => {
            return row.user_id;
          }}
          pageSizeOptions={[10, 100, { value: 1000, label: "1,000" }]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <Dialog formState={formState} setFormState={setFormState}>
        <FormComponent
          dataModel={loansModel}
          formTitle={t("create_new_customer")}
          update={false}
          updateData={null}
          onSubmit={handleFormSubmit}
        ></FormComponent>
      </Dialog>
      <Dialog formState={updateFormState} setFormState={setUpdateFormState}>
        <FormComponent
          dataModel={loansModel}
          formTitle={t("update_customer")}
          update={true}
          updateData={updateData}
          onSubmit={handleFormSubmit}
        ></FormComponent>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(selectedRow)}>
          <EditIcon color="primary" style={{ marginRight: 8 }} />
          {t("edit")}
        </MenuItem>
        <MenuItem onClick={() => setConfirmDialogOpen(true)}>
          <DeleteIcon color="secondary" style={{ marginRight: 8 }} />
          {t("delete")}
        </MenuItem>
      </Menu>
      <ConfirmDeleteDialog
        open={confirmDialogOpen}
        handleClose={() => setConfirmDialogOpen(false)}
        handleConfirm={() => handleDelete(selectedRow.user_id)}
      />
    </Container>
  );
};

export default Loans;
