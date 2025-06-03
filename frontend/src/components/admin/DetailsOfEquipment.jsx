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
import useGetAllAssignedEquipment from "@/hooks/useGetAllAssignedEquipment";

const DetailsOfEquipment = () => {
  useGetAllAssignedEquipment();

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
    return (
      <div className="p-6 text-center text-lg">
        Loading equipment details...
      </div>
    );
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
      console.error(error);
      toast.error("Failed to remove equipment");
    }
  };

  const badgeColor =
    {
      Available: "bg-green-600",
      Assigned: "bg-yellow-600",
      Rented: "bg-blue-600",
      "Under Maintenance": "bg-red-600",
    }[equipment.availabilityStatus] || "bg-gray-500";

  return (
    <div>
      <Navbar />
      <div className="flex p-4 justify-center mt-10">
        <Card className="w-full max-w-2xl shadow-lg border border-gray-200 p-6 rounded-2xl">
          <CardContent>
            {equipment.image && (
              <div className="flex justify-center mb-6">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              {equipment.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Detail label="Category" value={equipment.category} />
              <Detail label="Type" value={equipment.type} />
              <Detail label="Serial Number" value={equipment.serialNumber} />
              <Detail label="Rent / Hour" value={`₹${equipment.rentPerHour}`} />
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge className={badgeColor}>{equipment.status}</Badge>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-base">
                {equipment.description || "No description provided."}
              </p>
            </div>

            {user?.role === "Admin" && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button
                  onClick={() => navigate(`/admin/equipment-update/${id}`)}
                >
                  Update
                </Button>
                <Button variant="destructive" onClick={removeHandler}>
                  Remove
                </Button>
                <Button onClick={() => navigate(`/assign-equipment/${id}`)}>
                  Assign Equipment
                </Button>
                <Button onClick={() => navigate(`/history-equipment/${id}`)}>
                  View History
                </Button>
                <Button onClick={() => navigate(`/return-equipment/${id}`)}>
                  Return Equipment
                </Button>
              </div>
            )}
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

export default DetailsOfEquipment;
