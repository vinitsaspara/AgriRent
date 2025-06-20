import React, { useState } from "react";
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
    if (!user) return [];
    switch (user.role) {
      case "Admin":
        return users.filter((u) => u._id !== user._id);
      case "State Employee":
        return users.filter(
          (u) =>
            u.state === user.state &&
            ["District Employee", "Taluka Employee", "Farmer"].includes(u.role)
        );
      case "District Employee":
        return users.filter(
          (u) =>
            u.state === user.state &&
            u.district === user.district &&
            ["Taluka Employee", "Farmer"].includes(u.role)
        );
      case "Taluka Employee":
        return users.filter(
          (u) =>
            u.state === user.state &&
            u.district === user.district &&
            u.taluka === user.taluka &&
            u.role === "Farmer"
        );
      default:
        return [];
    }
  };

  const visibleUsers = getVisibleUsers();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = visibleUsers.filter((member) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      member.userId.toLowerCase().includes(lowerSearch) ||
      member.fullName.toLowerCase().includes(lowerSearch) ||
      member.state?.toLowerCase().includes(lowerSearch) ||
      member.district?.toLowerCase().includes(lowerSearch) ||
      member.taluka?.toLowerCase().includes(lowerSearch) ||
      member.village?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      <div className="flex justify-between items-center px-6 pt-6">
        <h1 className="text-3xl font-bold text-emerald-800">All Members</h1>
        {user?.role === "Admin" && (
          <Button onClick={() => navigate("/admin/add-employee")}>
            ➕ Add Member
          </Button>
        )}
      </div>

      <div className="px-6 mt-4 text-center">
        <input
          type="text"
          placeholder="Search by ID, name, state, district, village..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
      </div>

      {filteredUsers.length > 0 ? (
        <ScrollArea className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((member) => (
              <Card
                key={member._id}
                className="flex flex-col justify-between h-full rounded-2xl border border-emerald-200 shadow-sm hover:shadow-lg transition duration-300"
              >
                <CardHeader>
                  <h3 className="text-lg font-semibold text-emerald-700 truncate">
                    {member.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {member.userId}</p>
                </CardHeader>

                <CardContent className="text-sm text-gray-600 space-y-1 flex-grow">
                  <p>
                    <strong>Role:</strong> {member.role}
                  </p>
                  <p>
                    <strong>State:</strong> {member.state}
                  </p>
                  {member.district && (
                    <p>
                      <strong>District:</strong> {member.district}
                    </p>
                  )}
                  {member.taluka && (
                    <p>
                      <strong>Taluka:</strong> {member.taluka}
                    </p>
                  )}
                  {member.village && (
                    <p>
                      <strong>Village:</strong> {member.village}
                    </p>
                  )}
                  <p>
                    <strong>Phone:</strong> {member.phoneNumber}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center mt-auto border-t pt-2">
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
                          ✏️ Update
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm text-red-600"
                          onClick={() => deleteMemberHandler(member._id)}
                        >
                          🗑️ Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p>No members found.</p>
          {user?.role === "Admin" && (
            <button
              onClick={() => navigate("/admin/add-employee")}
              className="text-emerald-700 font-semibold underline mt-2"
            >
              Add a member
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllMembers;
