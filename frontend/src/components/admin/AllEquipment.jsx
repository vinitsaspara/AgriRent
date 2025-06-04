import React, { useState } from "react";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import userGetAllEquipment from "@/hooks/userGetAllEquipment";
import { useSelector } from "react-redux";

const AllEquipment = () => {
  userGetAllEquipment();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const equipmentList =
    useSelector((state) => state.equipment?.allEquipment?.equipmentList) || [];

  const categoryTranslations = {
    Tractor: "ટ્રેક્ટર",
    Harvester: "કાપણી મશીન",
    Plough: "હલ",
    Seeder: "બીજ વાવનાર",
    Sprayer: "છાંટક યંત્ર",
    Cultivator: "નિંદામણ યંત્ર",
    Rotavator: "રોટાવેટર",
    Baler: "ઘાસ બેલ મશીન",
    "Power Tiller": "પાવર ટિલર",
    Transplanter: "રોપણ યંત્ર",
    Mulcher: "ખેતરની ઘાસ યંત્ર",
    "Laser Leveler": "લેસર લેવલર",
    "Post Hole Digger": "ખાડો ખોદનાર",
    "Fertilizer Spreader": "ખાતર છાંટનાર",
    Thresher: "થ્રેશર",
    Other: "અન્ય",
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(equipmentList.map((item) => item.category))];

  const filteredEquipment = selectedCategory
    ? equipmentList.filter((item) => item.category === selectedCategory)
    : equipmentList;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex justify-between items-center px-4 md:px-6 pt-4">
        {user?.role === "Admin" && (
          <Button
            onClick={() => navigate("/admin/add-equipment")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Add Equipment
          </Button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 px-4 md:px-6 mt-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm rounded-full cursor-pointer border ${
            selectedCategory === null
              ? "bg-emerald-600 text-white cursor-pointer"
              : "bg-white text-emerald-700  border-emerald-300 hover:bg-emerald-100 cursor-pointer"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm rounded-full border ${
              selectedCategory === category
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            <h3 className="text-lg font-bold text-emerald-700">
              {`${category} (${categoryTranslations[category] || "અજ્ઞાત"})`}
            </h3>
          </button>
        ))}
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((item) => (
            <div
              key={item._id}
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
                  Category:{" "}
                  <span className="font-medium text-gray-800">
                    {item.category}
                  </span>
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
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rented"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Maintenance"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <Button
                  onClick={() =>
                    navigate(`/admin/equipment-details/${item._id}`)
                  }
                  className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
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
