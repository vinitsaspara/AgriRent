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

const AllMembers = () => {
  useGetAllUsers(); // ✅ call the custom hook to fetch users

  const { users } = useSelector((state) => state.user.allUsers);
  const navigate = useNavigate();

  // ✅ Example: filter all users with role !== 'admin'
  const filteredUsers = users?.filter((user) => user.role !== "Admin");

  return (
    <div>
      <Navbar />
      <div className="flex justify-end p-4">
        <Button
          onClick={() => navigate("/admin/add-employee")}
          className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
        >
          Add Member
        </Button>
      </div>
      <div className="p-4 space-y-4">
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center bg-white shadow rounded-xl p-4"
          >
            <div>
              <p>
                <strong>User ID:</strong> {user.userId}
              </p>
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">More</Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2 space-y-1">
                <Button variant="ghost" className="w-full text-left">
                  Update
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left text-red-500"
                >
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
