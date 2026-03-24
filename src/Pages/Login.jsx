import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineSparkles } from "react-icons/hi2";
import petLogo from "../assets/pawmart_logo.png";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const [demoAvatar, setDemoAvatar] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState(""); // "user" | "admin" | ""

  // ✅ Correct ImageBB domain (i.ibb.co)
  const DEMO_USER = {
    email: "demo@pawmart.com",
    password: "Demo@1234",
    avatar:
      "https://i.ibb.co/wZPMz3HN/christina-wocintechchat-com-0-Zx1b-Dv5-BNY-unsplash.jpg",
    label: "Demo User",
    key: "user",
  };

  const DEMO_ADMIN = {
    email: "admin@pawmart.com",
    password: "Admin@1234",
    avatar:
      "https://i.ibb.co/7xF2g4J6/darshan-patel-QJEVpydul-Gs-unsplash.jpg",
    label: "Demo Admin",
    key: "admin",
  };

  // ✅ CLEAN redirect (NO location.state → prevents modal/overlay bug)
  const goDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

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
      goDashboard();
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
      goDashboard();
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demo) => {
    setForm({ email: demo.email, password: demo.password });
    setDemoAvatar({ src: demo.avatar, label: demo.label });
    setSelectedDemo(demo.key);
    toast.success(`${demo.label} credentials loaded`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-base-100 border border-base-300 shadow-sm">
            <img src={petLogo} alt="PawMart" className="w-12 h-12" />
          </div>

          <h1 className="text-3xl font-extrabold mt-3 text-base-content">
            Welcome back
          </h1>
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
              className={`btn rounded-xl ${
                selectedDemo === "user" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => fillDemo(DEMO_USER)}
              disabled={loading}
            >
              <HiOutlineSparkles className="text-lg" />
              Demo User
            </button>

            <button
              type="button"
              className={`btn rounded-xl ${
                selectedDemo === "admin" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => fillDemo(DEMO_ADMIN)}
              disabled={loading}
            >
              <HiOutlineSparkles className="text-lg" />
              Demo Admin
            </button>
          </div>

          {/* Avatar Preview */}
          {demoAvatar && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-base-200 border border-base-300">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-base-300 bg-base-100">
                <img
                  src={demoAvatar.src}
                  alt="demo avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.ibb.co/9GZ8f5Z/avatar-placeholder.png";
                  }}
                />
              </div>

              <div className="flex-1">
                <p className="font-extrabold text-base-content">
                  {demoAvatar.label}
                </p>
                <p className="text-xs text-base-content/60">
                  Demo account selected — click Login
                </p>
              </div>

              <span className="badge badge-success rounded-xl">Ready</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-base-content/80">
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                className="input input-bordered rounded-xl w-full focus:ring-2 focus:ring-primary/40"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-base-content/80">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered rounded-xl w-full pr-11 focus:ring-2 focus:ring-primary/40"
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

              <div className="flex justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded-xl w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="divider text-sm text-base-content/60">or</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline rounded-xl w-full"
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center text-sm font-semibold mt-3 text-base-content">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="text-primary hover:underline">
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
