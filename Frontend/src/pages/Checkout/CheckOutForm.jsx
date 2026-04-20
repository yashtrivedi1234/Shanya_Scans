import React from "react";
import StepIndicator from "./StepIndicator";

const CheckoutForm = ({ step, nextStep, prevStep, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Login with Email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Date & Address</h2>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 pr-6">
      <StepIndicator step={step} />
      {renderStep()}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {step < 4 && (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
        {step === 4 && (
          <button
            onClick={() => alert("Order Placed!")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;