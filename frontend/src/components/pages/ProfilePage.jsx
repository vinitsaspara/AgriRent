import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Button } from "../ui/button";
import ProfileHistory from "./ProfileHistory";
import PaymentPage from "./PaymentPage";

const ProfilePage = () => {
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

      <div className="flex-grow flex flex-col lg:flex-row gap-6 px-6 py-12">
        {/* Left Panel - Profile Info */}
        <div className="w-full lg:h-[130vh] lg:w-1/3 bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
            Profile Information
          </h2>

          {user.profilePicture && (
            <div className="flex justify-center mb-6">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-300 shadow-md"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Full Name
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.fullName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Email
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.email}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Address
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.address}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Age
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.age}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Phone Number
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.phoneNumber}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-700">
                Role
              </label>
              <p className="bg-emerald-50 p-2 rounded-md text-gray-800">
                {user.role}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={() => navigate("/user/update-profile")}>
              Update Profile
            </Button>
          </div>
        </div>

        {/* Right Panel - Payment and History */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Top - PaymentPage */}
          {user?.role === "Farmer" && (
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <PaymentPage />
            </div>
          )}

          {/* Bottom - ProfileHistory */}
          <div>
            <ProfileHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
