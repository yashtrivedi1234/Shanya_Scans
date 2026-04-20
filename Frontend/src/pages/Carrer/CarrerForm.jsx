import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import image from "../../assets/home/carrer.jpg";
import { useDispatch } from "react-redux";
import { addCv } from "../../Redux/slice/package.slice";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    currentDesignation: "",
    currentCompany: "",
    highestQualification: "",
    totalExperience: "",
    position: "",
    resume: null,
  });
  const [spinLoading, setSpinLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinLoading(true);
    console.log("Form Submitted", formData);
    const response = await dispatch(addCv({ data: formData }));
    console.log(response);

    if (response?.payload?.data) {
      setFormData({
        name: "",
        email: "",
        contact: "",
        currentDesignation: "",
        currentCompany: "",
        highestQualification: "",
        totalExperience: "",
        position: "",
        resume: null,
      });
      setSubmitSuccess(true);
    }
    setSpinLoading(false);
  };

  const resetForm = () => {
    setSubmitSuccess(false);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Career" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-y-auto">
      <BreadCrumbs headText={"Join Our Team"} items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto md:px-4 py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto">
        {/* Left Section */}
        <div className="bg-gray-100 rounded-lg shadow-lg md:p-6 p-2 sm:p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 md:mb-4 mb-2">
              Build Your Career with Us
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Join our team and work in a collaborative, innovative environment where we value talent, creativity, and a passion for excellence.
            </p>
          </div>

          <img
            src={image}
            alt="Career"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Right Section: Form or Success Message */}
        <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 sm:p-4 overflow-y-auto border">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-green-100 p-6 rounded-lg mb-6 w-full">
                <svg 
                  className="w-16 h-16 text-green-500 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Applying!</h3>
                <p className="text-gray-600 text-lg mb-2">
                  Your application has been successfully submitted.
                </p>
                <p className="text-gray-600">
                  Our team will reach out soon for any updates. For inquiries, contact us at{" "}
                  <a 
                    href="mailto:hr@shanyascans.com" 
                    className="text-blue-500 font-medium hover:underline"
                  >
                    hr@shanyascans.com
                  </a>
                </p>
              </div>
              <button
                onClick={resetForm}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4">
              {/* Name Field */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Field */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Current Designation */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Current Designation</label>
                <input
                  type="text"
                  name="currentDesignation"
                  placeholder="Enter your current designation"
                  value={formData.currentDesignation}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Current Company */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Current Company</label>
                <input
                  type="text"
                  name="currentCompany"
                  placeholder="Enter your current company/organization"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Highest Qualification */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-lg font-semibold mb-2">Highest Qualification</label>
                <input
                  type="text"
                  name="highestQualification"
                  placeholder="Enter your highest qualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Total Experience and Position in One Row */}
              <div className="col-span-6 grid grid-cols-6 gap-4">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-lg font-semibold mb-2">Total Experience</label>
                  <input
                    type="text"
                    name="totalExperience"
                    placeholder="Enter your total experience in years"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-lg font-semibold mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="Enter the position you are applying for"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="col-span-6">
                <label className="block text-lg font-semibold mb-2">Upload Resume</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  disabled={spinLoading}
                >
                  {spinLoading ? (
                    <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerForm;