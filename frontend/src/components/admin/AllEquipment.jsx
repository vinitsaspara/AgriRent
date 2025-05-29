import React from "react";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import userGetAllEquipment from "@/hooks/userGetAllEquipment";
import { useSelector } from "react-redux";

const AllEquipment = () => {
  userGetAllEquipment();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  

  const { equipmentList } = useSelector(
    (state) => state.equipment?.allEquipment || {}
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex justify-end p-4 md:p-6">
        {user && user.role === "Admin" && (
          <Button
            onClick={() => navigate("/admin/add-equipment")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Add Equipment
          </Button>
        )}
      </div>

      {equipmentList && equipmentList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6">
          {equipmentList.map((item) => (
            <div
              key={item._id} // Use item._id for a more stable key
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-emerald-200 hover:border-emerald-400"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-5 space-y-3">
                <h2
                  className="text-xl font-bold text-emerald-800 truncate"
                  title={item.name}
                >
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Type:{" "}
                  <span className="font-medium text-gray-800">{item.type}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Rent per Hour:{" "}
                  <span className="font-semibold text-emerald-700">
                    ₹{item.rentPerHour}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Availability:{" "}
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                      item.availabilityStatus === "Available"
                        ? "bg-green-100 text-green-700"
                        : item.availabilityStatus === "Rented"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.availabilityStatus === "Maintenance"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.availabilityStatus}
                  </span>
                </p>
                <Button
                  onClick={() =>
                    navigate(`/admin/equipment-details/${item._id}`)
                  }
                  className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">
            No equipment found.{" "}
            <button
              onClick={() => navigate("/admin/add-equipment")}
              className="text-emerald-600 hover:underline font-semibold"
            >
              Add some!
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AllEquipment;
