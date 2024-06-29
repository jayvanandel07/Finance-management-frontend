import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";
import Menu from "./components/Menu";
import Customers from "./pages/Customers";
import GlobalSnackbar from "./components/GlobalSnackbar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import Loans from "./pages/Loans";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Arial",
      "sans-serif",
      // You can add fallback fonts here
    ].join(","),
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Arial';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          // You might need to add src if you're using a custom font
        }
      `,
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: "primary.light",
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #e0e0e0",
          },

          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle  ": {
            fontWeight: "800",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f5f5f5",
          },
        },
        columnHeaders: {
          fontWeight: "600",
        },
      },
    },
  },
});
const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
        }
      } catch (error) {
        console.log(error);
        dispatch(logout());
      }
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const MainApp = () => (
  <div style={{ display: "flex", width: "100vw" }}>
    <Menu />
    <Box padding={2} sx={{ width: "85vw" }}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="loans" element={<Loans />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </Box>
    <GlobalSnackbar />
  </div>
);

export default App;
