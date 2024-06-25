import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/axiosInstance"; // Assuming you have an axiosInstance configured
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";

const Customers = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    user_id: "",
    name: "",
    tamil_name: "",
    alias: "",
    email: "",
    phone: "",
    address: "",
    cibil: "",
  });

  const options = useMemo(() => ({}), []);
  const { data, loading, error } = useAxios("/users/role/Borrower", options);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    try {
      const response = await axiosInstance.post("/users", {
        ...newCustomer,
        user_type_id: import.meta.env.VITE_BORROWER_ROLE,
      });
      console.log("Customer added successfully!", response.data);

      // Update customers state with the newly added customer
      setCustomers([...customers, response.data[0]]);

      // Reset the form
      setNewCustomer({
        user_id: "",
        name: "",
        tamil_name: "",
        alias: "",
        email: "",
        phone: "",
        address: "",
        cibil: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding customer:", error);
      dispatch(
        showSnackbar({ message: "Something went wrong!", severity: "error" })
      );
      // Handle error scenarios
    }
  };

  useEffect(() => {
    if (data) {
      setCustomers(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("customers")}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {t("create new")}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("user id")}</TableCell>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("tamil name")}</TableCell>
              <TableCell>{t("alias")}</TableCell>
              <TableCell>{t("email")}</TableCell>
              <TableCell>{t("phone")}</TableCell>
              <TableCell>{t("address")}</TableCell>
              <TableCell>{t("cibil")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.user_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.tamil_name}</TableCell>
                <TableCell>{customer.alias}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.cibil}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle padding={1}>{t("create new customer")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} padding={1}>
            <Grid item xs={12}>
              <TextField
                label={t("user id")}
                variant="outlined"
                fullWidth
                name="user_id"
                value={newCustomer.user_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("name")}
                variant="outlined"
                fullWidth
                name="name"
                value={newCustomer.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("tamil name")}
                variant="outlined"
                fullWidth
                name="tamil_name"
                value={newCustomer.tamil_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("alias")}
                variant="outlined"
                fullWidth
                name="alias"
                value={newCustomer.alias}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("email")}
                variant="outlined"
                fullWidth
                name="email"
                value={newCustomer.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("phone")}
                variant="outlined"
                fullWidth
                name="phone"
                value={newCustomer.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("address")}
                variant="outlined"
                fullWidth
                name="address"
                value={newCustomer.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("cibil")}
                variant="outlined"
                fullWidth
                name="cibil"
                value={newCustomer.cibil}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t("cancel")}
          </Button>
          <Button onClick={handleAddCustomer} color="primary">
            {t("add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Customers;
