import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import petLogo from "../assets/pawmart_logo.png.png";
import userIcon from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

   useEffect(() => {
      AOS.init({
        duration: 700,
        easing: "ease-in-out",
        once: true,
      });
    }, []);

  return (
    <div className="navbar bg-base-100 dark:bg-gray-900 dark:text-gray-100 shadow-sm mb-10">
      <div className="navbar-start flex items-center gap-3">
        <img
          data-aos="fade-right"
          src={petLogo}
          alt="Logo"
          className="w-14"
        />
        <span
          data-aos="fade-down"
          className="font-bold text-xl"
        >
          PawMart
        </span>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-bold dark:text-violet-300"
                  : "text-gray-700 dark:text-gray-200"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-bold dark:text-violet-300"
                  : "text-gray-700 dark:text-gray-200"
              }
            >
              Pets & Supplies
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/add-service"
                  className={({ isActive }) =>
                    isActive
                      ? "text-violet-500 font-bold dark:text-violet-300"
                      : "text-gray-700 dark:text-gray-200"
                  }
                >
                  Add Listing
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/my-listings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-violet-500 font-bold dark:text-violet-300"
                      : "text-gray-700 dark:text-gray-200"
                  }
                >
                  My Listings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-violet-500 font-bold dark:text-violet-300"
                      : "text-gray-700 dark:text-gray-200"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-5">
        <ThemeToggle />

        {!user && (
          <>
            <Link to="/auth/login" className="btn btn-primary btn-sm px-4">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-outline btn-sm px-4">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile">
              <img
                data-aos="zoom-in"
                src={user?.photoURL || userIcon}
                alt="Profile"
                className="w-12 h-12 rounded-full border"
              />
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-primary btn-sm px-6"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
