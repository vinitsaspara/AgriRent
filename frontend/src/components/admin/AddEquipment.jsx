/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import { Navbar } from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllUsers from "@/hooks/useGetAllUsers";

import toast from 'react-hot-toast'; // Added toast import

const AddEquipment = () => {
  useGetAllUsers(); 

  const allUsers = useSelector((state) => state.user.allUsers || {});
  const users = allUsers.users || [];
  const navigate = useNavigate();
  const filteredUsers = users?.filter((user) => user.role !== "Admin");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    description: "",
    rentPerHour: "",
    state: "",
    district: "",
    taluka: "",
    currentAssignedTo: "",
    assignedRole: "",
    availabilityStatus: "Available", // Default to 'Available'
    quantity: "",
  });

  const [image, setImage] = useState(null);
  // const [message, setMessage] = useState(""); // Replaced with toast notifications
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
// ... existing code ...
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append("file", image);
    }

    try {
      const res = await axios.post(
        `${EQUIPMENT_API_END_POINT}/add-equipment`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Equipment added successfully!");
        navigate("/admin/all-equipment");
      } else {
        toast.error(res.data.message || "Failed to add equipment.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error, please try again.");
      console.error("Add equipment error:", err);
    } finally {
      setLoading(false); // Set loading false
    }
  };

  const inputClass = "appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm transition-shadow duration-300 ease-in-out hover:shadow-md";
  const selectClass = `${inputClass} bg-white`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-800">
            Add New Equipment
          </h2>
          {/* {message && <p className={`mb-4 text-center p-3 rounded-md ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>} */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Equipment Name" className={inputClass} required />
              <input name="type" value={formData.type} onChange={handleChange} placeholder="Equipment Type (e.g., Tractor, Plow)" className={inputClass} required />
              <input name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" className={inputClass} required />
              <input type="number" name="rentPerHour" value={formData.rentPerHour} onChange={handleChange} placeholder="Rent Per Hour (₹)" className={inputClass} required min="0" />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className={inputClass} required />
              <input name="district" value={formData.district} onChange={handleChange} placeholder="District" className={inputClass} required />
              <input name="taluka" value={formData.taluka} onChange={handleChange} placeholder="Taluka" className={inputClass} required />
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className={inputClass} required min="1"/>
              
              <select name="currentAssignedTo" value={formData.currentAssignedTo} onChange={handleChange} className={selectClass} required>
                <option value="">Assign to User (ID)</option>
                {filteredUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.userId} ({user.role})
                  </option>
                ))}
              </select>

              <input name="assignedRole" value={formData.assignedRole} onChange={handleChange} placeholder="Assigned Role (e.g., State Level)" className={inputClass} required />
              
              <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} className={selectClass} required>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Under Maintenance</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description (include features, condition, etc.)" className={`${inputClass} min-h-[100px] resize-none`} required />
            
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-emerald-700 mb-1">Equipment Image</label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`${inputClass} p-2.5`} required />
            </div>

            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'}`}
            >
              {loading ? 'Adding...' : 'Add Equipment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipment;


