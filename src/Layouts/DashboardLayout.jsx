import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const linkClass = ({ isActive }) =>
  `flex items-center justify-between px-4 py-3 rounded-xl border transition
   ${
     isActive
       ? "bg-primary text-primary-content border-primary"
       : "bg-base-100 border-base-300 hover:bg-base-200"
   }`;

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const fallback = "https://i.ibb.co/9GZ8f5Z/avatar-placeholder.png";

  /* 🔥 Close sidebar on route change (fix black overlay bug) */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [location.pathname]);

  /* 🔄 Loading state */
  if (roleLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-base-200">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  /* 🔐 Auto redirect admin → admin home */
  if (user && role === "admin" && location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/admin/home" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Topbar */}
      <div className="sticky top-0 z-30 bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div>
              <p className="font-extrabold text-lg leading-none">PawMart</p>
              <p className="text-xs text-base-content/60">Dashboard</p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-base-300 bg-base-200">
              <img
                src={user?.photoURL || fallback}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold leading-none">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-base-content/60">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Mobile overlay */}
          <div
            className={`fixed inset-0 bg-black/40 z-40 lg:hidden ${
              sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className={`
              fixed lg:static z-50 lg:z-auto top-0 left-0 h-full lg:h-auto
              w-[280px] bg-base-100 border border-base-300 shadow-xl lg:shadow-none
              rounded-none lg:rounded-2xl p-4
              transition-transform duration-300
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">Menu</h3>
              <button
                className="btn btn-ghost btn-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {/* USER DASHBOARD */}
              <NavLink
                to="/dashboard"
                end
                className={linkClass}
              >
                <span className="font-semibold">Dashboard Home</span>
              </NavLink>

              <div className="divider text-xs">User</div>

              <NavLink
                to="/my-orders"
                className={linkClass}
              >
                <span className="font-semibold">My Orders</span>
              </NavLink>

              <NavLink
                to="/my-listings"
                className={linkClass}
              >
                <span className="font-semibold">My Listings</span>
              </NavLink>

              {/* ADMIN */}
              <div className="divider text-xs">Admin</div>

              {role === "admin" ? (
                <>
                  <NavLink
                    to="/dashboard/admin/home"
                    className={linkClass}
                  >
                    <span className="font-semibold">
                      Admin Dashboard
                    </span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin/overview"
                    className={linkClass}
                  >
                    <span className="font-semibold">
                      Admin Overview
                    </span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin/users"
                    className={linkClass}
                  >
                    <span className="font-semibold">
                      Manage Users
                    </span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin/listings"
                    className={linkClass}
                  >
                    <span className="font-semibold">
                      Manage Listings
                    </span>
                  </NavLink>
                </>
              ) : (
                <p className="text-sm text-base-content/60 px-2">
                  Not admin — admin features hidden.
                </p>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-5 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
