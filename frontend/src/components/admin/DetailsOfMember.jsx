import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../pages/Navbar";

const DetailsOfMember = () => {
  const { users } = useSelector((state) => state.user.allUsers || {});
  const { id } = useParams(); // Destructure userId correctly

  const user = users?.find((user) => user._id === id); // Find single user

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <p className="text-xl text-gray-600">User not found.</p>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <img
          src={user.profilePicture}
          alt={`${user.fullName}'s profile`}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-emerald-400"
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.fullName}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{user.role}</p>
          <div className="text-sm text-gray-700 space-y-2 text-left">
            <p><strong>User ID:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DetailsOfMember;
