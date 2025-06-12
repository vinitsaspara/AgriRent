import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../pages/Navbar";
import toast from "react-hot-toast";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";

const availabilityOptions = [
  "Available",
  "Assigned",
  "Rented",
  "Under Maintenance",
];

const UpdateEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const equipmentList = user.AssignedEquipment || [];

  const [formData, setFormData] = useState({
    descriptionEnglish: "",
    descriptionGujarat: "",
    rentPerHour: "",
    status: "Available",
    file: "",
  });

  let equipment;
  useEffect(() => {
    if (equipmentList.length && id) {
      equipment = equipmentList.find((eq) => eq?.equipmentId?._id === id);
      console.log("Equipment found:", equipment);
      
      if (equipment) {
        setFormData({
          descriptionEnglish: equipment?.equipmentId?.descriptionEnglish || "",
          descriptionGujarat: equipment?.equipmentId?.descriptionGujarat || "",
          rentPerHour: equipment?.equipmentId?.rentPerHour || "",
          status: equipment?.equipmentId?.status || "Available",
          file: "",
        });
      }
    }
  }, [equipmentList, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("descriptionEnglish", formData.descriptionEnglish);
    data.append("descriptionGujarat", formData.descriptionGujarat);
    data.append("rentPerHour", formData.rentPerHour);
    data.append("status", formData.status);

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const res = await axios.post(
        `${EQUIPMENT_API_END_POINT}/update-equipment/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/admin/all-equipment");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Update Equipment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="descriptionEnglish"
              placeholder="descriptionEnglish"
              value={formData.descriptionEnglish}
              onChange={handleChange}
              className="w-full p-2 border rounded h-40"
              required
            />
            <textarea
              name="descriptionGujarat"
              placeholder="descriptionGujarat"
              value={formData.descriptionGujarat}
              onChange={handleChange}
              className="w-full p-2 border rounded h-40"
              required
            />
            <input
              type="number"
              name="rentPerHour"
              placeholder="Rent Per Hour"
              value={formData.rentPerHour}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              {availabilityOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Update Equipment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEquipment;
