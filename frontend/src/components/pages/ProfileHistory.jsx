import React from "react";
import { useSelector } from "react-redux";
import useGeetAllAssignment from "@/hooks/useGetAllAssignment";

const ProfileHistory = () => {
  useGeetAllAssignment();

  const { allAssignments } = useSelector((state) => state.assignment);
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assigned By You */}
        <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 max-h-[110vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">
            Assigned By You
          </h3>
          {assignedByUser.length > 0 ? (
            <ul className="space-y-3">
              {assignedByUser.map((item) => (
                <li
                  key={item._id}
                  className="bg-white rounded-lg p-4 border border-yellow-300 shadow-sm"
                >
                  <p className="font-bold text-yellow-900">
                    {item.equipment?.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Assigned To: {item.assignedTo?.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Assigned At: {new Date(item.assignedAt).toLocaleString()}
                  </p>
                  {item.returnedAt && (
                    <p className="text-sm text-gray-600">
                      Returned At: {new Date(item.returnedAt).toLocaleString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No records found.</p>
          )}
        </div>

        {/* Assigned To You */}
        <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50 max-h-[110vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Assigned To You
          </h3>
          {assignedToUser.length > 0 ? (
            <ul className="space-y-3">
              {assignedToUser.map((item) => (
                <li
                  key={item._id}
                  className="bg-white rounded-lg p-4 border border-emerald-300 shadow-sm"
                >
                  <p className="font-bold text-emerald-900">
                    {item.equipment?.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Assigned By: {item.assignedBy?.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Assigned At: {new Date(item.assignedAt).toLocaleString()}
                  </p>
                  {item.returnedAt && (
                    <p className="text-sm text-gray-600">
                      Returned At: {new Date(item.returnedAt).toLocaleString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No records found.</p>
          )}
        </div>
      </div>

      {/* Summary Count */}
      <div className="flex justify-between items-center mt-6 px-2">
        <p className="text-sm font-medium text-yellow-900">
          Total Assigned By You: {assignedByUser.length}
        </p>
        <p className="text-sm font-medium text-emerald-900">
          Total Assigned To You: {assignedToUser.length}
        </p>
      </div>
    </div>
  );
};

export default ProfileHistory;
