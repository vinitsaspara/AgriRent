import axios from "axios";
import React, { useState } from "react";
import { ASSIGNMENT_API_END_POINT } from "../../utils/constant"; 

const UserHistory = () => {
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get(
      `${ASSIGNMENT_API_END_POINT}  /history-user/${userId}`
    );
    setHistory(res.data.history);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">User Assignment History</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter userId"
        className="border p-2 w-full my-2"
      />
      <button
        onClick={fetchHistory}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Get History
      </button>

      <ul className="mt-4 space-y-2">
        {history.map((item) => (
          <li key={item._id} className="border p-2 rounded">
            Equipment: {item.equipment?.name || item.equipment} <br />
            Assigned By: {item.assignedBy?.name} <br />
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

export default UserHistory;
