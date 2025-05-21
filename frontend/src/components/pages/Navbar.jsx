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
    console.log("dfsdf");
    
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );
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
        {/* Left Side - Logo and Home */}
        <div className="flex items-center space-x-6">
          <div onClick={()=>navigate("/")} className="text-white hover:cursor-pointer text-lg font-semibold">AgriRent</div>
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>
        </div>

        {/* Right Side - Auth / Admin Actions */}
        <div className="flex items-center space-x-6">
          {!user && (
            <>
              <a href="/login" className="text-gray-300 hover:text-white">
                Login
              </a>
              <a href="/signup" className="text-gray-300 hover:text-white">
                Signup
              </a>
            </>
          )}

          {user && (
            <>
              {user?.role === "Admin" && (
                <a
                  href="/add-employee"
                  className="text-gray-300 hover:text-white"
                >
                  Add Employee
                </a>
              )}
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
