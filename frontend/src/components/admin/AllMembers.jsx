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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const AllMembers = () => {
  useGetAllUsers();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { users = [] } = useSelector((state) => state.user.allUsers || {});

  const deleteMemberHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${USER_API_END_POINT}/delete-member/${id}`,
        {
          withCredentials: true,
        }
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />
      <div className="flex justify-between items-center p-4 md:p-6">
        <h1 className="text-2xl font-bold text-emerald-800">All Members</h1>
        {user?.role === "Admin" && (
          <Button onClick={() => navigate("/admin/add-employee")}>
            ➕ Add Member
          </Button>
        )}
      </div>

      {visibleUsers.length > 0 ? (
        <ScrollArea className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleUsers.map((member) => (
              <Card
                key={member._id}
                className="rounded-2xl shadow-md border border-emerald-200 transition hover:shadow-lg flex flex-col justify-between min-h-[320px]"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-emerald-700 truncate">
                      {member.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      User ID: {member.userId}
                    </p>
                  </CardHeader>

                  <CardContent className="text-sm space-y-1 text-gray-600 flex-1">
                    <p>
                      <strong className="text-gray-800">Role:</strong>{" "}
                      {member.role}
                    </p>
                    <p>
                      <strong className="text-gray-800">State:</strong>{" "}
                      {member.state}
                    </p>
                    {member.district && (
                      <p>
                        <strong className="text-gray-800">District:</strong>{" "}
                        {member.district}
                      </p>
                    )}
                    {member.taluka && (
                      <p>
                        <strong className="text-gray-800">Taluka:</strong>{" "}
                        {member.taluka}
                      </p>
                    )}
                    {member.village && (
                      <p>
                        <strong className="text-gray-800">Village:</strong>{" "}
                        {member.village}
                      </p>
                    )}
                    <p>
                      <strong className="text-gray-800">Phone:</strong>{" "}
                      {member.phoneNumber}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center pt-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        navigate(`/admin/member-details/${member._id}`)
                      }
                    >
                      Details
                    </Button>

                    {user?.role === "Admin" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm" variant="outline">
                            Actions
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-44 p-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                            onClick={() =>
                              navigate(`/admin/member-update/${member._id}`)
                            }
                          >
                            ✏️ Update Member
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm text-red-600"
                            onClick={() => deleteMemberHandler(member._id)}
                          >
                            🗑️ Delete Member
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">
            No members found.{" "}
            {user?.role === "Admin" && (
              <button
                onClick={() => navigate("/admin/add-employee")}
                className="text-emerald-700 font-semibold underline ml-2"
              >
                Add a member
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
