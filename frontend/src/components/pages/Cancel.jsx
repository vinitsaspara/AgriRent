import React from "react";
import { XCircle } from "lucide-react";
import { Navbar } from "./Navbar";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-white shadow-xl p-8 rounded-2xl flex flex-col items-center gap-4">
          <XCircle className="text-red-500 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-red-600">
            Payment Cancelled
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Your payment was not completed. If this was a mistake, you can try
            again from the pending payments section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
