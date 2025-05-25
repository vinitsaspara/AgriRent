import React from "react";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import userGetAllEquipment from "@/hooks/userGetAllEquipment";
import { useSelector } from "react-redux";

const AllEquipment = () => {
  userGetAllEquipment();

  const navigate = useNavigate();

  const { equipmentList } = useSelector(
    (state) => state.equipment?.allEquipment || {}
  );

  return (
    <div>
      <Navbar />
      <div className="flex justify-end p-4">
        <Button
          onClick={() => navigate("/admin/add-equipment")}
          className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
        >
          Add Equipment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {equipmentList?.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">Type: {item.type}</p>
              <p className="text-sm text-gray-600">
                Rent per Hour: ₹{item.rentPerHour}
              </p>
              <p className="text-sm text-gray-600">
                Availability:{" "}
                <span
                  className={
                    item.availabilityStatus === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.availabilityStatus}
                </span>
              </p>
              <Button
                onClick={() => navigate(`/admin/equipment-details/${item._id}`)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white w-full"
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEquipment;
