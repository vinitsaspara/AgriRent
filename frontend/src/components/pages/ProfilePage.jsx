import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <p className="text-xl text-emerald-800 mb-6">
              Please log in to view your profile.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="py-3 px-6 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md font-semibold transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">
            Profile Information
          </h2>

          {/* Profile Picture */}
          {user.profilePicture && (
            <div className="flex justify-center mb-6">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-emerald-300 shadow-md"
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Full Name
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.fullname}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Email
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Address
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.address}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Age
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.age}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Phone Number
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.phoneNumber}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-700">
                Role
              </label>
              <p className="mt-1 text-gray-800 bg-emerald-50 p-3 rounded-md">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
