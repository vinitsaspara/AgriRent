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

  const { equipmentList } = useSelector(
    (state) => state.equipment?.allEquipment || {}
  );

  const [formData, setFormData] = useState({
    description: "",
    rentPerHour: "",
    quantity: "",
    state: "",
    district: "",
    taluka: "",
    availabilityStatus: "Available",
    file: "",
  });

  useEffect(() => {
    if (equipmentList.length && id) {
      const equipment = equipmentList.find((eq) => eq._id === id);
      if (equipment) {
        setFormData({
          description: equipment.description || "",
          rentPerHour: equipment.rentPerHour || "",
          quantity: equipment.quantity || "",
          state: equipment.state || "",
          district: equipment.district || "",
          taluka: equipment.taluka || "",
          availabilityStatus: equipment.availabilityStatus || "Available",
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
    data.append("description", formData.description);
    data.append("rentPerHour", formData.rentPerHour);
    data.append("quantity", formData.quantity);
    data.append("state", formData.state);
    data.append("district", formData.district);
    data.append("taluka", formData.taluka);
    data.append("availabilityStatus", formData.availabilityStatus);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Update Equipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="rentPerHour"
            placeholder="Rent Per Hour"
            value={formData.rentPerHour}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="taluka"
            placeholder="Taluka"
            value={formData.taluka}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
  );
};

export default UpdateEquipment;
