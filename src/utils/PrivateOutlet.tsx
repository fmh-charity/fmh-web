import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const PrivateOutlet = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};
