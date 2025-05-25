import React, { useState } from "react";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import { Navbar } from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllUsers from "@/hooks/useGetAllUsers";

const AddEquipment = () => {
  useGetAllUsers(); // ✅ call the custom hook to fetch users

  const { users } = useSelector((state) => state.user.allUsers);
  const navigate = useNavigate();

  // ✅ Example: filter all users with role !== 'admin'
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
    availabilityStatus: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(res);
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="p-4 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add Equipment</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="Serial Number"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="rentPerHour"
            value={formData.rentPerHour}
            onChange={handleChange}
            placeholder="Rent Per Hour"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="taluka"
            value={formData.taluka}
            onChange={handleChange}
            placeholder="Taluka"
            className="border px-3 py-2 rounded"
            required
          />
          <div className="max-h-40 cursor-pointer overflow-y-auto border px-3 py-2 rounded">
            <select
              name="currentAssignedTo"
              value={formData.currentAssignedTo}
              onChange={handleChange}
              className="w-full"
              required
            >
              <option value="">Select User ID</option>
              {filteredUsers?.map((user) => (
                <option  key={user._id} value={user._id}>
                  {user.userId}
                </option>
              ))}
            </select>
          </div>

          <input
            name="assignedRole"
            value={formData.assignedRole}
            onChange={handleChange}
            placeholder="Assigned Role"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            placeholder="Availability Status"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={()=>navigate("/admin/all-equipment")}
          >
            Add Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
