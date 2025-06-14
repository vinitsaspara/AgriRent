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
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { allEquipment } = useSelector((state) => state.equipment);
  const assignedEquipmentIds =
    user?.AssignedEquipment?.map((item) => item.equipmentId._id) || [];

  // console.log("Assigned Equipment IDs:", assignedEquipmentIds);
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

  const isAssigned = assignedEquipmentIds.includes(id);

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
      <div className="flex p-4 justify-center mt-10">
        <Card className="w-full max-w-2xl shadow-md border border-emerald-200 p-6 rounded-2xl bg-white">
          <CardContent>
            {equipment.image && (
              <div className="flex justify-center mb-6">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-36 h-36 object-cover rounded-full border-4 border-emerald-500 shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-center text-emerald-700">
              {equipment.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Detail label="Category" value={equipment.category} />
              <Detail label="Serial Number" value={equipment.serialNumber} />
              <Detail label="Rent / Hour" value={`₹${equipment.rentPerHour}`} />
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p
                  className={`text-sm font-medium mt-2 inline-block px-3 py-1 rounded-full ${
                    isAssigned
                    ?"bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {isAssigned ? "Available" : "Assigned"}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-600 font-medium mb-1">Descriptions</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">English</p>
                  <p className="text-base">
                    {equipment.descriptionEnglish || "No description provided."}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gujarati</p>
                  <p className="text-base">
                    {equipment.descriptionGujarati ||
                      "No description provided."}
                  </p>
                </div>
              </div>
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
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <Button onClick={() => navigate(`/history-equipment/${id}`)}>
                View History
              </Button>
              {isAssigned ? (
                <div className="flex gap-2">
                  <Button onClick={() => navigate(`/assign-equipment/${id}`)}>
                    Assign Equipment
                  </Button>
                  <Button onClick={() => navigate(`/return-equipment/${id}`)}>
                    Return Equipment
                  </Button>
                </div>
              ) : (
                ""
              )}
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

export default DetailsOfEquipment;
