import axios from "axios";
import React, { useState } from "react";
import { ASSIGNMENT_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useGetAllEquipment from "@/hooks/userGetAllEquipment";

const ReturnEquipment = () => {
  useGetAllEquipment();

  const { assignedEquipmentList } = useSelector(
    (state) => state.equipment.allAssignedEquipment
  );
  const navigate = useNavigate();

  const { equipmentId } = useParams();

  const assignment = assignedEquipmentList.find(
    (eq) => eq.equipment === equipmentId
  );
  const assignmentId = assignment?._id;

  // console.log(assignmentId);

  const [formData, setFormData] = useState({
    assignedTo: "",
    assignedBy: "",
    equipmentId,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReturn = async () => {
    const { assignedTo, assignedBy, equipmentId } = formData;

    if (!assignedTo.trim() || !assignedBy.trim()) {
      toast.error("Please enter both Assigned To and Assigned By user IDs.");
      return;
    }

    if (!assignmentId) {
      toast.error("Assignment not found for this equipment.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${ASSIGNMENT_API_END_POINT}/mark-returned/${assignmentId}`,
        formData,
        { withCredentials: true }
      );
      // console.log(res.data);

      if (res.data.success) {
        navigate("/admin/all-equipment");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while returning equipment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Mark Equipment as Returned</h2>

      <label htmlFor="assignedTo" className="block font-medium mb-1">
        Assigned To (User ID):
      </label>
      <input
        id="assignedTo"
        name="assignedTo"
        type="text"
        value={formData.assignedTo}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter Assigned To user ID"
      />

      <label htmlFor="assignedBy" className="block font-medium mb-1">
        Assigned By (User ID):
      </label>
      <input
        id="assignedBy"
        name="assignedBy"
        type="text"
        value={formData.assignedBy}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter Assigned By user ID"
      />

      <button
        onClick={handleReturn}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Processing..." : "Return Equipment"}
      </button>
    </div>
  );
};

export default ReturnEquipment;
