import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useMutation } from "@tanstack/react-query";
import { getMe } from "../api/auth";

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const { mutate: getMyInfo } = useMutation({
    mutationFn: getMe,
    onSuccess: (res) => {
      if (res.status === "success") {
        setAuthenticated(true);
      }

      if (res?.response?.data?.status === "fail") {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error fetching user info:", error);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary-text bg-neutral-0 dark:bg-neutral-950">
        <div className="loader">Loading...</div>
      </div>
    );
  } else {
    if (!isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <>{children}</>;
  }
};
