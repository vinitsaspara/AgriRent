import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { setUser } from "@/redux/slices/userSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    age: "",
    phoneNumber: "",
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        address: user.address || "",
        age: user.age || "",
        phoneNumber: user.phoneNumber || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  if (!user)
    return (
      <div className="text-center mt-10">
        <p>Please log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Assuming PUT /update-user-profile updates current user data
      const res = await axios.put(
        `${USER_API_END_POINT}/update-user-profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.updatedUser)); // update redux user state
        toast.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("Error updating profile.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      <div className="flex flex-col items-center space-y-4 mb-6">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        {editMode && (
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder="Profile picture URL"
            className="border px-3 py-2 rounded w-full max-w-sm"
          />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          ) : (
            <p>{formData.fullName}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              disabled // Usually you don't allow email editing without extra verification
            />
          ) : (
            <p>{formData.email}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          {editMode ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          ) : (
            <p>{formData.address}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Age</label>
          {editMode ? (
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              min={0}
            />
          ) : (
            <p>{formData.age}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Phone Number</label>
          {editMode ? (
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          ) : (
            <p>{formData.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Role</label>
          <p>{user.role}</p> {/* Usually role is not editable */}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {editMode ? (
          <>
            <button
              onClick={() => setEditMode(false)}
              disabled={loading}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
