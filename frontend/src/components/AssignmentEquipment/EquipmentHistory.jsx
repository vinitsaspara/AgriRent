// src/components/EquipmentHistory.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ASSIGNMENT_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EquipmentHistory = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user);
  const { equipmentId } = useParams(); // Get equipmentId from route

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `${ASSIGNMENT_API_END_POINT}/history-equipment/${equipmentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setHistory(res.data.history);
    } catch (error) {
      console.error("Error fetching history", error);
    }
  };

  useEffect(() => {
    if (equipmentId) {
      fetchHistory();
    }
  }, [equipmentId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Equipment Assignment History</h2>
      <ul className="mt-4 space-y-2">
        {history.map((item) => (
          <li key={item._id} className="border p-2 rounded">
            Assigned To: {item.assignedTo?.fullName || "Unknown"} <br />
            Assigned By: {item.assignedBy?.fullName || "Unknown"} <br />
            Assigned At: {new Date(item.assignedAt).toLocaleString()} <br />
            Returned At:{" "}
            {item.returnedAt
              ? new Date(item.returnedAt).toLocaleString()
              : "Not Returned"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentHistory;
