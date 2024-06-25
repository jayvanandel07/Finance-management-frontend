import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../hooks/useAxios";
import { Box, Button, Container, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { customersColumn } from "../helperData/dataGrid";
import FormDialogue from "../components/common/FormDialogue";
import { customersModel } from "../helperData/modelData";
import axiosInstance from "../api/axiosInstance";

const Customers = () => {
  const { t, i18n } = useTranslation();

  const [formState, setFormSate] = useState(false);
  const [updateFormState, setUpdateFormSate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [customers, setCustomers] = useState([]);

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

  const handleClickOpen = () => {
    setFormSate(true);
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
      await refetch();
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
    setUpdateFormSate(true);
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
        headerName: "Actions",

        renderCell: (params) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];
  }, [t]);
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
          rows={customers}
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
      <FormDialogue
        formState={formState}
        setFormState={setFormSate}
        dataModel={customersModel}
        formTitle={t("create_new_customer")}
        update={false}
        updateData={null}
        additionalData={{
          user_type_id: import.meta.env.VITE_BORROWER_ROLE,
        }}
        onSubmit={handleFormSubmit}
      />
      <FormDialogue
        formState={updateFormState}
        setFormState={setUpdateFormSate}
        dataModel={customersModel}
        formTitle={t("update_customer")}
        update={true}
        updateData={updateData}
        additionalData={{
          user_type_id: import.meta.env.VITE_BORROWER_ROLE,
        }}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};

export default Customers;
