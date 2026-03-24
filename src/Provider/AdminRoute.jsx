import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("ADMIN ROUTE CHECK:", { email: user?.email, role, loading, roleLoading });

  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-base-200">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
          <span className="loading loading-spinner loading-lg" />
          <p className="mt-3 font-semibold">Checking admin access...</p>
          <p className="text-sm text-base-content/60 mt-1">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
    
  }

  if (!user) return <Navigate to="/auth/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  console.log("AdminRoute =>", user?.email, role);
  return children;
};

export default AdminRoute;
