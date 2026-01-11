import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import petLogo from "../assets/pawmart_logo.png";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [demoAvatar, setDemoAvatar] = useState(null);

  const DEMO_USER = {
    email: "demo@pawmart.com",
    password: "Demo@1234",
    avatar: "https://i.ibb.co.com/wZPMz3HN/christina-wocintechchat-com-0-Zx1b-Dv5-BNY-unsplash.jpg",
    label: "Demo User",
  };

  const DEMO_ADMIN = {
    email: "admin@pawmart.com",
    password: "Admin@1234",
    avatar: "https://i.ibb.co.com/7xF2g4J6/darshan-patel-QJEVpydul-Gs-unsplash.jpg",
    label: "Demo Admin",
  };

  const goNext = () => navigate(`${location.state || "/"}`);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await logIn(form.email, form.password);
      toast.success("Logged in successfully");
      goNext();
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google successfully");
      goNext();
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Autofill demo + avatar
  const fillDemo = (demo) => {
    setForm({
      email: demo.email,
      password: demo.password,
    });
    setDemoAvatar({
      src: demo.avatar,
      label: demo.label,
    });
    toast.success(`${demo.label} credentials loaded`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <img src={petLogo} alt="PawMart" className="mx-auto w-16 h-16" />
          <h1 className="text-3xl font-extrabold mt-3">Welcome back</h1>
          <p className="text-base-content/70 mt-1">
            Login to continue to PawMart
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6">
          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              className="btn btn-outline rounded-xl"
              onClick={() => fillDemo(DEMO_USER)}
            >
              Demo User
            </button>
            <button
              type="button"
              className="btn btn-outline rounded-xl"
              onClick={() => fillDemo(DEMO_ADMIN)}
            >
              Demo Admin
            </button>
          </div>

          {/* Avatar Preview */}
          {demoAvatar && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-base-200 border border-base-300">
              <img
                src={demoAvatar.src}
                alt="demo avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{demoAvatar.label}</p>
                <p className="text-xs text-base-content/60">
                  Demo account selected
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered rounded-xl w-full"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered rounded-xl w-full pr-11"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded-xl w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider text-sm">or</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline rounded-xl w-full"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center text-sm font-semibold mt-3">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="text-primary link">
                Register
              </Link>
            </p>
          </form>
        </div>

        <p className="text-xs text-center text-base-content/60 mt-4">
          PawMart • Demo powered • Secure authentication
        </p>
      </div>
    </div>
  );
};

export default Login;
