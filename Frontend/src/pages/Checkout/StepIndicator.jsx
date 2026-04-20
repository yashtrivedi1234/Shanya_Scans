import React from "react";

const StepIndicator = ({ step }) => {
  const steps = ["Login", "Details", "Address", "Payment"];

  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step > index ? "bg-blue-500" : "bg-gray-300"
            } text-white`}
          >
            {index + 1}
          </div>
          <span className="ml-2">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;