import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";
import petLogo from "../assets/pawmart_logo.png";
import userIcon from "../assets/user.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);

  // dropdown open states (click-to-open)
  const [exploreOpen, setExploreOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);

  const exploreRef = useRef(null);
  const browseRef = useRef(null);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-primary"
      : "text-base-content/80 hover:text-base-content transition";

  const closeAll = () => {
    setExploreOpen(false);
    setBrowseOpen(false);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(e.target) &&
        browseRef.current &&
        !browseRef.current.contains(e.target)
      ) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close dropdown on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    try {
      setLoggingOut(true);
      await logOut();
      toast.success("Logged out successfully");
      closeAll();
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu (simple links) */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60"
            >
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/browse" className={navLinkClass}>
                  Browse
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={navLinkClass}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={navLinkClass}>
                  Care Tips
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navLinkClass}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>
              </li>

              {user && (
                <>
                  <li className="divider my-1"></li>
                  <li>
                    <NavLink to="/add-service">Add Listing</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-listings">My Listings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-orders">My Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li className="divider my-1"></li>
                  <li>
                    <Link
                      to="/auth/login"
                      className="btn btn-primary btn-sm w-full"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth/register"
                      className="btn btn-outline btn-sm w-full"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={petLogo} alt="PawMart logo" className="w-10" />
            <span className="text-xl font-bold">PawMart</span>
          </Link>
        </div>

        {/* CENTER (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-medium">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            {/* Browse dropdown (click-to-open, optional) */}
            <li ref={browseRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setBrowseOpen((p) => !p);
                  setExploreOpen(false);
                }}
                className="btn btn-ghost btn-sm gap-1"
              >
                Browse
                <svg
                  className={`w-4 h-4 transition ${
                    browseOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {browseOpen && (
                <ul className="menu menu-sm absolute top-11 left-0 z-50 p-2 shadow bg-base-100 rounded-box w-56 border border-base-200">
                  <li>
                    <NavLink to="/browse" onClick={closeAll}>
                      All Listings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse?type=adoption" onClick={closeAll}>
                      Adoption
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse?type=products" onClick={closeAll}>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse?type=services" onClick={closeAll}>
                      Pet Care Services
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Explore dropdown (click-to-open, stable) */}
            <li ref={exploreRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setExploreOpen((p) => !p);
                  setBrowseOpen(false);
                }}
                className="btn btn-ghost btn-sm gap-1"
              >
                Explore
                <svg
                  className={`w-4 h-4 transition ${
                    exploreOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {exploreOpen && (
                <ul className="menu menu-sm absolute top-11 left-0 z-50 p-2 shadow bg-base-100 rounded-box w-56 border border-base-200">
                  <li>
                    <NavLink to="/categories" onClick={closeAll}>
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog" onClick={closeAll}>
                      Care Tips
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/faq" onClick={closeAll}>
                      FAQ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" onClick={closeAll}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Logged-in only links (5+ routes requirement) */}
            {user && (
              <>
                {/* <li>
                  <NavLink to="/add-service" className={navLinkClass}>
                    Add Listing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-listings" className={navLinkClass}>
                    My Listings
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="/my-orders" className={navLinkClass}>
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist" className={navLinkClass}>
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          <ThemeToggle />

          {!user ? (
            <div className="hidden lg:flex gap-2">
              <Link to="/auth/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-outline btn-sm">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-base-200">
                  <img src={user?.photoURL || userIcon} alt="Profile" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
              >
                <li className="text-xs opacity-70 px-2">
                  Signed in as {user?.displayName || "User"}
                </li>
                <div className="divider my-1" />
                <li>
                  <NavLink to="/profile" onClick={closeAll}>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-listings" onClick={closeAll}>
                    My Listings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-orders" onClick={closeAll}>
                    My Orders
                  </NavLink>
                </li>
                <div className="divider my-1" />
                <li>
                  <button
                    onClick={handleLogout}
                    className={`text-error ${
                      loggingOut ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
