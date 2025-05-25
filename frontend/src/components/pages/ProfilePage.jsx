import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { setUser } from "@/redux/slices/userSlice";
import { Navbar } from "./Navbar"; // Assuming Navbar is in the same directory

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
        profilePicture: user.profilePicture || "", // Default to a placeholder if not available
      });
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <p className="text-xl text-emerald-800 mb-6">Please log in to view your profile.</p>
            <button
              onClick={() => navigate("/login")}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );

  const handleChange = (e) => {
// ... existing code ...
  };

  const handleSave = async () => {
// ... existing code ...
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-800">
            User Profile
          </h1>

          <div className="flex flex-col items-center space-y-6 mb-8">
            <img
              src={formData.profilePicture || 'https://via.placeholder.com/150'} // Fallback placeholder image
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-emerald-200"
            />
            {editMode && (
              <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="Profile picture URL"
                className="appearance-none rounded-md relative block w-full max-w-sm px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
              />
            )}
          </div>

          <div className="space-y-6">
            {[ 
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email", disabled: true },
              { label: "Address", name: "address", type: "text" },
              { label: "Age", name: "age", type: "number", min: 0 },
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-emerald-700">
                  {field.label}
                </label>
                {editMode ? (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={field.disabled}
                    min={field.min}
                    className="mt-1 appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 text-lg bg-emerald-50 p-3 rounded-md shadow-sm">{formData[field.name]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-emerald-700">Role</label>
              <p className="mt-1 text-gray-900 text-lg bg-emerald-50 p-3 rounded-md shadow-sm">{user.role}</p>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-6">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                  className="group relative flex justify-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="group relative flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;