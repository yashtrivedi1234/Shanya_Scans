import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import BreadCrumbs from "../../../component/BreadCums";
import Scroll from "./Scroll";
import PackageFaq from "./PackageFaq";
import { useLocation } from "react-router-dom";
import CheckOutCard from "../../ServiceOffered/CheckOutCard";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../../Redux/slice/razorSlice";
import CheckOutService from "../../ServiceOffered/CheckOutService";
import Home from "../../Home/Home";
import CheckOutSuccess from "../../Cart/CheckoutSuccess";

const DemoPackage = () => {
    const [isOpen, setIsOpen] = useState(null); // Used for handling the open/close of the drop-down
    const packageData = {
      name: "Master Health Checkup at Home (68 Parameters)",
      description: "Comprehensive health package offering detailed tests for overall wellness.",
      details: [
        {
          category: "Hemogram with ESR (19)",
          tests: [
            "TOTAL LEUCOCYTE", "RBC COUNT", "HEMOGLOBIN", "HAEMATOCRIT", "MCV", 
            "MCH", "MCHC", "RDW", "MPV", "NEUTROPHILS", "LYMPHOCYTES", "MONOCYTES", 
            "EOSINOPHILS", "BASOPHILS", "PLATELETS", "PLATELET MORPHOLOGY", 
            "WBC MORPHOLOGY", "RBC MORPHOLOGY", "ESR"
          ]
        },
        {
          category: "Urine Routine (20)",
          tests: ["Urine Sugar", "Urine Protein", "Urine Bilirubin", "Urine Ketones", "Urine pH"]
        },
        {
          category: "Renal Profile (3)",
          tests: ["Serum Urea", "Creatinine", "Uric Acid"]
        },
          {
            category: "Urine Routine (20)",
            tests: ["Urine Sugar", "Urine Protein", "Urine Bilirubin", "Urine Ketones", "Urine pH"]
          },
          {
            category: "Renal Profile (3)",
            tests: ["Serum Urea", "Creatinine", "Uric Acid"]
          },
        // Add more categories as needed...
      ],
      price: "₹3000"
    };
    const [successPlaced,setSuccessPlaced]=useState(false)

    const dispatch=useDispatch()
     
    const [formData, setFormData] = useState({
      fullName: "",
      gender: "",
      age: "",
      mobileNumber: "",
      whatsappNumber: "",
      email: "",
      address: "",
      city: "Lucknow", // Default value for the fixed city
      pincode: "",
      selectedService: "", // Assuming you want this in formData
      rate: "", // Assuming you want this in formData
    });

    const [spinLoading,setSpinloading]=useState(false)
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      setSpinloading(true)
    

         const response=await dispatch(placeOrder(formData))
         setSpinloading(false)
         console.log(response);
        
         
         if(response?.payload?.data){
          setFormData({
            fullName: "",
            gender: "",
            age: "",
            mobileNumber: "",
            whatsappNumber: "",
            email: "",
            address: "",
            city: "Lucknow", // Default value for the fixed city
            pincode: "",
            selectedService: "", // Assuming you want this in formData
            rate: "", // Assuming you want this in formData
          })
            setSuccessPlaced(true)
         }

         console.log(successPlaced);
         
      // Perform further actions, such as sending data to an API
    };


    const handleToggle = (index) => {
      setIsOpen(isOpen === index ? null : index); // Toggle the dropdown
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


      const stripHtml = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        return doc.body.textContent || "";
      };
      

      const location=useLocation()
      const {state}=location



      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Package" },
        { label: `${state?.packageName}` },
      ];
  
      
      
  
  return (
    <div>
           <BreadCrumbs headText={state?.packageName} items={breadcrumbItems} />
        {!successPlaced ? 
           <div className="mx-auto lg:p-6">
  {/* Main Container */}
  <div className="bg-white border rounded-lg shadow-md flex flex-col lg:flex-row mx-auto max-w-7xl">
    {/* Left Section: Details */}
    <div className="flex-1 p-6 max-w-1/2 shadow-xl">
    <div className="flex items-cener justify-between">
    <h3>{state?.packageName}</h3>
    <p className="font-semibold text-[#1F509A]">₹{state?.packageDiscount}</p>
    </div>
     

      <p className="mt-2 text-gray-600">
        <div
          dangerouslySetInnerHTML={{ __html: state?.packageOverview }}
        />
      </p>

<div className="space-y-2">
  <div className="bg-gray-50 p-4 mt-0 rounded-lg shadow-md">
  <h3>{"Parameters"}</h3>

    <div className="mt-0 text-gray-800">
      {/* Apply styling to the entire content here */}
      <div
        dangerouslySetInnerHTML={{
          __html: state?.packageParamterDetails,
        }}
        className="package-details-content "
      />
    </div>
  </div>
</div>

    </div>

    {/* Right Section: Price Card */}
    <div className="flex-1 bg-white lg:p-6 p-2 rounded-r-lg max-w-1/2 space-y-4 shadow-xl border">
    <form
      className="bg-white lg:p-6 p-4 rounded min-h-[400px]"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2  gap-4 mb-4">
        {/* Full Name */}
        <div className="col-span-1">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div className="col-span-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age */}
        <div className="col-span-1">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Mobile Number */}
        <div className="col-span-1">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="col-span-1">
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsappNumber"
            placeholder="Enter your WhatsApp number"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City */}
        <div className="col-span-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* Pincode */}
        <div className="col-span-1">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            rows="3"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-start">
        <button
          type="submit"
          className="px-6 py-2 max-w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {spinLoading? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> :"Submit"}

        </button>
      </div>
    </form>

    </div>
    

  </div>
           </div>

      :<CheckOutSuccess/>}

 

      
    </div>
  );
};

export default DemoPackage;
