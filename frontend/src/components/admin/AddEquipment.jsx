/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import { Navbar } from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import toast from "react-hot-toast";

const AddEquipment = () => {
  useGetAllUsers();
  const allUsers = useSelector((state) => state.user.allUsers || {});
  const users = allUsers.users || [];
  const filteredUsers = users?.filter((user) => user.role !== "Admin");
  const navigate = useNavigate();

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
    availabilityStatus: "Available",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) data.append("file", image);

    try {
      const res = await axios.post(`${EQUIPMENT_API_END_POINT}/add-equipment`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

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
      setLoading(false);
    }
  };

  const inputClass =
    "appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow duration-300 hover:shadow-md";
  const selectClass = `${inputClass} bg-white`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-emerald-800">Add New Equipment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Equipment Name" className={inputClass} required />
              <select name="type" value={formData.type} onChange={handleChange} className={selectClass} required>
                <option value="">Select Equipment Type</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Plough">Plough</option>
                <option value="Seeder">Seeder</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Other">Other</option>
              </select>
              <input name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" className={inputClass} required />
              <input type="number" name="rentPerHour" value={formData.rentPerHour} onChange={handleChange} placeholder="Rent Per Hour (₹)" className={inputClass} required min="0" />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className={inputClass} required />
              <input name="district" value={formData.district} onChange={handleChange} placeholder="District" className={inputClass} required />
              <input name="taluka" value={formData.taluka} onChange={handleChange} placeholder="Taluka" className={inputClass} required />
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className={inputClass} required min="1" />
              <select name="currentAssignedTo" value={formData.currentAssignedTo} onChange={handleChange} className={selectClass} required>
                <option value="">Assign to User (ID)</option>
                {filteredUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.userId} ({user.role})
                  </option>
                ))}
              </select>
              <select name="assignedRole" value={formData.assignedRole} onChange={handleChange} className={selectClass} required>
                <option value="">Select Assigned Role</option>
                <option value="Admin">Admin</option>
                <option value="StateEmployee">State Employee</option>
                <option value="DistrictEmployee">District Employee</option>
                <option value="TalukaEmployee">Taluka Employee</option>
                <option value="Farmer">Farmer</option>
              </select>
              <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} className={selectClass} required>
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="Rented">Rented</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (include features, condition, etc.)"
              className={`${inputClass} min-h-[100px] resize-none`}
              required
            />

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-emerald-700 mb-1">
                Equipment Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${inputClass} p-2.5`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              }`}
            >
              {loading ? "Adding..." : "Add Equipment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipment;
