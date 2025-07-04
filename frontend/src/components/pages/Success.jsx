import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const { assignmentIds } = useSelector((state) => state.payment);
  const [loading, setLoading] = useState(true);

  const markCompletePayment = async () => {
    try {
      const res = await axios.patch(
        `${ASSIGNMENT_API_END_POINT}/mark-payment-completed`,
        { assignmentIds }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to mark payment as completed");
      }
    } catch (error) {
      toast.error("Server error");
      console.error("Payment completion error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (assignmentIds && assignmentIds.length > 0) {
      markCompletePayment();
    }
  }, [assignmentIds]);

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-24 px-4">
        {loading ? (
          <div className="animate-pulse text-center text-gray-600 text-xl">
            Verifying your payment...
          </div>
        ) : (
          <div className="bg-white shadow-xl p-8 rounded-2xl flex flex-col items-center gap-4">
            <CheckCircle2 className="text-green-500 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-green-600">
              Payment Successful!
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              Your transaction has been completed and your equipment payment is
              now marked.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
