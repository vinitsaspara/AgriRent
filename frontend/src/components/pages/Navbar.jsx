/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "@/utils/constant.js";

export function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      console.log(res);

      dispatch(setUser(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo and Home + AllEmployee */}
        <div className="flex items-center space-x-6">
          <div
            onClick={() => navigate("/")}
            className="text-white hover:cursor-pointer text-lg font-semibold"
          >
            AgriRent
          </div>
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>

          {/* AllEmployee & AllEquipment only if Admin */}
          {user?.role === "Admin" && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => navigate("/admin/all-employee")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                AllEmployee
              </button>
              <button
                onClick={() => navigate("/admin/all-equipment")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                AllEquipment
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Auth */}
        <div className="flex items-center space-x-6">
          {!user ? (
            <>
              <a href="/login" className="text-gray-300 hover:text-white">
                Login
              </a>
              <a href="/signup" className="text-gray-300 hover:text-white">
                Signup
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/user/profile/" + user.userId)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
