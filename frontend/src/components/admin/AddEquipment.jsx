import React, { useState } from "react";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import { Navbar } from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddEquipment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    description: "",
    rentPerHour: "",
    status: "Available",
    category: "",
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
      const res = await axios.post(
        `${EQUIPMENT_API_END_POINT}/add-equipment`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
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
      toast.error(
        err.response?.data?.message || "Server error, please try again."
      );
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
          <h2 className="text-center text-3xl font-extrabold text-emerald-800">
            Add New Equipment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Equipment Name"
                className={inputClass}
                required
              />
              <input
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Serial Number"
                className={inputClass}
                required
              />
              <input
                type="number"
                name="rentPerHour"
                value={formData.rentPerHour}
                onChange={handleChange}
                placeholder="Rent Per Hour (₹)"
                className={inputClass}
                required
                min="0"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option value="">Select Category / શ્રેણી પસંદ કરો</option>
                <option value="Tractor">Tractor / ટ્રેક્ટર</option>
                <option value="Harvester">Harvester / કાપણી મશીન</option>
                <option value="Plough">Plough / હલ</option>
                <option value="Seeder">Seeder / બીજ વાવનાર</option>
                <option value="Sprayer">Sprayer / છાંટક યંત્ર</option>
                <option value="Cultivator">Cultivator / નિંદામણ યંત્ર</option>
                <option value="Rotavator">Rotavator / રોટાવેટર</option>
                <option value="Baler">Baler / ઘાસ બેલ મશીન</option>
                <option value="Power Tiller">Power Tiller / પાવર ટિલર</option>
                <option value="Transplanter">Transplanter / રોપણ યંત્ર</option>
                <option value="Mulcher">Mulcher / ખેતરની ઘાસ યંત્ર</option>
                <option value="Laser Leveler">
                  Laser Leveler / લેસર લેવલર
                </option>
                <option value="Post Hole Digger">
                  Post Hole Digger / ખાડો ખોદનાર
                </option>
                <option value="Fertilizer Spreader">
                  Fertilizer Spreader / ખાતર છાંટનાર
                </option>
                <option value="Thresher">Thresher / થ્રેશર</option>
                <option value="Other">Other / અન્ય</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option value="Available">Available / ઉપલબ્ધ</option>
                <option value="Assigned">Assigned / ફાળવેલ</option>
                <option value="Rented">Rented / ભાડે આપેલું</option>
                <option value="Maintenance">Maintenance / મરામત હેઠળ</option>
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
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-emerald-700 mb-1"
              >
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
