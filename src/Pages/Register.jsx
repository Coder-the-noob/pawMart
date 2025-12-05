import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, setUser, updateUserProfile, googleLogin } = useContext(AuthContext);

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Name validation
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Name can only contain letters and spaces.");
      return;
    } else {
      setNameError("");
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please provide a valid email address.");
      return;
    }

    // Password validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    // Create user with Firebase
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...loggedUser, displayName: name, photoURL: photo });
            toast.success("User registered successfully!");
            form.reset();
            navigate(`${location.state || "/"}`);
          })
          .catch((error) => {
            console.log(error);
            setUser(loggedUser);
            toast.success("User registered successfully!");
            navigate(`${location.state || "/"}`);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed: " + error.message);
      });
  };

  // Google login handler
  const handleGoogleRegister = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        toast.success("Logged in with Google successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google login failed: " + error.code);
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Password with eye toggle */}
            <label className="label">Password</label>
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input pr-10 w-full"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            {/* Register Button */}
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            {/* Google Registration Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="btn bg-white text-black border-[#e5e5e5] mt-2 flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Register with Google
            </button>

            {/* Login Link */}
            <p className="mt-4 font-semibold text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="link link-hover text-red-500">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
