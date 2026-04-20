import React from "react";

const PreviewSection = ({ formData }) => {
  return (
    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Payment:</strong> {formData.payment}</p>
      </div>
    </div>
  );
};

export default PreviewSection;