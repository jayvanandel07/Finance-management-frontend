import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/authSlice";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let role;
  try {
    role = jwtDecode(token).userType;
  } catch (error) {
    console.log(error);
    dispatch(logout());
    navigate("/login");
  }
  return token && role == import.meta.env.VITE_LENDER_ROLE ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
