import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../pages/Navbar";

// ... existing code ...
export function Signup() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    address: "",
    age: "",
    phoneNumber: "",
    role: "Farmer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(res.data.success);
      

      if(res.data.success){
        navigate("/admin/all-employee");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-800">
            {user ? "Add Member" : "Sign Up for AgriRent"}
          </h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={formData.userId}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />
            <input
              type="email"
              name="email"
              placeholder="example@abc.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md resize-none"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
            />

            {user?.role === "Admin" && (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
              >
                <option value="">Select Role</option>
                <option value="State Employee">State Employee</option>
                <option value="District Employee">District Employee</option>
                <option value="Taluka employee">Taluka Employee</option>
                <option value="Farmer">Farmer</option>
              </select>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium cursor-pointer rounded-md text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed "
                  : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              }`}
            >
              {user ? "Add Member" : "Sign Up"}
            </button>
          </form>
          {
            !user && <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline"
            >
              Sign in here
            </a>
          </p>
          }
        </div>
      </div>
    </div>
  );
}

export default Signup;
