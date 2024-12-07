import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFetchAdminProfileQuery } from "../redux/apiSlices/authSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const {
    data: fetchAdminProfile,
    isLoading,
    isError,
    isFetching,
  } = useFetchAdminProfileQuery();

  const adminData = fetchAdminProfile?.data;

  // console.log(adminData);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (
    adminData?.role &&
    (adminData?.role === "ADMIN" || adminData?.role === "SUPER_ADMIN")
  ) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
