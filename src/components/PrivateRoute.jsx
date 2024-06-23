import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { token, userType} = useSelector((state) => state.auth);
  return token && userType == import.meta.env.VITE_LENDER_ROLE ? children : <Navigate to="/login" />;
};

export default PrivateRoute;