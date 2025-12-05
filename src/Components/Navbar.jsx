import React, { useContext } from "react";
import petLogo from "../assets/company_logo.png.png";
import { Link, NavLink } from "react-router-dom";
import userIcon from "../assets/user.png";
import "animate.css";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("User logged out successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed: " + error.message);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm mb-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-violet-500 font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "text-violet-500 font-bold" : ""
                }
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-violet-500 font-bold" : ""
                }
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-service"
                className={({ isActive }) =>
                  isActive ? "text-violet-500 font-bold" : ""
                }
              >
                Add Service
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img
            className="w-15 rounded-full animate__animated animate__bounceIn animate__delay-1s"
            src={petLogo}
            alt="WarmPaws Logo"
          />
          <span className="font-bold text-xl animate__animated animate__fadeInUp animate__delay-1s">
            WarmPaws – Pet Care Center
          </span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-violet-500 font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "text-violet-500 font-bold" : ""
              }
            >
              Services
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-violet-500 font-bold" : ""
              }
            >
              My Profile
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/add-service"
              className={({ isActive }) =>
                isActive ? "text-violet-500 font-bold" : ""
              }
            >
              Add Service
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="tooltip tooltip-bottom" data-tip={user?.displayName || "Guest"}>
          <Link to="/profile">
          <img
            className="w-12 rounded-full space-x-3"
            src={`${user && user.photoURL ? user.photoURL : userIcon}`}
            alt=""
          />
        </Link>
        </div>
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary px-10 ml-4">
            Logout
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-primary px-10 ml-4">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
