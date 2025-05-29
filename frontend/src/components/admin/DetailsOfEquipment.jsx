import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";

const DetailsOfEquipment = () => {
  const { id } = useParams();
  const { equipmentList } = useSelector(
    (state) => state.equipment?.allEquipment || {}
  );
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    if (equipmentList) {
      const found = equipmentList.find((eq) => eq._id === id);
      setEquipment(found);
    }
  }, [equipmentList, id]);

  if (!equipment) {
    return <div className="p-6 text-center">Loading equipment details...</div>;
  }

  const removeHandler = async () => {
    try {
      const res = await axios.delete(
        `${EQUIPMENT_API_END_POINT}/delete-equipment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/admin/all-equipment");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("equipment not remove");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex p-3 justify-center mt-10">
        <Card className="w-full max-w-2xl shadow-xl border border-gray-200 p-6 rounded-xl">
          <CardContent>
            {/* Rounded Image */}
            {equipment.image && (
              <div className="flex justify-center mb-6">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md"
                />
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
              {equipment.name}
            </h2>

            {/* Grid Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Detail label="Type" value={equipment.type} />
              <Detail label="Serial Number" value={equipment.serialNumber} />
              <Detail
                label="Rent Per Hour"
                value={`₹${equipment.rentPerHour}`}
              />
              <Detail label="Quantity" value={equipment.quantity} />
              <Detail label="Assigned Role" value={equipment.assignedRole} />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Availability
                </p>
                <Badge
                  className={
                    equipment.availabilityStatus === "Available"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }
                >
                  {equipment.availabilityStatus}
                </Badge>
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-lg">
                {equipment.taluka}, {equipment.district}, {equipment.state}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-base">
                {equipment.description || "No description provided."}
              </p>
            </div>

            {user?.role === "Admin" && (
              <div className="flex items-center justify-center gap-5 mt-5">
                <Button
                  className="cursor-pointer"
                  onClick={() => navigate(`/admin/equipment-update/${id}`)}
                >
                  Update
                </Button>
                <Button className="cursor-pointer" onClick={removeHandler}>
                  Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reusable detail component
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg">{value}</p>
  </div>
);

export default DetailsOfEquipment;
