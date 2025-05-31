import axios from "axios";
import React, { useState } from "react";
import { ASSIGNMENT_API_END_POINT } from "../../utils/constant";

const ReturnEquipment = ({ assignmentId }) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [message, setMessage] = useState("");
console.log(assignmentId, "assignmentId in ReturnEquipment");
  const handleReturn = async () => {
    if (!assignedTo.trim() || !assignedBy.trim()) {
      setMessage("Please enter both Assigned To and Assigned By IDs.");
      return;
    }

    try {
      const res = await axios.post(
        `${ASSIGNMENT_API_END_POINT}/mark-returned/${assignmentId}`,
        
        { assignedTo, assignedBy },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error returning");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md mx-auto my-4">
      <h2 className="text-lg font-bold mb-2">Mark as Returned</h2>

      <label className="block mb-2 font-medium" htmlFor="assignedTo">
        Assigned To (User ID):
      </label>
      <input
        id="assignedTo"
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Assigned To"
        className="border p-2 rounded w-full mb-4"
      />

      <label className="block mb-2 font-medium" htmlFor="assignedBy">
        Assigned By (User ID):
      </label>
      <input
        id="assignedBy"
        type="text"
        value={assignedBy}
        onChange={(e) => setAssignedBy(e.target.value)}
        placeholder="Assigned By"
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={handleReturn}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Return Equipment
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default ReturnEquipment;
