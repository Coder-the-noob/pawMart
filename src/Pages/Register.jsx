// ✅ Register.jsx (PawMart UI + photo requirement + validation + demo + Google)
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import petLogo from "../assets/pawmart_logo.png";

const Register = () => {
  const { createUser, setUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    // Name
    if (!form.name.trim()) e.name = "Name is required.";
    else if (!/^[a-zA-Z\s]+$/.test(form.name.trim()))
      e.name = "Name can only contain letters and spaces.";

    // Photo requirement (✅ must have photo)
    if (!form.photo.trim()) e.photo = "Photo URL is required.";
    else if (!/^https?:\/\/.+/i.test(form.photo.trim()))
      e.photo = "Enter a valid photo URL (must start with http/https).";

    // Email
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email.trim()))
      e.email = "Enter a valid email.";

    // Password
    if (!form.password) e.password = "Password is required.";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        form.password
      )
    ) {
      e.password =
        "Min 8 chars + uppercase + lowercase + number + special character.";
    }

    return e;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setLoading(true);
    try {
      const result = await createUser(form.email.trim(), form.password);
      const loggedUser = result.user;

      try {
        await updateUserProfile({
          displayName: form.name.trim(),
          photoURL: form.photo.trim(),
        });
        setUser({
          ...loggedUser,
          displayName: form.name.trim(),
          photoURL: form.photo.trim(),
        });
      } catch {
        setUser(loggedUser);
      }

      toast.success("User registered successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      setUser(result.user);
      toast.success("Logged in with Google successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed: " + (error.code || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <img
            src={petLogo}
            alt="PawMart"
            className="mx-auto w-16 h-16 object-contain"
          />
          <h1 className="text-3xl font-extrabold tracking-tight mt-3">
            Create your account
          </h1>
          <p className="text-base-content/70 mt-2">
            Join PawMart and start exploring listings.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Name
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered rounded-xl w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name}</p>
              )}
            </div>

            {/* Photo URL (Required) + preview */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Photo URL (required)
                </span>
              </label>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-base-200 border border-base-300 overflow-hidden flex items-center justify-center">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-base-content/50 text-xs">Photo</span>
                  )}
                </div>

                <input
                  type="url"
                  className={`input input-bordered rounded-xl w-full ${
                    errors.photo ? "input-error" : ""
                  }`}
                  placeholder="https://..."
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                />
              </div>

              {errors.photo && (
                <p className="mt-1 text-sm text-error">{errors.photo}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Email
                </span>
              </label>
              <input
                type="email"
                className={`input input-bordered rounded-xl w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered rounded-xl w-full pr-11 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password ? (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              ) : (
                <p className="mt-1 text-xs text-base-content/60">
                  Must include uppercase, lowercase, number, and special character.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded-xl w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Creating...
                </span>
              ) : (
                "Register"
              )}
            </button>

            <div className="divider text-sm text-base-content/60">or</div>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="btn btn-outline rounded-xl w-full"
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="mt-3 font-semibold text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="link link-hover text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>

        <p className="text-xs text-base-content/60 text-center mt-4">
          PawMart • Secure registration • Protected data
        </p>
      </div>
    </div>
  );
};

export default Register;
