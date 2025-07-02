import React from "react";
import { useSelector } from "react-redux";
import useGeetAllAssignment from "@/hooks/useGetAllAssignment";
import { useNavigate } from "react-router-dom";

const ProfileHistory = () => {
  useGeetAllAssignment();

  const { allAssignments } = useSelector((state) => state.assignment);
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const navigate = useNavigate();

  const assignedToUser = allAssignments.filter(
    (entry) => entry.assignedTo?._id === userId
  );

  const assignedByUser = allAssignments.filter(
    (entry) => entry.assignedBy?._id === userId
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl h-full w-full">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
        Equipment History
      </h2>

      <div
        className={`grid gap-6 ${
          user?.role === "Admin" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {/* Assigned By You */}
        {user?.role != "Farmer" && (
          <div
            className={`rounded-lg p-4 border bg-yellow-50 border-yellow-200 ${
              user?.role !== "Admin" ? "max-h-[110vh] overflow-y-auto" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">
              Assigned By You
            </h3>
            {assignedByUser.length > 0 ? (
              <ul
                className={`${
                  user?.role === "Admin"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "space-y-3"
                }`}
              >
                {assignedByUser.map((item) => (
                  <li
                    onClick={() =>
                      navigate(
                        `/admin/equipment-details/${item.equipment?._id}`
                      )
                    }
                    key={item._id}
                    className="bg-white cursor-pointer rounded-lg p-4 border border-yellow-300 shadow-sm"
                  >
                    <p className="font-bold text-yellow-900">
                      {item.equipment?.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Assigned To: {item.assignedTo?.fullName} (
                      {item.assignedTo?.userId})
                    </p>
                    <p className="text-sm text-gray-600">
                      Assigned At: {new Date(item.assignedAt).toLocaleString()}
                    </p>
                    {item.returnedAt && (
                      <p className="text-sm text-gray-600">
                        Returned At:{" "}
                        {new Date(item.returnedAt).toLocaleString()}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No records found.</p>
            )}
          </div>
        )}

        {/* Assigned To You - only show if not Admin */}
        {user?.role !== "Admin" && (
          <div
            className={`rounded-lg p-4 border bg-yellow-50 border-yellow-200 ${
              user?.role !== "Farmer" ? "max-h-[110vh] overflow-y-auto" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Assigned To You
            </h3>
            {assignedToUser.length > 0 ? (
              <ul className="space-y-3">
                {assignedToUser.map((item) => (
                  <li
                    onClick={() =>
                      navigate(
                        `/admin/equipment-details/${item.equipment?._id}`
                      )
                    }
                    key={item._id}
                    className="bg-white cursor-pointer rounded-lg p-4 border border-emerald-300 shadow-sm"
                  >
                    <p className="font-bold text-emerald-900">
                      {item.equipment?.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Assigned By: {item.assignedBy?.fullName} (
                      {item.assignedBy?.userId})
                    </p>
                    <p className="text-sm text-gray-600">
                      Assigned At: {new Date(item.assignedAt).toLocaleString()}
                    </p>
                    {item.returnedAt && (
                      <p className="text-sm text-gray-600">
                        Returned At:{" "}
                        {new Date(item.returnedAt).toLocaleString()}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No records found.</p>
            )}
          </div>
        )}
      </div>

      {/* Summary Count */}
      <div className="flex justify-between items-center mt-6 px-2">
        {user?.role !== "Farmer" && (
          <p className="text-sm font-medium text-yellow-900">
            Total Assigned By You: {assignedByUser.length}
          </p>
        )}
        {user?.role !== "Admin" && (
          <p className="text-sm font-medium text-emerald-900">
            Total Assigned To You: {assignedToUser.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHistory;
