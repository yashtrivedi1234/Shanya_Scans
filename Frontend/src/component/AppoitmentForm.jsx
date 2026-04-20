import React, { useEffect } from "react";
import image from "../assets/home/apoitmen.avif";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "./BreadCums";

const AppointmentForm = () => {
  const location = useLocation();
  const { state } = location;

  console.log(state);


  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    // { label: 'About ASTITVA CLINIC ' },
    { label: 'Appointment' },
   
];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BreadCrumbs headText={"Book an Appointment"} items={breadcrumbItems} />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl">
        {/* Left Section: Image */}
        <div className="hidden md:block">
          <img
            src={image}
            alt="Appointment"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Section: Form */}
        <div className="p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Book an Appointment
          </h2>
          <form className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Phone*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
              <input
                type="email"
                placeholder="Email*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
            </div>

            {/* Date and Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="date"
                placeholder="Appointment Date*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
                    <input
                type="text"
                placeholder="City*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
                value={state?.testDetailName}
              />
      
            </div>

            {/* City and Pin Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="City*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
                value={`${state?.testPrice}Rs/-only`}
              />
              <input
                type="text"
                placeholder="Pin Code*"
                className="p-3 border rounded-lg w-full focus:outline-blue-500"
              />
            </div>

            {/* Address */}
            <textarea
              placeholder="Address*"
              className="p-3 border rounded-lg w-full h-28 focus:outline-blue-500 resize-none"
            />

            {/* Recaptcha */}
            {/* <div className="flex items-center space-x-3">
              <input type="checkbox" id="recaptcha" className="h-4 w-4" />
              <label htmlFor="recaptcha" className="text-gray-600 text-sm">
                I'm not a robot
              </label>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AppointmentForm;
