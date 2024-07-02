import "normalize.css"; // Import normalize.css at the top
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ConfigProvider, Layout, theme } from "antd";

//redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
//pages
import Login from "./pages/Login";
import Register from "./pages/Register";

//components
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layout/AppLayout";

const customTheme = {
  algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
  cssVar: true,
  token: {
    // Global token customizations
    colorPrimary: "#1677FF",
    colorSuccess: "#52C41A",
    colorWarning: "#FAAD14",
    colorError: "#FF4D4F",
    colorTextBase: "#000",
    colorBgBase: "#FFF",
    colorSplit: "#DADADA",

    // Font
    fontSize: 16,

    // Spacing
    sizeStep: 4,
    sizeUnit: 4,

    // Style
    borderRadius: 6,
    lineWidth: 1,
    lineType: "solid",
  },
  components: {
    Button: {
      onlyIconSize: "16px",
    },
    Layout: {
      bodyBg: "#F5F5F5",
      headerBg: "#F5F5F5",
      siderBg: "#F5F5F5",
      triggerColor: "red",

      // Size
      headerHeight: "60px",
      headerPadding: "5px 10px",
    },
    // Navigation
    Menu: {
      itemBg: "#F5F5F5",

      //Size
      iconSize: 16,
      itemHeight: 50,
    },
  },
};
const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (token) {
    //   try {
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = Date.now() / 1000;
    //     if (decodedToken.exp < currentTime) {
    //       // Token has expired
    //       localStorage.removeItem("token");
    //       window.location.href = "/login"; // Redirect to login page
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     dispatch(logout());
    //   }
    // }
  }, []);
  return (
    <ConfigProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
