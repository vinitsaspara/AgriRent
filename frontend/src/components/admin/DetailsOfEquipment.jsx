import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { setUser } from "@/redux/slices/userSlice";

const DetailsOfEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { allEquipment } = useSelector((state) => state.equipment);
  const assignedEquipmentIds =
    user?.AssignedEquipment?.map((equipment) => equipment?._id.toString()) ||
    [];

  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    const found = (allEquipment || []).find((eq) => eq._id === id);
    setEquipment(found);
  }, [allEquipment, id]);

  const removeHandler = async () => {
    try {
      const res = await axios.delete(
        `${EQUIPMENT_API_END_POINT}/delete-equipment/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/admin/all-equipment");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove equipment");
    }
  };

  const isAssigned = assignedEquipmentIds.includes(id.toString());
  const statusLabel = isAssigned ? "Available" : "Assigned";
  const statusColor = isAssigned
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  if (!equipment) {
    return (
      <div className="p-6 text-center text-lg">
        Loading equipment details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar />
      <div className="flex justify-center p-4 mt-10">
        <Card className="w-full max-w-3xl border border-emerald-300 p-8 rounded-3xl bg-white shadow-lg">
          <CardContent>
            {equipment.image && (
              <div className="flex justify-center mb-6">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-48 h-48 object-cover rounded-2xl border-4 border-emerald-500 shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-center text-emerald-700 mb-4">
              {equipment.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Detail label="Category" value={equipment.category} />
              <Detail label="Serial Number" value={equipment.serialNumber} />
              <Detail label="Rent / Hour" value={`₹${equipment.rentPerHour}`} />
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`text-sm mt-2 inline-block px-3 py-1 rounded-full ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-600 font-medium mb-2">Descriptions</h3>
              <div className="space-y-2">
                <DescriptionBlock
                  label="English"
                  text={equipment.descriptionEnglish}
                />
                <DescriptionBlock
                  label="Gujarati"
                  text={equipment.descriptionGujarati}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {isAssigned && (
                <Button
                  className="w-full"
                  onClick={() => navigate(`/admin/equipment-update/${id}`)}
                >
                  ✏️ Update
                </Button>
              )}
              <Button
                className="w-full"
                variant="destructive"
                onClick={removeHandler}
              >
                🗑️ Remove
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="w-full"
                onClick={() => navigate(`/assign-equipment/${id}`)}
              >
                📦 Assign Equipment
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.role !== "Admin" && (
                <Button
                  className="w-full"
                  onClick={() => navigate(`/return-equipment/${id}`)}
                >
                  🔁 Return Equipment
                </Button>
              )}
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => navigate(`/history-equipment/${id}`)}
              >
                📜 View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base">{value}</p>
  </div>
);

const DescriptionBlock = ({ label, text }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base">{text || "No description provided."}</p>
  </div>
);

export default DetailsOfEquipment;
