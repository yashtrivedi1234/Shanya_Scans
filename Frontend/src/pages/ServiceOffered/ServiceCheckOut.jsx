import React, { useEffect, useState } from "react";
import image from "../../assets/home/servicemore.jpg";
import BreadCrumbs from "../../component/BreadCums";
import CheckOutService from "./CheckOutService";
import { useLocation } from "react-router-dom";

const ServiceCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTab, setSelectedTab] = useState("instruction");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2)); // Adjusted to 2 steps
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const location=useLocation()

  const {state}=location

  

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Service" },
    { label: `${state?.testDetailName}` },
  ];

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BreadCrumbs headText={state?.testDetailName} items={breadcrumbItems} />
      <div className="p-6 bg-gray-100">
        <CheckOutService data={state}/>
        {/* <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
          <div className="p-6 bg-[#1F509A] text-white rounded-t-3xl">
            <h1 className="text-4xl font-bold tracking-wide text-white">Service Checkout</h1>
            <p className="text-lg mt-2 text-white">Step {currentStep} of 2</p>
          </div>

   
          {currentStep === 1 && (
            <div className="p-6 space-y-8">
              <h2 className="text-3xl font-semibold text-gray-800">18F-FDG Whole Body PET-CT</h2>
              <p className="text-blue-600 text-lg font-semibold">
                Call for discounted price
              </p>
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  src={image}
                  alt="18F-FDG Whole Body PET-CT"
                  className="w-full md:w-64 h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="text-gray-700 flex-1 leading-relaxed">
                  <p>
                    18F-FDG whole body PET-CT is commonly referred to as PET-CT scan or PET scan. 
                    This imaging modality performs multiple tests, including 18F-FDG Brain PET-CT...
                  </p>
                  <p className="text-gray-800 font-semibold mt-6">Test Information:</p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Fasting: 4-6 hours</li>
                    <li>Reporting: Within 2 hours*</li>
                  </ul>
                </div>
              </div>

        
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-800">Instructions</h3>
                <div className="flex border-b mb-6">
                  <button
                    className={`w-1/2 p-4 text-center transition-colors duration-200 rounded-tl-2xl ${
                      selectedTab === "instruction"
                        ? "border-b-4 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedTab("instruction")}
                  >
                    Instruction
                  </button>
                  <button
                    className={`w-1/2 p-4 text-center transition-colors duration-200 rounded-tr-2xl ${
                      selectedTab === "instructionHindi"
                        ? "border-b-4 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedTab("instructionHindi")}
                  >
                    Instruction in Hindi
                  </button>
                  <button
                    className={`w-1/2 p-4 text-center transition-colors duration-200 rounded-tr-2xl ${
                      selectedTab === "procedure"
                        ? "border-b-4 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedTab("procedure")}
                  >
                   Procedure
                  </button>
                </div>

                <div className="p-4">
                  {selectedTab === "instruction" && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Patient should be fasting for 4-6 hours before the appointment time.</li>
                      <li>Drinking plain water is allowed and encouraged.</li>
                      <li>Diabetic patients should NOT take anti-diabetic medicines...</li>
                    </ul>
                  )}
                  {selectedTab === "instructionHindi" && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>इस जाँच के लिए 4-6 घंटे के उपवास की आवश्यकता होती है।</li>
                      <li>सादा पानी पीने की अनुमति है और प्रोत्साहित किया जाता है।</li>
                      <li>मधुमेह रोगियों को जाँच के दिन इंसुलिन सहित मधुमेह विरोधी दवाएं...</li>
                    </ul>
                  )}
                     {selectedTab === "procedure" && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>After registration and payment, the patient's medical history is taken, including checking referral, treatment and investigation records, history of last meal and any allergy to contrast media, pregnancy or breastfeeding status, etc., depending on the clinical requirement.</li>
                      <li>Blood sugar is checked, and height & weight is recorded. An intravenous cannula is fixed for the administration of tracer and contrast media</li>
                      <li>The patient is injected with radioactive material (18F-FDG) and advised to relax for a duration to allow the tracer to be distributed within the body with an adequate target to background ratio</li>
                    </ul>
                  )}
                </div>
              </div>


            </div>
          )}


          {currentStep === 2 && (
            <div className="p-6 space-y-6">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Enter Your Details</h3>
              <form className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-gray-700">Gender</label>
                    <select
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-gray-700">Age</label>
                    <input
                      type="number"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Age in years"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-gray-700">WhatsApp Number</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-1">
                    <label className="block text-gray-700">Pincode</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                  <div className="col-span-1">
                    <label className="block text-gray-700">City</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value="Lucknow"
                      readOnly
                    />
                  </div>
                </div>

              

                <div className="col-span-1">
                    <label className="block text-gray-700">Address</label>
                    <textarea
                      className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter address"
                    />
                  </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition-colors duration-300">
                  Submit
                </button>
              </form>
            </div>
          )}

   
          <div className="p-6 bg-gray-50 flex justify-between items-center border-t rounded-b-3xl">
            <button
              className={`py-2 px-6 rounded-2xl text-white ${
                currentStep === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              className={`py-2 px-6 rounded-2xl text-white ${
                currentStep === 2
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={nextStep}
              disabled={currentStep === 2}
            >
              Next
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceCheckout;
