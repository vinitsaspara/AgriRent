import axios from "axios";
import React, { useState } from "react";
import { ASSIGNMENT_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

const AssignEquipment = () => {
  const { user } = useSelector((state) => state.user);
  const { equipmentId } = useParams();

  const loggedInUserId = user.userId;
  const dispatch = useDispatch();

  // console.log(equipmentId);

  const [assignedTo, setAssignedTo] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAssign = async () => {
    try {
      const res = await axios.post(
        `${ASSIGNMENT_API_END_POINT}/create-assignment/${equipmentId}`,
        {
          assignedTo,
          assignedBy: loggedInUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res.data);

      if (res.data.success) {
        navigate("/admin/all-equipment");
        dispatch(setUser(res.data.user));
        toast.sucess(res.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error assigning");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md mx-auto my-4">
      <h2 className="text-lg font-bold mb-2">Assign Equipment</h2>
      <input
        type="text"
        placeholder="Assigned To (userId)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Assign
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default AssignEquipment;
