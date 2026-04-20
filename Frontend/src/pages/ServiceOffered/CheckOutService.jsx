import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import BreadCrumbs from "../../component/BreadCums";
import CheckOutCard from "./CheckOutCard";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../Redux/slice/razorSlice";
import CheckOutSuccess from "../Cart/CheckoutSuccess";

const CheckOutService = ({ data }) => {
  const [isOpen, setIsOpen] = useState(null); // Toggle dropdown
  const [selectedTab, setSelectedTab] = useState("instruction");
  const dispatch = useDispatch()
  const [spinLoading, setSpinLoading] = useState(false)
  const [successPlaced, setSuccessPlaced] = useState(false)

  const packageData = {
    name: "Master Health Checkup at Home (68 Parameters)",
    description: "Comprehensive health package offering detailed tests for overall wellness.",
    packagesParamter: [
      {
        parameterName: "Hemogram with ESR (19)",
        description:
          "<p>Includes tests like TOTAL LEUCOCYTE, RBC COUNT, HEMOGLOBIN, HAEMATOCRIT, MCV, MCH, MCHC, RDW, and more.</p>",
      },
      {
        parameterName: "Urine Routine (20)",
        description:
          "<p>Includes tests like Urine Sugar, Urine Protein, Urine Bilirubin, Urine Ketones, and Urine pH.</p>",
      },
      {
        parameterName: "Renal Profile (3)",
        description: "<p>Includes tests like Serum Urea, Creatinine, and Uric Acid.</p>",
      },
    ],
    price: "₹3000",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    city: "Lucknow",
    pincode: "",
    address: "",
    orders: [
      {
        name: "",
        price: "",
        quantity: 1
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinLoading(true)
    const ourOrder = {
      name: data?.testDetailName,
      price: data?.testPrice,
      quantity: 1
    }

    formData.orders.push(ourOrder)
    const response = await dispatch(placeOrder(formData))
    setSpinLoading(false)
    if (response?.payload?.data) {
      setSuccessPlaced(true)
    }

    setFormData(
      {
        fullName: "",
        gender: "",
        age: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        city: "Lucknow",
        pincode: "",
        address: "",
        orders: [
          {
            name: "",
            price: "",
            quantity: 1
          },
        ],
      }
    )



  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index); // Toggle dropdown
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Best Package Detail" },
  ];






  return (
    <div>
      {!successPlaced ?
        <div className="mx-auto lg:max-w-7xl ">
          <div className="bg-white border rounded-lg shadow-md flex flex-col lg:flex-row mx-auto container ">
            {/* Left Section */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between">
                <h3 className="mb-2">{data?.testDetailName || "18F-FDG Whole body PET-CT"}</h3>
                <p className="text-[#1F509A] font-semibold">₹{data?.testPrice || "₹5500"}</p>
              </div>

              {/* <p className="text-xl text-gray-700 text-justify">
     {data?.testDetails1}
  </p> */}
              <div
                className="text-justify p1"
                dangerouslySetInnerHTML={{
                  __html: data?.testRequirement1
                }}
              />

              {/* <div className="mt-4">
    <h4 className="text-lg font-semibold mb-2">Procedure:</h4>
    <ul className="list-disc ml-6 text-gray-700">
      <li>
        After registration and payment, the patient's medical history is taken, including checking referral, treatment, and investigation records, history of last meal, and any allergy to contrast media, pregnancy or breastfeeding status, etc., depending on the clinical requirement.
      </li>
      <li>
        The patient is given clothes to change if felt necessary.
      </li>
      <li>
        Blood sugar is checked, and height & weight are recorded. An intravenous cannula is fixed for the administration of tracer and contrast media.
      </li>
    </ul>
  </div> */}

              {/* <div className="mt-4">
    <h4 className="text-2xl font-semibold mb-2 text-[#1F509A]">Test Information:</h4>
    <ul className="list-disc ml-6 text-gray-700">
      <li>Fasting: 4-6 hours</li>
      <li>Reporting: Within 2 hours*</li>
    </ul>
  </div> */}


            </div>


            {/* Right Section */}
            <div className="bg-gray-50 p-6  rounded-r-lg h-fit space-y-2">
              <CheckOutCard value={data} />
            </div>

          </div>

          {/* checkout page */}
          <div className="p-4 space-y-4 max-w-7xl mx-auto rounded-lg shadow-md  border  bg-white mt-2">
            <h1 className="text-3xl font-extrabold text-[#1F509A] text-center">User Detail Form </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Row 1: Full Name, Gender, Age */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              {/* Row 2: Mobile, WhatsApp, Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Row 3: City, Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-base text-gray-700 font-semibold">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your pincode"
                  />
                </div>
              </div>

              {/* Row 4: Address */}
              <div>
                <label className="block text-base text-gray-700 font-semibold">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              {/* Add Order Button */}
              {/* <div>
          <button
            type="button"
            
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
          >
            Add Order
          </button>
        </div> */}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                  {spinLoading ? <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div> : "Submit"}

                </button>
              </div>
            </form>
          </div>



        </div>
        : <CheckOutSuccess />

      }
    </div>
  );
};

export default CheckOutService;
