import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  ASSIGNMENT_API_END_POINT,
  STRIPE_PUBLISHABLE_KEY,
} from "@/utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { setAssignmentIds } from "@/redux/slices/paymentSlice";
import { Button } from "@/components/ui/button"; // optional if using shadcn/ui

const PaymentPage = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [completedPayments, setCompletedPayments] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAssignments } = useSelector((state) => state.assignment);
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  // ✅ Calculate duration in hours
  const calculateHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;
    return Math.max(diffMs / (1000 * 60 * 60), 0);
  };

  // ✅ Calculate amount = hours * rentPerHour
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

  const allReturned = pendingPayments.every(
    (a) => a.returnedAt !== null && a.returnedAt !== undefined
  );

  const handleCompleteAllPending = async () => {
    if (!allReturned) {
      toast.error("Please return all equipment before proceeding to payment.");
      return;
    }

    const ids = pendingPayments.map((p) => p._id);
    dispatch(setAssignmentIds(ids));
    const stripe = await loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);

    try {
      const res = await axios.post(
        `${ASSIGNMENT_API_END_POINT}/complete-payment`,
        { assignmentIds: ids }
      );

      if (res.data.success) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.id,
        });

        if (result.error) {
          toast.error(result.error.message);
        }
      }
    } catch (err) {
      console.error("Stripe session creation failed", err);
      toast.error(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Payment Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Payments */}
        <div className="bg-white p-6 rounded-xl shadow border border-red-100">
          <h3 className="text-xl font-semibold text-red-700 mb-4">
            Pending Payments
          </h3>

          {pendingPayments.length === 0 ? (
            <p className="text-gray-500">You're all caught up!</p>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                <ul className="space-y-4">
                  {pendingPayments.map((assignment) => (
                    <li
                      key={assignment._id}
                      className="bg-red-50 p-4 rounded-lg border"
                    >
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {assignment?.equipment?.name}
                      </p>
                      <p>
                        <strong>From:</strong>{" "}
                        {new Date(assignment.assignedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>To:</strong>{" "}
                        {new Date(assignment.returnedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Amount:</strong> ₹{calculateAmount(assignment)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-right text-lg font-semibold text-red-800">
                Total: ₹{totalPendingAmount}
              </div>

              <div className="mt-4 text-center">
                {!allReturned && (
                  <p className="text-sm text-red-500 mb-2">
                    Please return all equipment before proceeding to payment.
                  </p>
                )}

                <button
                  onClick={handleCompleteAllPending}
                  disabled={!allReturned}
                  className={`px-6 py-2 rounded-md text-white cursor-pointer font-medium transition ${
                    allReturned
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Pay ₹{totalPendingAmount} Now
                </button>
              </div>
            </>
          )}
        </div>

        {/* Completed Payments */}
        <div className="bg-white p-6 rounded-xl shadow border border-green-100">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Completed Payments
          </h3>

          {completedPayments.length === 0 ? (
            <p className="text-gray-500">No payments completed yet.</p>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                <ul className="space-y-4">
                  {completedPayments.map((assignment) => (
                    <li
                      key={assignment._id}
                      className="bg-green-50 p-4 rounded-lg border"
                    >
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {assignment?.equipment?.name}
                      </p>
                      <p>
                        <strong>From:</strong>{" "}
                        {new Date(assignment.assignedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>To:</strong>{" "}
                        {new Date(assignment.returnedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Amount:</strong> ₹{calculateAmount(assignment)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-right text-lg font-semibold text-green-800">
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
    </div>
  );
};

export default PaymentPage;
