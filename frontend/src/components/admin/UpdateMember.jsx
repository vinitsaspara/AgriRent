import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navbar } from "../pages/Navbar";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    if (!userId || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/update-member/${id}`,
        { userId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Updated successfully");
      navigate("/admin/all-employee");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Member
          </h2>

          <label className="block mb-2 text-sm font-medium">User ID</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            //   onClick={()=>navigate("/admin/all-employee")}
          >
            Update Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
