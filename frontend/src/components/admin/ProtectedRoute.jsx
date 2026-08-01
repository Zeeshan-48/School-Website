import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return children;
};
