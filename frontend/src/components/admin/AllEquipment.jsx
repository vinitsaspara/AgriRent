import React, { useState } from "react";
import { Navbar } from "../pages/Navbar";
import useGetAllEquipment from "@/hooks/userGetAllEquipment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AllEquipment = () => {
  useGetAllEquipment();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { allEquipment } = useSelector((state) => state.equipment);

  const assignedEquipmentIds =
    user?.AssignedEquipment?.map((equipment) => equipment?._id.toString()) ||
    [];

  // console.log("AssignedEquipmentIds" + assignedEquipmentIds );

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(allEquipment.map((item) => item.category))];

  const filteredEquipment = selectedCategory
    ? allEquipment.filter((item) => item.category === selectedCategory)
    : allEquipment;

  // console.log(filteredEquipment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />

      {user?.role === "Admin" && (
        <div className="flex justify-end px-4 mt-2">
          <Button
            onClick={() => navigate("/admin/add-equipment")}
            className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white"
          >
            ➕ Add Equipment
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 px-4 mt-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full border text-sm ${
            selectedCategory === null
              ? "bg-emerald-600 text-white"
              : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategory === category
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((item) => {
            const isAvailable = assignedEquipmentIds.includes(
              item._id.toString()
            );
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md border border-emerald-200 overflow-hidden flex flex-col h-[400px] hover:shadow-emerald-400/40 transition-shadow duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 p-5 space-y-3">
                  <div>
                    <h2
                      className="text-lg font-semibold text-emerald-800 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-700">
                      Rent:{" "}
                      <span className="font-bold text-emerald-700">
                        ₹{item.rentPerHour}/hr
                      </span>
                    </p>
                    <p
                      className={`text-sm font-medium mt-2 inline-block px-3 py-1 rounded-full ${
                        isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {isAvailable ? "Available" : "Assigned"}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/admin/equipment-details/${item._id}`)
                    }
                    className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No equipment available.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEquipment;
