import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protectedroute = () => {
  const { user, isAuthenticate } = useSelector(
    (state) => state.data
  );

  console.log("Protected route user:", user);
  console.log("Protected route authenticated:", isAuthenticate);

  return isAuthenticate && user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Protectedroute;