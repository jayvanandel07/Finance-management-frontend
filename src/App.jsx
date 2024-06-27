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
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import Loans from "./pages/Loans";

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
