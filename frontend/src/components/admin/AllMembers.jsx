import React from "react";
import { useSelector } from "react-redux";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Navbar } from "../pages/Navbar";
import { useNavigate } from "react-router-dom";

const AllMembers = () => {
  useGetAllUsers();

  const { users } = useSelector((state) => state.user.allUsers || {}); // default empty object
  const navigate = useNavigate();

  const filteredUsers = users?.filter((user) => user.role !== "Admin");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex justify-between items-center p-4 md:p-6">
        <h1 className="text-2xl font-bold text-emerald-800">All Members</h1>
        <Button
          onClick={() => navigate("/admin/add-employee")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Add Member
        </Button>
      </div>

      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-emerald-200 hover:border-emerald-400 p-5 space-y-3"
            >
              <div>
                <p className="text-sm text-gray-500">
                  User ID:{" "}
                  <span className="font-medium text-emerald-700">{user.userId}</span>
                </p>
                <h3
                  className="text-lg font-semibold text-emerald-800 truncate"
                  title={user.fullName}
                >
                  {user.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  Role:{" "}
                  <span className="font-medium text-gray-800">{user.role}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Phone:{" "}
                  <span className="font-medium text-gray-800">{user.phoneNumber}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Age:{" "}
                  <span className="font-medium text-gray-800">{user.age}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Address:{" "}
                  <span className="font-medium text-gray-800">{user.address}</span>
                </p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500"
                  >
                    Actions
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 space-y-1 bg-white rounded-md shadow-lg border border-emerald-200">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-sm text-emerald-700 hover:bg-emerald-50"
                    // onClick={() => navigate(`/admin/update-member/${user._id}`)}
                  >
                    Update Member
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-sm text-red-600 hover:bg-red-50"
                    // onClick={() => handleDeleteMember(user._id)}
                  >
                    Delete Member
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">
            No members found.{" "}
            <button
              onClick={() => navigate("/admin/add-employee")}
              className="text-emerald-600 hover:underline font-semibold"
            >
              Add a member!
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
