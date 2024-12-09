import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFetchAdminProfileQuery } from "../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: fetchAdminProfile,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useFetchAdminProfileQuery();

  const adminData = fetchAdminProfile?.data;

  useEffect(() => {
    if (isError) {
      toast.error("You are not authorized to access this. Please login first.");
      navigate("/auth/login", { replace: true, state: { from: location } });

      // Reload after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1 second delay
    }
  }, [isError, navigate, location]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
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
