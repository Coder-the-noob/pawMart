import React, { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider"; 
import { toast } from "react-hot-toast";
import avatar from "../assets/avatar-placeholder.jpg";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">My Profile</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={user?.photoURL || avatar}
          alt="User"
          className="w-32 h-32 rounded-full object-cover"
        />
        <p className="text-lg font-medium">Name: {user?.displayName}</p>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex mx-auto"
        >
          Update Profile
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Image URL"
            value={formData.photoURL}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
