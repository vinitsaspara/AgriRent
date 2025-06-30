import useGetAllEquipment from "@/hooks/userGetAllEquipment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";

const AllEquipment = () => {
  useGetAllEquipment();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { allEquipment } = useSelector((state) => state.equipment);
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(10000); // current slider position
  const [appliedRent, setAppliedRent] = useState(10000); // used for filtering

  const assignedEquipmentIds =
    user?.AssignedEquipment?.map((equipment) => equipment?._id.toString()) ||
    [];

  // console.log("AssignedEquipmentIds" + assignedEquipmentIds );

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(allEquipment.map((item) => item.category))];
  const maxAvailableRent = Math.max(
    ...allEquipment.map((e) => e.rentPerHour || 0),
    0
  );

  const filteredEquipment = allEquipment
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .filter((item) => {
      const search = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(search) ||
        item.serialNumber?.toLowerCase().includes(search) ||
        item.status?.toLowerCase().includes(search)
      );
    })
    .filter((item) => item.rentPerHour <= appliedRent);

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

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-6 mt-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, serial number, status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        {/* 🎚️ Slider Filter */}
        <div className="px-6 mt-4 w-full md:w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Max Rent: ₹{sliderValue}
          </label>
          <input
            type="range"
            min={0}
            max={maxAvailableRent}
            step={50}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-[25vw] h-2 mr-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
          />
          <Button
            onClick={() => setAppliedRent(sliderValue)}
            className="mt-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2"
          >
            Apply Rent Filter
          </Button>
        </div>
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
