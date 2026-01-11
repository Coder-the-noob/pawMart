import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import avatar from "../assets/avatar-placeholder.jpg";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  // Keep form updated if user info changes (after reload/login)
  useEffect(() => {
    setFormData({
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
  }, [user]);

  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Name is required.";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim()))
      e.name = "Name can only contain letters and spaces.";

    if (!formData.photoURL.trim()) e.photoURL = "Photo URL is required.";
    else if (!/^https?:\/\/.+/i.test(formData.photoURL.trim()))
      e.photoURL = "Enter a valid image URL (http/https).";

    return e;
  };

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (saving) return;

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setSaving(true);
    try {
      // Your provider signature: (name, photoURL)
      await updateUserProfile(formData.name.trim(), formData.photoURL.trim());
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setErrors({});
    setFormData({
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-[70vh] bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-base-300 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                My Profile
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                Manage your name and profile photo.
              </p>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary rounded-xl"
              >
                Edit
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Profile Summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-base-300 bg-base-200 overflow-hidden">
                <img
                  src={user?.photoURL || avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-extrabold">
                  {user?.displayName || "Unnamed User"}
                </p>
                <p className="text-sm text-base-content/70 mt-1">
                  {user?.email || "No email found"}
                </p>

                <div className="mt-3 inline-flex items-center gap-2">
                  <span className="badge badge-outline rounded-xl">
                    Account
                  </span>
                  <span className="text-xs text-base-content/60">
                    Keep your profile updated.
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <form onSubmit={handleUpdate} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text text-sm font-semibold text-base-content/70">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input input-bordered rounded-xl w-full ${
                        errors.name ? "input-error" : ""
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-error">{errors.name}</p>
                    )}
                  </div>

                  {/* Photo URL */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text text-sm font-semibold text-base-content/70">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="photoURL"
                      placeholder="https://..."
                      value={formData.photoURL}
                      onChange={handleChange}
                      className={`input input-bordered rounded-xl w-full ${
                        errors.photoURL ? "input-error" : ""
                      }`}
                      required
                    />
                    {errors.photoURL && (
                      <p className="mt-1 text-sm text-error">
                        {errors.photoURL}
                      </p>
                    )}
                  </div>
                </div>

                {/* Live Preview */}
                <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
                  <p className="text-xs font-semibold text-base-content/60">
                    Preview
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-base-300 bg-base-100">
                      <img
                        src={formData.photoURL || avatar}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{formData.name || "Your name"}</p>
                      <p className="text-sm text-base-content/70">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-xl flex-1"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-outline rounded-xl flex-1"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="text-xs text-base-content/60 text-center mt-4">
          PawMart • Profile settings
        </p>
      </div>
    </div>
  );
};

export default Profile;
