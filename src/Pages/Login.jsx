import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const { logIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({email, password});
    // handle login logic here
    logIn(email, password)
      .then(() => {
        // console.log(loggedUser);
        toast.success("User logged in successfully");
        form.reset();
        navigate(`${location.state || "/"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed: " + error.message);
        setError(error.code);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google successfully");
        navigate(`${location.state || "/"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google login failed: " + error.message);
        setError(error.code);
      });
  };

  return (
    <div className="flex mx-auto min-h-screen justify-center items-center">
      <form
        className="card-body flex justify-center items-center"
        onSubmit={handleLogin}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="text-xl font-bold text-center mb-4">
            Login Your Account
          </h1>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
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

          <div className="mt-2">
            <Link
              to="/auth/forgot-password"
              className="link link-hover font-semibold"
              state={{ email: "" }}
            >
              Forget Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] mt-3"
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
            Login with Google
          </button>

          <p className="mt-4 font-semibold text-center">
            Dont'have an account?{" "}
            <Link
              to="/auth/register"
              className="link link-hover font-semibold text-red-500"
            >
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
