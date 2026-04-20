// import React, { useEffect, useState } from "react";
// import { FaPlus, FaMinus, FaTimes, FaCheckCircle } from "react-icons/fa";
// import BreadCrumbs from "../../component/BreadCums";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getRazorpayId,
//   isVerifyLogin,
//   login,
//   order,
//   placeOrder,
//   verification,
//   verifyPayment,
// } from "../../Redux/slice/razorSlice";
// import { useLocation, useNavigate } from "react-router-dom";
// import CheckOutService from "../ServiceOffered/CheckOutService";
// import CheckOutSuccess from "../Cart/CheckoutSuccess";
// import { data } from "autoprefixer";

// const CheckOutPage = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [currentStep, setCurrentStep] = useState(2);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { state } = location;
//   const [success, setSuccess] = useState(false);
//   const [spinLoading, setSpinloading] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const dispatch = useDispatch();
//   const [isVerified, setIsVerified] = useState(false);

//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const [formData, setFormData] = useState(() => {
//     return state?.map((item) => ({
//       bookingFor: "Self",
//       name: "",
//       age: "",
//       phone: "",
//       altPhone: "",
//       email: "",
//       gender: "male",
//       bookingDate: "",
//       bookingTime: "",
//       locality: "",
//       pincode: "",
//       houseDetails: "",
//       cityState: "Lucknow, Uttar Pradesh",
//       addressType: "Home",
//       defaultAddress: false,
//       testName: item.name,
//       rate: item.rate,
//       category: item.category,
//       orderType: item.orderType,
//     }));
//   });

//   console.log(state);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLogin = async () => {
//     if (isVerified) return; // Skip login if already verified

//     setLoading(true);
//     try {
//       const loginResponse = await dispatch(login({ email }));
//       if (loginResponse?.payload) {
//         setOtpSent(true); // Show OTP input
//       } else {
//         alert("Login failed. Please check your number.");
//       }
//     } catch (error) {
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (isVerified) return; // Skip OTP if already verified

//     setLoading(true);
//     try {
//       const verifyResponse = await dispatch(verification({ email, otp }));
//       console.log("otp is", verifyResponse);

//       if (verifyResponse?.payload?.success) {
//         setIsModalOpen(false);
//         setCurrentStep(2);
//         setIsLogin(true);
//         await dispatch(isVerifyLogin());
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: "CheckOut" },
//     // { label: state?.name },
//   ];
//   const handleNext = () => {
//     if (!formData.name || !formData.age || !formData.phone) {
//       alert("Please fill all required fields");
//       return;
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentStep(currentStep + -1);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(isVerifyLogin());

//         if (response?.payload?.success) {
//           setIsVerified(true); // First, set the verified status
//           setCurrentStep(2); // Skip login/OTP process
//           setIsLogin(true);
//         }
//       } catch (error) {
//         console.error("Error verifying login:", error);
//       }
//     };

//     // Fetch verification status only if isVerified is false
//     if (!isVerified) {
//       fetchData();
//     }
//     if (isVerified) {
//       setCurrentStep(2);
//     }
//   }, [dispatch]);

//   const totalPrice = Number(
//     Array.isArray(state)
//       ? state.reduce((total, item) => total + (item?.rate || 0), 0)
//       : 0
//   );

//   const handleRazorPay = async (e) => {
//     e.preventDefault();

//     if (
//       !formData ||
//       !formData.name ||
//       !formData.age ||
//       !formData.phone ||
//       !formData.locality ||
//       !formData.pincode ||
//       !formData.bookingDate ||
//       !formData.bookingTime ||
//       !formData.addressType ||
//       !formData.email

//     ) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setSpinloading(true);

//     const formattedOrder = {
//       email: formData.email || "",
//       address: formData.locality || "",
//       phoneNumber: formData.phone || "",
//       altPhoneNumber: formData.altPhone || "",
//       pinCode: formData.pincode || "",
//       orderDetails: state?.map((item) => ({
//         patientName: formData.name || "Guest User",
//         patientAge: formData.age,
//         patientGender: formData.gender,
//         tests: [
//           {
//             orderName: item.name,
//             orderPrice: item.rate,
//             bookingDate: formData.bookingDate,
//             bookingTime: formData.bookingTime,
//             quantity: 1,
//             category: item.category,
//             orderType: item.orderType,
//           },
//         ],
//       })),
//     };

//     console.log(formattedOrder);

//     const keyRes = await dispatch(getRazorpayId()).unwrap();
//     console.log(keyRes);

//     const razorpayKey = keyRes.key;

//     const data = {
//       total: totalPrice,
//       forName: "Shanya Scans",
//     };
//     const orderRes = await dispatch(order(data)).unwrap();
//     console.log(orderRes);

//     const { id: order_id } = orderRes.order;

//     // Razorpay Options
//     const options = {
//       key: razorpayKey,
//       amount: totalPrice * 100,
//       currency: "INR",
//       name: "Shanya Global",
//       description: "Order Payment",
//       image: "/logo.png",
//       order_id,
//       prefill: {
//         name: formData?.name || "Guest User",
//         email: formData?.email || "",
//         contact: formData?.phone || "",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//       handler: async function (response) {
//         // Verify Payment
//         const verifyRes = await dispatch(
//           verifyPayment({
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           })
//         ).unwrap();

//         if (verifyRes.success) {
//           // Optional: Place order in DB
//           await dispatch(placeOrder([formattedOrder]));
//           // alert("Payment Successful!");
//           setSuccess(true);
//           setIsLogin(true);
//         } else {
//           alert("Payment verification failed!");
//         }
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//     // const response = await dispatch(placeOrder([formattedOrder])); // 🔥 Sending as an array

//     // if (response?.payload?.success) {
//     //   setSuccess(true);
//     //   setIsLogin(true);
//     // }
//     setSpinloading(false);
//   };


//   // validation helper
// const validateForm = () => {
//   const errors = {};

//   if (!formData.name || formData.name.trim().length < 3) {
//     errors.name = "Name must be at least 3 characters.";
//   }
//   if (!formData.age || isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
//     errors.age = "Enter a valid age (1-120).";
//   }
//   if (!/^[0-9]{10}$/.test(formData.phone)) {
//     errors.phone = "Phone number must be 10 digits.";
//   }
//   if (formData.altPhone && !/^[0-9]{10}$/.test(formData.altPhone)) {
//     errors.altPhone = "Alternate number must be 10 digits.";
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//     errors.email = "Enter a valid email address.";
//   }
//   if (!formData.locality || formData.locality.trim().length < 2) {
//     errors.locality = "Locality is required.";
//   }
//   if (!/^[0-9]{6}$/.test(formData.pincode)) {
//     errors.pincode = "Enter a valid 6-digit pincode.";
//   }
//   if (!formData.houseDetails || formData.houseDetails.trim().length < 3) {
//     errors.houseDetails = "House/Flat details are required.";
//   }
//   if (!formData.bookingDate) {
//     errors.bookingDate = "Booking date is required.";
//   }
//   if (!formData.bookingTime) {
//     errors.bookingTime = "Booking time is required.";
//   }

//   return errors;
// };


//   return (
//     <section>
//       <BreadCrumbs headText={"Checkout & Payment"} items={breadcrumbItems} />
//       {!success ? (
//         <div className="max-w-7xl mx-auto  bg-white  rounded-lg flex md:flex-row flex-col-reverse  items-start py-6 sm:py-8 md:py-10 lg:py-12 justify-around">
//           <div className="md:w-1/2 w-full  mx-auto py-6 px-2 bg-white shadow-md rounded-lg border ">
//             {/* Step Indicator */}
//             <div className="flex justify-between mb-6 border-b pb-4">
//               {[
//                 "Login/Register",
//                 "Booking Details",
//                 "Payment",
//                 // "Payment",
//               ].map((step, index) => (
//                 <div
//                   key={index}
//                   className={`flex-1 text-center ${
//                     currentStep > index + 1 ? "text-green-500" : "text-gray-600"
//                   }`}
//                 >
//                   <div
//                     className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full ${
//                       currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     {currentStep > index + 1 ? (
//                       <FaCheckCircle className="text-white" />
//                     ) : (
//                       index + 1
//                     )}
//                   </div>
//                   <p className="mt-2 text-sm font-semibold">{step}</p>
//                 </div>
//               ))}
//             </div>

//             <form onSubmit={handleRazorPay}>
//               {currentStep === 1 && (
//                 <div className="p-4 border rounded-b-lg">
//                   {!otpSent ? (
//                     <>
//                       <input
//                         type="text"
//                         placeholder="Enter Your Email Address"
//                         className="w-full p-2 border-b focus:outline-none"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                       <button
//                         className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
//                         onClick={handleLogin}
//                         disabled={loading}
//                       >
//                         {loading ? "Processing..." : "CONTINUE"}
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         className="w-full p-2 border-b focus:outline-none"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                       />
//                       <button
//                         className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
//                         onClick={handleVerifyOtp}
//                         disabled={loading}
//                       >
//                         {loading ? "Verifying..." : "VERIFY OTP"}
//                       </button>
//                     </>
//                   )}

//                   <p className="text-sm mt-2 text-gray-600">
//                     <span className="text-red-500">&#9733;</span> Stay informed
//                     with latest offers & reminders
//                     <br />
//                     <span className="text-red-500">&#9733;</span> Single login
//                     for App & Web, access to historic reports
//                     <br />
//                     <span className="text-red-500">&#9733;</span> Control all
//                     notifications, zero spam
//                   </p>
//                 </div>
//               )}

//               {currentStep === 2 && (
//                 <div className="p-4 border rounded-b-lg">
//                   <label className="block mb-2 font-semibold text-teal-600">
//                     Booking For:
//                   </label>
//                   <select
//                     name="bookingFor"
//                     value={formData?.bookingFor}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-lg"
//                   >
//                     <option value="Self">Self</option>
//                     <option value="Other">Other</option>
//                   </select>

//                   <div className="grid lg:grid-cols-2 grid-cols-1  gap-4 mt-3">
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       value={formData?.name}
//                       onChange={handleChange}
//                       placeholder="Enter Name"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <input
//                       type="number"
//                       name="age"
//                       value={formData?.age}
//                       onChange={handleChange}
//                       placeholder="Enter Age"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                   </div>

//                   <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-3">
//                     <input
//                       type="text"
//                       name="phone"
//                       required
//                       value={formData?.phone}
//                       onChange={handleChange}
//                       placeholder="Enter Phone Number"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       name="altPhone"
//                       value={formData?.altPhone}
//                       onChange={handleChange}
//                       placeholder="Enter Alternative Mobile Number"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 grid-cols-1  gap-4 mt-3">
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formData?.email}
//                       onChange={handleChange}
//                       placeholder="Enter Email Address"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <select
//                       name="gender"
//                       value={formData?.gender}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded-lg"
//                     >
//                       <option value="male">Selected Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   {/* <button className="mt-4 bg-orange-500 text-white p-2 rounded w-full" onClick={() => setCurrentStep(3)}>
//                                         Next
//                                     </button> */}
//                   <button
//                     className="mt-4 bg-orange-500 text-white p-2 rounded w-full"
//                     type="button"
//                     onClick={handleNext}
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}

//               {currentStep === 3 && (
//                 <div className="p-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block font-semibold">
//                         Booking Date*
//                       </label>
//                       <input
//                         type="date"
//                         name="bookingDate"
//                         required
//                         value={formData?.bookingDate}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded mt-1"
//                         min={new Date().toISOString().split("T")[0]}
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-semibold">
//                         Booking Time*
//                       </label>
//                       <input
//                         type="time"
//                         name="bookingTime"
//                         required
//                         value={formData?.bookingTime}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded mt-1"
//                         // min={
//                         //   formData?.bookingDate ===
//                         //   new Date().toISOString().split("T")[0]
//                         //     ? new Date().toISOString().slice(11, 16) // current time (HH:MM)
//                         //     : "00:00"
//                         // }
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mt-3">
//                     <div>
//                       <label className="block font-semibold">Locality*</label>
//                       <input
//                         type="text"
//                         name="locality"
//                         required
//                         value={formData?.locality}
//                         onChange={handleChange}
//                         placeholder="Locality"
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-semibold">Pincode*</label>
//                       <input
//                         type="text"
//                         name="pincode"
//                         required
//                         value={formData?.pincode}
//                         onChange={handleChange}
//                         placeholder="Pincode"
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
//                   </div>

//                   <label className="block font-semibold mt-3">
//                     House No. / Flat No. / Building / Landmark*
//                   </label>
//                   <input
//                     type="text"
//                     name="houseDetails"
//                     value={formData.houseDetails}
//                     onChange={handleChange}
//                     placeholder="House No. / Flat No. / Building / Landmark"
//                     className="w-full p-2 border rounded mt-1"
//                     required
//                   />

//                   <div className="grid grid-cols-2 gap-4 mt-3">
//                     <div>
//                       <label className="block font-semibold">City, State</label>
//                       <input
//                         type="text"
//                         name="cityState"
//                         value={formData?.cityState || "Lucknow, Uttar Pradesh"}
//                         className="w-full p-2 border rounded mt-1 bg-gray-100"
//                         readOnly
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-semibold">
//                         Address Type
//                       </label>
//                       <div className="flex gap-3 mt-1">
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="addressType"
//                             value="Home"
//                             required
//                             checked={formData.addressType === "Home"}
//                             onChange={handleChange}
//                           />
//                           Home
//                         </label>
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="addressType"
//                             value="Office"
//                             required
//                             checked={formData?.addressType === "Office"}
//                             onChange={handleChange}
//                           />
//                           Office
//                         </label>
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="addressType"
//                             value="Other"
//                             required
//                             checked={formData?.addressType === "Other"}
//                             onChange={handleChange}
//                           />
//                           Other
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   <label className="flex items-center mt-3 gap-2">
//                     <input
//                       type="checkbox"
//                       name="defaultAddress"
//                       checked={formData?.defaultAddress}
//                       onChange={handleChange}
//                     />
//                     Make Default Address
//                   </label>
//                   <div className="flex items-center mt-2 gap-2">
//                     <span className="text-red-500">&#9733;</span>
//                     <p className="text-sm text-gray-600">
//                       We will use this address for home collection
//                     </p>
//                   </div>
//                   <div className="flex items-center mt-2 gap-2">
//                     <button
//                       className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
//                       type="button"
//                       onClick={handlePrevious}
//                     >
//                       Back
//                     </button>
//                     <button
//                       className="mt-4 bg-orange-500 text-white p-2 rounded w-full"
//                       type="button"
//                       onClick={handleNext}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {currentStep === 4 && (
//                 <div>
//                   <div className="p-4 border-t text-sm text-gray-700">
//                     <p className="flex justify-between">
//                       <span>Price</span>{" "}
//                       <span className="font-semibold">₹{totalPrice}</span>
//                     </p>
//                     <p className="flex justify-between text-green-600 font-medium">
//                       <span>Report Counselling</span> <span>Available</span>
//                     </p>
//                     <p className="flex justify-between font-bold mt-3 text-lg">
//                       <span>Total Payable</span>{" "}
//                       <span className="text-red-600">₹{totalPrice}</span>
//                     </p>
//                   </div>
//                   <div className="flex items-center mt-2 gap-2">
//                    <button
//                       className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
//                       type="button"
//                       onClick={handlePrevious}
//                     >
//                       Back
//                     </button>
//                   <button
//                     className="mt-4 bg-green-500 text-white p-2 rounded w-full"
//                     type="submit"
//                   >
//                     {spinLoading ? (
//                       <div className="flex justify-center items-center">
//                         <svg
//                           className="animate-spin h-5 w-5 mr-2 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
//                           ></path>
//                         </svg>
//                       </div>
//                     ) : (
//                       "Placed Order"
//                     )}
//                   </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl px-2 border border-gray-200 md:w-96 w-full h-fit">
//             {/* User Info */}
//             <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-t-xl font-semibold text-lg flex flex-col">
//               <span>{formData?.name || "Your-Name"}</span>
//               <span className="text-sm text-gray-600">
//                 {`${formData?.gender || "Gender"}, ${formData?.age || "Age"}`}
//               </span>
//             </div>

//             {/* Header */}
//             <div className="bg-main text-white px-6 py-3 font-bold text-lg flex items-center justify-between">
//               <span>Your Customize Package</span>
//             </div>

//             {/* Package Item */}
//             {state?.map((item, index) => (
//               <div key={index} className="p-4 border-b">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-800">
//                       {item?.name}
//                     </h2>
//                   </div>
//                   {/* <FaTimes className="text-gray-500 cursor-pointer" /> */}
//                 </div>
//                 <div className="bg-yellow-400 text-black text-center py-2 mt-2 rounded-lg shadow-md font-bold text-lg">
//                   <span className="text-gray-600 text-lg">₹{item?.rate}</span>
//                 </div>
//                 <div className="flex justify-between items-center mt-3">
//                   {/* <div className="flex items-center gap-2">
//                     <button className="bg-gray-300 p-2 rounded-full">
//                       <FaMinus />
//                     </button>
//                     <span className="font-bold">1</span>
//                     <button onClick={increaseQuantity} className="bg-gray-300 p-2 rounded-full">
//                       <FaPlus />
//                     </button>
//                   </div> */}
//                 </div>
//               </div>
//             ))}

//             {/* Price Breakdown */}
//             <div className="p-4 border-t text-sm text-gray-700">
//               <p className="flex justify-between">
//                 <span>Price</span>{" "}
//                 <span className="font-semibold">₹{totalPrice}</span>
//               </p>
//               <p className="flex justify-between text-green-600 font-medium">
//                 <span>Report Counselling</span> <span>Available</span>
//               </p>
//               <p className="flex justify-between font-bold mt-3 text-lg">
//                 <span>Total Payable</span>{" "}
//                 <span className="text-red-600">₹{totalPrice}</span>
//               </p>
//             </div>
//           </div>

//           {/* Login Modal */}
//           {!isLogin && (
//             <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex items-center justify-center transition-all duration-500">
//               <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 animate-slide-up border border-gray-300 dark:border-gray-700 relative">
//                 {/* Close Button */}
//                 <button
//                   className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all text-xl font-bold"
//                   onClick={() => navigate(-1)}
//                 >
//                   ✖
//                 </button>

//                 <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-5 text-center">
//                   🔐 Login
//                 </h2>

//                 {!otpSent ? (
//                   <>
//                     <input
//                       type="email"
//                       placeholder="✉️ Enter Your Email Address"
//                       className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
//                       value={email}
//                       required
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <button
//                       className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
//                       onClick={handleLogin}
//                       disabled={loading}
//                     >
//                       {loading ? "Processing..." : "🚀 CONTINUE"}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="🔢 Enter OTP"
//                       className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
//                       value={otp}
//                       required
//                       onChange={(e) => setOtp(e.target.value)}
//                     />
//                     <button
//                       className="mt-5 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
//                       onClick={handleVerifyOtp}
//                       disabled={loading}
//                     >
//                       {loading ? "Verifying..." : "✅ VERIFY OTP"}
//                     </button>
//                   </>
//                 )}

//                 <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
//                   Secure 🔒
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <CheckOutSuccess />
//       )}
//     </section>
//   );
// };

// export default CheckOutPage;




import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaCheckCircle } from "react-icons/fa";
import BreadCrumbs from "../../component/BreadCums";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorpayId,
  isVerifyLogin,
  login,
  order,
  placeOrder,
  verification,
  verifyPayment,
} from "../../Redux/slice/razorSlice";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutService from "../ServiceOffered/CheckOutService";
import CheckOutSuccess from "../Cart/CheckoutSuccess";
import { data } from "autoprefixer";

const CheckOutPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(2);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [success, setSuccess] = useState(false);
  const [spinLoading, setSpinloading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const [formData, setFormData] = useState(() => {
    return state?.map((item) => ({
      bookingFor: "Self",
      name: "",
      age: "",
      phone: "",
      altPhone: "",
      email: "",
      gender: "male",
      bookingDate: "",
      bookingTime: "",
      locality: "",
      pincode: "",
      houseDetails: "",
      cityState: "Lucknow, Uttar Pradesh",
      addressType: "Home",
      defaultAddress: false,
      testName: item.name,
      rate: item.rate,
      category: item.category,
      orderType: item.orderType,
    }));
  });

  console.log(state);

  // validation helper
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || value.trim().length < 3) {
          error = "Name must be at least 3 characters.";
        }
        break;
      case "age":
        if (!value || isNaN(value) || value < 1 || value > 120) {
          error = "Enter a valid age (1-120).";
        }
        break;
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone must be 10 digits.";
        }
        break;
      case "altPhone":
        if (value && !/^[0-9]{10}$/.test(value)) {
          error = "Alternate number must be 10 digits.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "locality":
        if (!value || value.trim().length < 2) {
          error = "Locality is required.";
        }
        break;
      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) {
          error = "Pincode must be 6 digits.";
        }
        break;
      case "houseDetails":
        if (!value || value.trim().length < 3) {
          error = "House details are required.";
        }
        break;
      case "bookingDate":
        if (!value) {
          error = "Booking date is required.";
        }
        break;
      case "bookingTime":
        if (!value) {
          error = "Booking time is required.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    
    // Validate field on change
    validateField(name, newValue);
  };

  const handleLogin = async () => {
    if (isVerified) return; // Skip login if already verified

    setLoading(true);
    try {
      const loginResponse = await dispatch(login({ email }));
      if (loginResponse?.payload) {
        setOtpSent(true); // Show OTP input
      } else {
        alert("Login failed. Please check your number.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (isVerified) return; // Skip OTP if already verified

    setLoading(true);
    try {
      const verifyResponse = await dispatch(verification({ email, otp }));
      console.log("otp is", verifyResponse);

      if (verifyResponse?.payload?.success) {
        setIsModalOpen(false);
        setCurrentStep(2);
        setIsLogin(true);
        await dispatch(isVerifyLogin());
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "CheckOut" },
    // { label: state?.name },
  ];
  const handleNext = () => {
    if(currentStep === 2){
      const fieldsToValidate = ["name", "age", "phone", "email"];
      let allValid = true;
      fieldsToValidate.forEach((field) => {
        const isFieldValid = validateField(field, formData[field]);
        if (!isFieldValid) allValid = false;
      });

      if (!allValid) {
        alert("Please fix the errors in the form before proceeding.");
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep + -1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(isVerifyLogin());

        if (response?.payload?.success) {
          setIsVerified(true); // First, set the verified status
          setCurrentStep(2); // Skip login/OTP process
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error verifying login:", error);
      }
    };

    // Fetch verification status only if isVerified is false
    if (!isVerified) {
      fetchData();
    }
    if (isVerified) {
      setCurrentStep(2);
    }
  }, [dispatch]);

  const totalPrice = Number(
    Array.isArray(state)
      ? state.reduce((total, item) => total + (item?.rate || 0), 0)
      : 0
  );

  const handleRazorPay = async (e) => {
    e.preventDefault();

    if (
      !formData ||
      !formData.name ||
      !formData.age ||
      !formData.phone ||
      !formData.locality ||
      !formData.pincode ||
      !formData.bookingDate ||
      !formData.bookingTime ||
      !formData.addressType ||
      !formData.email
    ) {
      alert("Please fill all required fields");
      return;
    }

    setSpinloading(true);

    const formattedOrder = {
      email: formData.email || "",
      address:`${formData.houseDetails}, ${formData.locality}, ${formData?.cityState || "Lucknow, Uttar Pradesh"}`|| "",
      phoneNumber: formData.phone || "",
      altPhoneNumber: formData.altPhone || "",
      pinCode: formData.pincode || "",
      orderDetails: state?.map((item) => ({
        patientName: formData.name || "Guest User",
        patientAge: formData.age,
        patientGender: formData.gender,
        tests: [
          {
            orderName: item.name,
            orderPrice: item.rate,
            bookingDate: formData.bookingDate,
            bookingTime: formData.bookingTime,
            quantity: 1,
            category: item.category,
            orderType: item.orderType,
          },
        ],
      })),
    };

    console.log(formattedOrder);

    const keyRes = await dispatch(getRazorpayId()).unwrap();
    console.log(keyRes);

    const razorpayKey = keyRes.key;

    const data = {
      total: totalPrice,
      forName: "Shanya Scans",
    };
    const orderRes = await dispatch(order(data)).unwrap();
    console.log(orderRes);

    const { id: order_id } = orderRes.order;

    // Razorpay Options
    const options = {
      key: razorpayKey,
      amount: totalPrice * 100,
      currency: "INR",
      name: "Shanya Global",
      description: "Order Payment",
      image: "/logo.png",
      order_id,
      prefill: {
        name: formData?.name || "Guest User",
        email: formData?.email || "",
        contact: formData?.phone || "",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        // Verify Payment
        const verifyRes = await dispatch(
          verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
        ).unwrap();

        if (verifyRes.success) {
          // Optional: Place order in DB
          await dispatch(placeOrder([formattedOrder]));
          // alert("Payment Successful!");
          setSuccess(true);
          setIsLogin(true);
        } else {
          alert("Payment verification failed!");
        }
         setSpinloading(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    
  };

  return (
    <section>
      <BreadCrumbs headText={"Checkout & Payment"} items={breadcrumbItems} />
      {!success ? (
        <div className="max-w-7xl mx-auto  bg-white  rounded-lg flex md:flex-row flex-col-reverse  items-start py-6 sm:py-8 md:py-10 lg:py-12 justify-around">
          <div className="md:w-1/2 w-full  mx-auto py-6 px-2 bg-white shadow-md rounded-lg border ">
            {/* Step Indicator */}
            <div className="flex justify-between mb-6 border-b pb-4">
              {[
                "Login/Register",
                "Booking Details",
                "Payment",
                // "Payment",
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center ${
                    currentStep > index + 1 ? "text-green-500" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full ${
                      currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    {currentStep > index + 1 ? (
                      <FaCheckCircle className="text-white" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleRazorPay}>
              {currentStep === 1 && (
                <div className="p-4 border rounded-b-lg">
                  {!otpSent ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter Your Email Address"
                        className="w-full p-2 border-b focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "CONTINUE"}
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-2 border-b focus:outline-none"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "VERIFY OTP"}
                      </button>
                    </>
                  )}

                  <p className="text-sm mt-2 text-gray-600">
                    <span className="text-red-500">&#9733;</span> Stay informed
                    with latest offers & reminders
                    <br />
                    <span className="text-red-500">&#9733;</span> Single login
                    for App & Web, access to historic reports
                    <br />
                    <span className="text-red-500">&#9733;</span> Control all
                    notifications, zero spam
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-4 border rounded-b-lg">
                  <label className="block mb-2 font-semibold text-teal-600">
                    Booking For:
                  </label>
                  <select
                    name="bookingFor"
                    value={formData?.bookingFor}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Self">Self</option>
                    <option value="Other">Other</option>
                  </select>

                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4 mt-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData?.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        className={`w-full p-2 border rounded-lg ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="age"
                        value={formData?.age}
                        onChange={handleChange}
                        placeholder="Enter Age"
                        className={`w-full p-2 border rounded-lg ${
                          errors.age ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-3">
                    <div>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData?.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        className={`w-full p-2 border rounded-lg ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="altPhone"
                        value={formData?.altPhone}
                        onChange={handleChange}
                        placeholder="Enter Alternative Mobile Number"
                        className={`w-full p-2 border rounded-lg ${
                          errors.altPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.altPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.altPhone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1  gap-4 mt-3">
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData?.email}
                        onChange={handleChange}
                        placeholder="Enter Email Address"
                        className={`w-full p-2 border rounded-lg ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <select
                      name="gender"
                      value={formData?.gender}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="" selected disabled>Selected Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button
                    className="mt-4 bg-orange-500 text-white p-2 rounded w-full"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold">
                        Booking Date*
                      </label>
                      <input
                        type="date"
                        name="bookingDate"
                        required
                        value={formData?.bookingDate}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded mt-1 ${
                          errors.bookingDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.bookingDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.bookingDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-semibold">
                        Booking Time*
                      </label>
                      <input
                        type="time"
                        name="bookingTime"
                        required
                        value={formData?.bookingTime}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded mt-1 ${
                          errors.bookingTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.bookingTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.bookingTime}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block font-semibold">Locality*</label>
                      <input
                        type="text"
                        name="locality"
                        required
                        value={formData?.locality}
                        onChange={handleChange}
                        placeholder="Locality"
                        className={`w-full p-2 border rounded mt-1 ${
                          errors.locality ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.locality && (
                        <p className="text-red-500 text-sm mt-1">{errors.locality}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-semibold">Pincode*</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData?.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className={`w-full p-2 border rounded mt-1 ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <label className="block font-semibold mt-3">
                    House No. / Flat No. / Building / Landmark*
                  </label>
                  <input
                    type="text"
                    name="houseDetails"
                    value={formData.houseDetails}
                    onChange={handleChange}
                    placeholder="House No. / Flat No. / Building / Landmark"
                    className={`w-full p-2 border rounded mt-1 ${
                      errors.houseDetails ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.houseDetails && (
                    <p className="text-red-500 text-sm mt-1">{errors.houseDetails}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block font-semibold">City, State</label>
                      <input
                        type="text"
                        name="cityState"
                        value={formData?.cityState || "Lucknow, Uttar Pradesh"}
                        className="w-full p-2 border rounded mt-1 bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-semibold">
                        Address Type
                      </label>
                      <div className="flex gap-3 mt-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="addressType"
                            value="Home"
                            required
                            checked={formData.addressType === "Home"}
                            onChange={handleChange}
                          />
                          Home
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="addressType"
                            value="Office"
                            required
                            checked={formData?.addressType === "Office"}
                            onChange={handleChange}
                          />
                          Office
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="addressType"
                            value="Other"
                            required
                            checked={formData?.addressType === "Other"}
                            onChange={handleChange}
                          />
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center mt-3 gap-2">
                    <input
                      type="checkbox"
                      name="defaultAddress"
                      checked={formData?.defaultAddress}
                      onChange={handleChange}
                    />
                    Make Default Address
                  </label>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-red-500">&#9733;</span>
                    <p className="text-sm text-gray-600">
                      We will use this address for home collection
                    </p>
                  </div>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Back
                    </button>
                    <button
                      className="mt-4 bg-orange-500 text-white p-2 rounded w-full"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <div className="p-4 border-t text-sm text-gray-700">
                    <p className="flex justify-between">
                      <span>Price</span>{" "}
                      <span className="font-semibold">₹{totalPrice}</span>
                    </p>
                    <p className="flex justify-between text-green-600 font-medium">
                      <span>Report Counselling</span> <span>Available</span>
                    </p>
                    <p className="flex justify-between font-bold mt-3 text-lg">
                      <span>Total Payable</span>{" "}
                      <span className="text-red-600">₹{totalPrice}</span>
                    </p>
                  </div>
                  <div className="flex items-center mt-2 gap-2">
                   <button
                      className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Back
                    </button>
                  <button
                    className="mt-4 bg-green-500 text-white p-2 rounded w-full"
                    type="submit"
                  >
                    {spinLoading ? (
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      "Placed Order"
                    )}
                  </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-xl px-2 border border-gray-200 md:w-96 w-full h-fit">
            {/* User Info */}
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-t-xl font-semibold text-lg flex flex-col">
              <span>{formData?.name || "Your-Name"}</span>
              <span className="text-sm text-gray-600">
                {`${formData?.gender || "Gender"}, ${formData?.age || "Age"}`}
              </span>
            </div>

            {/* Header */}
            <div className="bg-main text-white px-6 py-3 font-bold text-lg flex items-center justify-between">
              <span>Your Customize Package</span>
            </div>

            {/* Package Item */}
            {state?.map((item, index) => (
              <div key={index} className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {item?.name}
                    </h2>
                  </div>
                  {/* <FaTimes className="text-gray-500 cursor-pointer" /> */}
                </div>
                <div className="bg-yellow-400 text-black text-center py-2 mt-2 rounded-lg shadow-md font-bold text-lg">
                  <span className="text-gray-600 text-lg">₹{item?.rate}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  {/* <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded-full">
                      <FaMinus />
                    </button>
                    <span className="font-bold">1</span>
                    <button onClick={increaseQuantity} className="bg-gray-300 p-2 rounded-full">
                      <FaPlus />
                    </button>
                  </div> */}
                </div>
              </div>
            ))}

            {/* Price Breakdown */}
            <div className="p-4 border-t text-sm text-gray-700">
              <p className="flex justify-between">
                <span>Price</span>{" "}
                <span className="font-semibold">₹{totalPrice}</span>
              </p>
              <p className="flex justify-between text-green-600 font-medium">
                <span>Report Counselling</span> <span>Available</span>
              </p>
              <p className="flex justify-between font-bold mt-3 text-lg">
                <span>Total Payable</span>{" "}
                <span className="text-red-600">₹{totalPrice}</span>
              </p>
            </div>
          </div>

          {/* Login Modal */}
          {!isLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex items-center justify-center transition-all duration-500">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 animate-slide-up border border-gray-300 dark:border-gray-700 relative">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all text-xl font-bold"
                  onClick={() => navigate(-1)}
                >
                  ✖
                </button>

                <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-5 text-center">
                  🔐 Login
                </h2>

                {!otpSent ? (
                  <>
                    <input
                      type="email"
                      placeholder="✉️ Enter Your Email Address"
                      className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "🚀 CONTINUE"}
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="🔢 Enter OTP"
                      className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                      value={otp}
                      required
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      className="mt-5 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "✅ VERIFY OTP"}
                    </button>
                  </>
                )}

                <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                  Secure 🔒
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <CheckOutSuccess />
      )}
    </section>
  );
};

export default CheckOutPage;