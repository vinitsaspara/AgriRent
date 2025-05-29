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
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";

const AllMembers = () => {
  useGetAllUsers();

  const { user } = useSelector((state) => state.user);
  const { users = [] } = useSelector((state) => state.user.allUsers || {});
  const navigate = useNavigate();

  const deleteMemberHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${USER_API_END_POINT}/delete-member/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete member");
    }
  };

  // Filter users based on current user's role
  const getVisibleUsers = () => {
    switch (user?.role) {
      case "Admin":
        return users.filter((u) => u.role !== "Admin");
      case "State Employee":
        return users.filter(
          (u) =>
            u.role === "District Employee" ||
            u.role === "Taluka Employee" ||
            u.role === "Farmer"
        );
      case "District Employee":
        return users.filter(
          (u) => u.role === "Taluka Employee" || u.role === "Farmer"
        );
      case "Taluka Employee":
        return users.filter((u) => u.role === "Farmer");
      default:
        return [];
    }
  };

  const visibleUsers = getVisibleUsers();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex justify-between items-center p-4 md:p-6">
        <h1 className="text-2xl font-bold text-emerald-800">All Members</h1>

        {user && user.role === "Admin" && (
          <Button
            onClick={() => navigate("/admin/add-employee")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Add Member
          </Button>
        )}
      </div>

      {visibleUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
          {visibleUsers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-emerald-200 hover:border-emerald-400 p-5 space-y-3"
            >
              <div>
                <p className="text-sm text-gray-500">
                  User ID:{" "}
                  <span className="font-medium text-emerald-700">
                    {member.userId}
                  </span>
                </p>
                <h3
                  className="text-lg font-semibold text-emerald-800 truncate"
                  title={member.fullName}
                >
                  {member.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  Role:{" "}
                  <span className="font-medium text-gray-800">
                    {member.role}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Phone:{" "}
                  <span className="font-medium text-gray-800">
                    {member.phoneNumber}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Age:{" "}
                  <span className="font-medium text-gray-800">
                    {member.age}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Address:{" "}
                  <span className="font-medium text-gray-800">
                    {member.address}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-5">
                {user?.role === "Admin" && (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="mt-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500"
                        >
                          Actions
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-2 space-y-1 bg-white rounded-md shadow-lg border border-emerald-200">
                        <Button
                          variant="ghost"
                          className="w-full text-left text-sm text-emerald-700 hover:bg-emerald-50"
                          onClick={() =>
                            navigate(`/admin/member-update/${member._id}`)
                          }
                        >
                          Update Member
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-left text-sm text-red-600 hover:bg-red-50"
                          onClick={() => deleteMemberHandler(member._id)}
                        >
                          Delete Member
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                <Button
                  className="mt-3 cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/member-details/${member._id}`)
                  }
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">
            No members found.{" "}
            {user?.role === "Admin" && (
              <button
                onClick={() => navigate("/admin/add-employee")}
                className="text-emerald-600 hover:underline font-semibold"
              >
                Add a member!
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
