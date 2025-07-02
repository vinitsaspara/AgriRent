import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [completedPayments, setCompletedPayments] = useState([]);
  const navigate = useNavigate();

  const { allAssignments } = useSelector((state) => state.assignment);
  const { user } = useSelector((state) => state.user);

  const userId = user?._id;

  const calculateHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;
    return Math.max(diffMs / (1000 * 60 * 60), 0);
  };

  const calculateAmount = (assignment) => {
    if (!assignment?.assignedAt || !assignment?.returnedAt) return 0;
    const hours = calculateHours(assignment.assignedAt, assignment.returnedAt);
    const rate = assignment?.equipment?.rentPerHour || 0;
    return Math.round(hours * rate);
  };

  useEffect(() => {
    const userAssignments = allAssignments.filter(
      (a) => a?.assignedTo?._id === userId
    );

    const pending = userAssignments.filter((a) => !a.payment);
    const completed = userAssignments.filter((a) => a.payment);

    setPendingPayments(pending);
    setCompletedPayments(completed);
  }, [allAssignments, userId]);

  const totalPendingAmount = pendingPayments.reduce(
    (sum, a) => sum + calculateAmount(a),
    0
  );

  const handleCompleteAllPending = async () => {
    try {
      const ids = pendingPayments.map((p) => p._id);

      console.log(ids);

      // Assuming your backend can handle multiple IDs
      const res = await axios.patch(
        `${ASSIGNMENT_API_END_POINT}/complete-payment`,
        {
          assignmentIds: ids,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/all-equipment");
      }

      // Move all to completed
      setCompletedPayments((prev) => [
        ...prev,
        ...pendingPayments.map((p) => ({ ...p, payment: true })),
      ]);
      setPendingPayments([]);
    } catch (err) {
      toast.error(res.data.message);
      console.error("Bulk payment failed", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pending Payments */}

      <div className="bg-red-50 p-6 rounded-xl shadow-md border border-red-200">
        <h3 className="text-xl font-semibold text-red-700 mb-4">
          Pending Payments
        </h3>

        {pendingPayments.length === 0 ? (
          <p className="text-gray-600">No pending payments.</p>
        ) : (
          <>
            {/* Scrollable List */}
            <div className="max-h-[400px] overflow-y-auto pr-2">
              <ul className="space-y-4">
                {pendingPayments.map((assignment) => (
                  <li
                    key={assignment._id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <p>
                      <span className="font-medium text-gray-700">
                        Equipment:
                      </span>{" "}
                      {assignment?.equipment?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">From:</span>{" "}
                      {new Date(assignment.assignedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">To:</span>{" "}
                      {new Date(assignment.returnedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Amount:</span>{" "}
                      ₹{calculateAmount(assignment)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-right font-semibold text-red-800">
              Total: ₹{totalPendingAmount}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleCompleteAllPending}
                className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Pay ₹{totalPendingAmount} Now
              </button>
            </div>
          </>
        )}
      </div>

      {/* Completed Payments */}
      <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          Completed Payments
        </h3>

        {completedPayments.length === 0 ? (
          <p className="text-gray-600">No completed payments.</p>
        ) : (
          <>
            <div className="max-h-[400px] overflow-y-auto pr-2">
              <ul className="space-y-4">
                {completedPayments.map((assignment) => (
                  <li
                    key={assignment._id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <p>
                      <span className="font-medium text-gray-700">
                        Equipment:
                      </span>{" "}
                      {assignment?.equipment?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">From:</span>{" "}
                      {new Date(assignment.assignedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">To:</span>{" "}
                      {new Date(assignment.returnedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Amount:</span>{" "}
                      ₹{calculateAmount(assignment)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-right font-semibold text-green-800">
              Total: ₹
              {completedPayments.reduce(
                (sum, a) => sum + calculateAmount(a),
                0
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
