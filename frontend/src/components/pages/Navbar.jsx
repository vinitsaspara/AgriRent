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
    <nav className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div
            onClick={() => navigate("/")}
            className="text-white hover:text-emerald-300 text-xl font-bold cursor-pointer transition-colors duration-300 flex items-center"
          >
            <span className="mr-2">🌱</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">AgriRent</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className="text-emerald-100 hover:text-white hover:underline decoration-emerald-400 underline-offset-4 font-medium transition-all duration-300"
            >
              Home
            </a>
            
            {/* Admin Navigation */}
            {user?.role === "Admin" && (
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => navigate("/admin/all-employee")}
                  className="text-emerald-100 hover:text-white hover:underline decoration-emerald-400 underline-offset-4 font-medium transition-all duration-300"
                >
                  Employees
                </button>
                <button
                  onClick={() => navigate("/admin/all-equipment")}
                  className="text-emerald-100 hover:text-white hover:underline decoration-emerald-400 underline-offset-4 font-medium transition-all duration-300"
                >
                  Equipment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Auth */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <a 
                href="/login" 
                className="text-emerald-100 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-700/50"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/user/profile/" + user.userId)}
                className="text-emerald-100 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-700/50 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-emerald-100 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-700/50 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}