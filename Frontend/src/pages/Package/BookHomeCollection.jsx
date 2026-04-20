// import React, { useEffect, useState } from "react";
// import BreadCrumbs from "../../component/BreadCums";
// import book from "../../assets/home/bookhome.jpg";
// import {
//   fetchPathologyTest,
// } from "../../Redux/slice/testSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   getRazorpayId,
//   order,
//   placeOrder,
//   verifyPayment,
// } from "../../Redux/slice/razorSlice";
// import CheckOutSuccess from "../Cart/CheckoutSuccess";

// const BookHomeCollectionForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { pathologyTest, loading, error } = useSelector((state) => state.test);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [step, setStep] = useState(1);
//   const [bookingSuccess, setBookingSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     gender: "",
//     age: "",
//     mobileNumber: "",
//     whatsappNumber: "",
//     email: "",
//     address: "",
//     city: "Lucknow", // Default value for the fixed city
//     pincode: "",
//     bookingDate: "", // 👈 new
//     bookingTime: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchPathologyTest());
//     };
//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   let TestDetail = [];
//   const filteredTests = pathologyTest.filter((test) =>
//     test.testDetailName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleTestSelect = (test) => {
//     setSelectedTests((prevTests) => {
//       if (prevTests.some((t) => t._id === test._id)) {
//         return prevTests; // already added
//       }
//       return [...prevTests, test];
//     });
//     setTotalPrice((prevPrice) => prevPrice + test.testPrice);
//     setSearchTerm("");
//   };

//   const handleRemoveTest = (testToRemove) => {
//     setSelectedTests((prevTests) =>
//       prevTests.filter((test) => test._id !== testToRemove._id)
//     );
//     setTotalPrice((prevPrice) => prevPrice - testToRemove.testPrice);
//   };

//   const handleNextStep = () => {
//     setStep(2); // Move to Step 2
//   };

//   const handlePreviousStep = () => {
//     setStep(1);
//   };

//   const handlePaymentSuccess = (paymentDetails) => {
//     // Handle the payment success logic here
//     // You can send the paymentDetails to your backend and save the booking info.
//     setBookingSuccess(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       const key = await dispatch(getRazorpayId()).unwrap();
//       const checkoutPayload = {
//         tests: selectedTests.map((test) => ({
//           id: test._id,
//           name: test.testDetailName,
//           price: test.testPrice,
//         })),
//         patientDetails: formData,
//         slot: "Morning",
//         date: "2025-09-12",
//         total: totalPrice,
//       };

//       const razorpayOrder = await dispatch(order(checkoutPayload)).unwrap();

//       if (!razorpayOrder?.order?.id) {
//         alert("Failed to create Razorpay order. Try again.");
//         return;
//       }

//       const options = {
//         key: key,
//         amount: totalPrice * 100,
//         currency: "INR",
//         name: "Shanya Global",
//         description: "Payment for your order",
//         order_id: razorpayOrder.order.id,
//         handler: async (response) => {
//           const paymentVerificationPayload = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             razorpay_order_id: response.razorpay_order_id,
//           };

//           const verificationResult = await dispatch(
//             verifyPayment(paymentVerificationPayload)
//           ).unwrap();
//           if (verificationResult?.success) {
//             console.log("Payment verified successfully:", verificationResult);
//             console.log("Form Data:", formData);
//             console.log("Selected Tests:", selectedTests);
//             console.log("Total Price:", totalPrice);
//        const transformedOrder = {
//       email: formData.email,
//       address: formData.address,
//       phoneNumber: formData.mobileNumber,
//        altPhoneNumber: formData.whatsappNumber || formData.mobileNumber,
//       pinCode: formData.pincode,
//       selectedPlace: formData.city,
//       addressType: "home",
//       orderDetails: [
//         {
//           patientName: formData.fullName,
//           patientAge: formData.age,
//           patientGender: formData.gender,
//           tests: selectedTests.map((test) => ({
//             orderName: test.testDetailName,
//             orderType: "home collection",
//             orderPrice: test.testPrice,
//             quantity: 1,
//             category: "home collection",
//             bookingDate: formData.bookingDate
//   ? new Date(formData.bookingDate)
//   : new Date(), // agar user select nahi kare to current date

// bookingTime: formData.bookingTime
//   ? new Date(`${formData.bookingDate}T${formData.bookingTime}`)
//   : new Date()
//           })),
//         },
//       ],
//     };

//             const orderData = await dispatch(placeOrder([transformedOrder]));

//             console.log("Order placed:", orderData);
//             setStep(3);
//           } else {
//             alert("Payment verification failed!");
//           }
//         },
//         prefill: {
//           name: formData.fullName,
//           email: formData.email,
//           contact: formData.mobileNumber,
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error in payment process:", error);
//       alert("Something went wrong. Please try again later.");
//     }
//   };

//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: "Book Home Collection" },
//   ];

//   // Handle input change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   return (
//     <section>
//       <BreadCrumbs
//         headText={"Shanya: Book, Relax, Diagnose"}
//         items={breadcrumbItems}
//       />
//       <div className="flex flex-col lg:flex-row items-start justify-start p-4 bg-gray-50 max-w-7xl mx-auto py-10 sm:py-12 md:py-14 ">
//         {/* Left Image */}
//         <div className="hidden lg:block lg:w-1/2  min-h-[30rem] max-h-[40rem]">
//           <img
//             src={book}
//             alt="Home Blood Sample Collection"
//             className="w-full max-h-[30rem]"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 min-h-[30rem] max-h-[30rem] overflow-y-auto">
//           <h2 className="text-2xl font-bold">Book Home Collection</h2>
//           <p className="text-sm text-gray-600 mb-2">
//             (Applicable for pathology test only)
//           </p>

//           {/* Step 1: Search for Tests */}
//           {step === 1 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">
//                 Step 1: Search and Select Tests
//               </h3>
//               <div className="space-y-4">
//                 {/* Test Search Input */}
//                 <div>
//                   <label
//                     htmlFor="testPackage"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Search for tests
//                   </label>
//                   <input
//                     type="text"
//                     id="testPackage"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Enter test e.g., CBC, fever profile etc."
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                   {/* Suggestions */}
//                   {
//                     <ul className="mt-2 border rounded-md max-h-[8rem] overflow-y-auto">
//                       {filteredTests.map((test) => (
//                         <li
//                           key={test.id}
//                           className="p-2 hover:bg-gray-200 cursor-pointer"
//                           onClick={() => handleTestSelect(test)}
//                         >
//                           {test.testDetailName} - ₹{test.testPrice}
//                         </li>
//                       ))}
//                     </ul>
//                   }
//                 </div>

//                 {/* Selected Tests with Scrollable List */}
//               {selectedTests?.length!=0 &&   <div>
//                   <h3 className="font-semibold text-lg">Selected Tests</h3>
//                   <div className="max-h-40 overflow-y-auto border rounded-md p-2">
//                     <ul>
//                       {selectedTests.map((test) => (
//                         <li
//                           key={test.id}
//                           className="flex justify-between items-center"
//                         >
//                           <span>{test.testDetailName}</span>
//                           <button
//                             type="button"
//                             className="text-red-500"
//                             onClick={() => handleRemoveTest(test)}
//                           >
//                             Remove
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
// }
//                 {/* Total Price */}
//                 <div className="text-right mt-4">
//                   <span className="font-bold">Total Price: ₹{totalPrice}</span>
//                 </div>

//                 {/* Next Step Button */}
//                 <div className="text-right mt-4">
//                   <button
//                     type="button"
//                     onClick={handleNextStep}
//                     className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
//                   >
//                     Next: Fill Booking Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Booking Form */}
//           {step === 2 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">
//                 Step 2: Fill Booking Details
//               </h3>
//               <form onSubmit={handleSubmit}>
//                 {/* Personal Information */}
//                 <div className="flex gap-4">
//                   <div className="flex-1">
//                     <label
//                       htmlFor="fullName"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="fullName"
//                       required
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label
//                       htmlFor="gender"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Gender
//                     </label>
//                     <select
//                       id="gender"
//                       required
//                       value={formData.gender}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     >
//                       <option value="">Select</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                   <div className="flex-1">
//                     <label
//                       htmlFor="age"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Age
//                     </label>
//                     <input
//                       type="number"
//                       id="age"
//                       required
//                       value={formData.age}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="flex gap-4 mt-2">
//                   <div className="flex-1">
//                     <label
//                       htmlFor="mobileNumber"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       id="mobileNumber"
//                       required
//                       value={formData.mobileNumber}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>
//                 </div>
//                 {/* Booking Date & Time */}
//                 <div className="flex gap-4 mt-2">
//                   <div className="flex-1">
//                     <label
//                       htmlFor="bookingDate"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Booking Date
//                     </label>
//                     <input
//                       type="date"
//                       id="bookingDate"
//                       required
//                       value={formData.bookingDate}
//                       onChange={handleChange}
//                       min={new Date().toISOString().split("T")[0]} // 👈 past date disable
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <label
//                       htmlFor="bookingTime"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Booking Time
//                     </label>
//                     <input
//                       type="time"
//                       id="bookingTime"
//                       required
//                       value={formData.bookingTime}
//                       onChange={handleChange}
//                       className="w-full border rounded-md p-2 text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="mt-2">
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     required
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="w-full border rounded-md p-2 text-sm"
//                   />
//                 </div>

//                 {/* Proceed Button */}
//                 <div className="mt-4">
//                   <button
//                     onClick={handleSubmit}
//                     type="button"
//                     className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
//                   >
//                     Proceed to Payment
//                   </button>
//                 </div>
//               </form>

//               <div className="text-right mt-4">
//                 <button
//                   type="button"
//                   onClick={handlePreviousStep}
//                   className="text-gray-600"
//                 >
//                   Back to Step 1
//                 </button>
//               </div>
//             </div>
//           )}

//           {step === 3 && <CheckOutSuccess />}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookHomeCollectionForm;

import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import book from "../../assets/home/bookhome.jpg";
import { fetchPathologyTest } from "../../Redux/slice/testSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  order,
  placeOrder,
  verifyPayment,
} from "../../Redux/slice/razorSlice";
import CheckOutSuccess from "../Cart/CheckoutSuccess";

const BookHomeCollectionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    pathologyTest,
    loading: testLoading,
    error,
  } = useSelector((state) => state.test);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    bookingFor: "self",
    fullName: "",
    gender: "",
    age: "",
    mobileNumber: "",
    email: "",

    // Step 2: Booking Details
    bookingDate: "",
    bookingTime: "",
    locality: "",
    pincode: "",
    houseNo: "",
    cityState: "Lucknow, Uttar Pradesh",
    addressType: "home",
    makeDefault: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPathologyTest());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const filteredTests = pathologyTest.filter((test) =>
    test.testDetailName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestSelect = (test) => {
    setSelectedTests((prevTests) => {
      if (prevTests.some((t) => t._id === test._id)) {
        return prevTests;
      }
      return [...prevTests, test];
    });
    setTotalPrice((prevPrice) => prevPrice + test.testPrice);
    setSearchTerm("");
  };

  const handleRemoveTest = (testToRemove) => {
    setSelectedTests((prevTests) =>
      prevTests.filter((test) => test._id !== testToRemove._id)
    );
    setTotalPrice((prevPrice) => prevPrice - testToRemove.testPrice);
    console.log(selectedTests.length);
    if (selectedTests.length == 1) {
      setTotalPrice(0);
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [id]: fieldValue,
    }));

    // Real-time validation
    const newErrors = { ...errors };

    if (id === "email" && value) {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (id === "mobileNumber" && value) {
      if (!validatePhone(value)) {
        newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
      } else {
        delete newErrors.mobileNumber;
      }
    }

    if (id === "fullName" && value) {
      if (!validateName(value)) {
        newErrors.fullName =
          "Name should contain only letters and spaces (2-50 characters)";
      } else {
        delete newErrors.fullName;
      }
    }

    if (id === "pincode" && value) {
      if (!validatePincode(value)) {
        newErrors.pincode = "Please enter a valid 6-digit pincode";
      } else {
        delete newErrors.pincode;
      }
    }

    setErrors(newErrors);
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      else if (!validateName(formData.fullName))
        newErrors.fullName = "Please enter a valid name";

      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.age) newErrors.age = "Age is required";
      else if (formData.age < 1 || formData.age > 120)
        newErrors.age = "Please enter a valid age";

      if (!formData.mobileNumber)
        newErrors.mobileNumber = "Mobile number is required";
      else if (!validatePhone(formData.mobileNumber))
        newErrors.mobileNumber = "Please enter a valid mobile number";

      if (!formData.email) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email))
        newErrors.email = "Please enter a valid email";
    }

    if (stepNumber === 2) {
      if (!formData.bookingDate)
        newErrors.bookingDate = "Booking date is required";
      if (!formData.bookingTime)
        newErrors.bookingTime = "Booking time is required";
      if (!formData.locality) newErrors.locality = "Locality is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      else if (!validatePincode(formData.pincode))
        newErrors.pincode = "Please enter a valid pincode";
      if (!formData.houseNo)
        newErrors.houseNo = "House/Flat number is required";
    }

    if (stepNumber === 3) {
      if (selectedTests.length === 0)
        newErrors.tests = "Please select at least one test";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && selectedTests.length === 0) {
      setErrors({ tests: "Please select at least one test before proceeding" });
      return;
    }

    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      const key = await dispatch(getRazorpayId()).unwrap();
      const checkoutPayload = {
        tests: selectedTests.map((test) => ({
          id: test._id,
          name: test.testDetailName,
          price: test.testPrice,
        })),
        patientDetails: {
          ...formData,
          address: `${formData.houseNo}, ${formData.locality}, ${formData.cityState}`,
        },
        slot: "Morning",
        date: formData.bookingDate,
        total: totalPrice,
      };

      const razorpayOrder = await dispatch(order(checkoutPayload)).unwrap();

      if (!razorpayOrder?.order?.id) {
        alert("Failed to create Razorpay order. Try again.");
        return;
      }

      const options = {
        key: key,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Shanya Global",
        description: "Payment for your order",
        order_id: razorpayOrder.order.id,
        handler: async (response) => {
          const paymentVerificationPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_order_id: response.razorpay_order_id,
          };

          const verificationResult = await dispatch(
            verifyPayment(paymentVerificationPayload)
          ).unwrap();

          if (verificationResult?.success) {
            const transformedOrder = {
              email: formData.email,
              address: `${formData.houseNo}, ${formData.locality}, ${formData.cityState}`,
              phoneNumber: formData.mobileNumber,
              altPhoneNumber: formData.mobileNumber,
              pinCode: formData.pincode,
              selectedPlace: formData.cityState,
              addressType: formData.addressType,
              orderDetails: [
                {
                  patientName: formData.fullName,
                  patientAge: formData.age,
                  patientGender: formData.gender,
                  tests: selectedTests.map((test) => ({
                    orderName: test.testDetailName,
                    orderType: "home collection",
                    orderPrice: test.testPrice,
                    quantity: 1,
                    category: "home collection",
                    bookingDate: new Date(formData.bookingDate),
                    bookingTime: new Date(
                      `${formData.bookingDate}T${formData.bookingTime}`
                    ),
                  })),
                },
              ],
            };
          setLoading(true);
            const orderData = await dispatch(placeOrder([transformedOrder]));
            console.log("Order placed:", orderData);
            setLoading(false);
            setStep(4);
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Book Home Collection" },
  ];

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= stepNum
                ? "bg-red-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {stepNum}
          </div>
          {stepNum < 3 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step > stepNum ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section>
      <BreadCrumbs
        headText={"Shanya: Book, Relax, Diagnose"}
        items={breadcrumbItems}
      />
      <div className="flex flex-col lg:flex-row items-start justify-start p-4 bg-gray-50 max-w-7xl mx-auto py-6">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2 ">
          <img
            src={book}
            alt="Home Blood Sample Collection"
            className="w-full z-20 h-[35rem]  object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full z-10 lg:w-1/2 bg-white border rounded-lg p-4 h-[35rem] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">Book Home Collection</h2>
          {/* <p className="text-sm text-gray-600 mb-4">
            (Applicable for pathology test only)
          </p> */}

          {/* {renderStepIndicator()} */}

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
              {/* Search for Tests First */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search for tests *
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter test e.g., CBC, fever profile etc."
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <ul className="mt-2 border rounded-md max-h-[8rem] overflow-y-auto">
                  {filteredTests?.map((test) => (
                    <li
                      key={test.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleTestSelect(test)}
                    >
                      {test.testDetailName} - ₹{test.testPrice}
                    </li>
                  ))}
                </ul>

                {searchTerm && (
                  <ul className="mt-1 border rounded-md max-h-32 overflow-y-auto bg-white shadow-sm">
                    {filteredTests.map((test) => (
                      <li
                        key={test._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                        onClick={() => handleTestSelect(test)}
                      >
                        <div className="flex justify-between">
                          <span>{test.testDetailName}</span>
                          <span className="font-semibold text-green-600">
                            ₹{test.testPrice}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {errors.tests && (
                  <p className="text-red-500 text-xs mt-1">{errors.tests}</p>
                )}
              </div>

              {/* Selected Tests */}
              {selectedTests.length > 0 && (
                <div className="mb-4 p-3 bg-green-50 rounded-md border">
                  <h4 className="font-semibold text-sm text-green-800 mb-2">
                    Selected Tests ({selectedTests.length})
                  </h4>
                  <div className="max-h-20 overflow-y-auto">
                    {selectedTests.map((test) => (
                      <div
                        key={test._id}
                        className="flex justify-between items-center py-1 text-sm"
                      >
                        <span className="text-gray-700">
                          {test.testDetailName}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">
                            ₹{test.testPrice}
                          </span>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 text-xs"
                            onClick={() => handleRemoveTest(test)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2 pt-2 border-t border-green-200">
                    <span className="font-bold text-green-800">
                      Total: ₹{totalPrice}
                    </span>
                  </div>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>

              <div className="space-y-3">
                {/* Booking For */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking For: *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        id="bookingFor"
                        name="bookingFor"
                        value="self"
                        checked={formData.bookingFor === "self"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bookingFor: e.target.value,
                          })
                        }
                        className="mr-2"
                      />
                      Self
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        id="bookingFor"
                        name="bookingFor"
                        value="other"
                        checked={formData.bookingFor === "other"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bookingFor: e.target.value,
                          })
                        }
                        className="mr-2"
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Name and Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Selected Gender *
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                {/* Age and Mobile */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="1"
                      max="120"
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter age"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      maxLength="10"
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter 10-digit number"
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mobileNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={selectedTests.length === 0}
                  className="bg-red-600 text-white px-6 py-2 rounded-md text-sm hover:bg-red-700 disabled:bg-gray-400"
                >
                  Next: Booking Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Booking Details */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Booking Details</h3>

              <div className="space-y-2">
                {/* Booking Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="bookingDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Booking Date *
                    </label>
                    <input
                      type="date"
                      id="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {errors.bookingDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bookingDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="bookingTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Booking Time *
                    </label>
                    <input
                      type="time"
                      id="bookingTime"
                      value={formData.bookingTime}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {errors.bookingTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bookingTime}
                      </p>
                    )}
                  </div>
                </div>

                {/* Locality & Pincode */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="locality"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Locality *
                    </label>
                    <input
                      type="text"
                      id="locality"
                      value={formData.locality}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter locality/area"
                    />
                    {errors.locality && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.locality}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                {/* House No./Flat No. */}
                <div>
                  <label
                    htmlFor="houseNo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    House No. / Flat No. / Building / Landmark *
                  </label>
                  <input
                    type="text"
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter house/flat number and landmark"
                  />
                  {errors.houseNo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.houseNo}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* City, State */}
                  <div>
                    <label
                      htmlFor="cityState"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City, State
                    </label>
                    <input
                      type="text"
                      id="cityState"
                      value={formData.cityState}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-sm bg-gray-50"
                      readOnly
                    />
                  </div>

                  {/* Address Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type
                    </label>
                    <div className="flex gap-4">
                      {["home", "office", "other"].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="addressType"
                            value={type}
                            checked={formData.addressType === type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                addressType: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Make Default Address */}
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      id="makeDefault"
                      checked={formData.makeDefault}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      Make Default Address
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 ml-6 mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    We will use this address for home collection
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="text-gray-600 px-4 py-2 text-sm hover:text-gray-800"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-red-600 text-white px-6 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Next: Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Payment */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>

              {/* Order Summary */}
              <div className="space-y-4">
                {/* Selected Tests */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <h4 className="font-semibold text-sm mb-2">
                    Selected Tests ({selectedTests.length})
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedTests.map((test) => (
                      <div
                        key={test._id}
                        className="flex justify-between items-center text-sm py-1 border-b last:border-b-0"
                      >
                        <span className="text-gray-700">
                          {test.testDetailName}
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹{test.testPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-800">
                      Total Amount
                    </span>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                {/* Booking Details Summary */}
                <div className="border rounded-xl p-4 shadow-sm bg-white">
                  <h4 className="font-semibold text-base mb-3 text-gray-800 border-b pb-2">
                    Booking Details
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="font-medium w-28">Patient:</span>
                      <span>
                        {formData.fullName} ({formData.gender}, {formData.age}{" "}
                        years)
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="font-medium w-28">Date & Time:</span>
                      <span>
                        {formData.bookingDate} at {formData.bookingTime}
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="font-medium w-28">Address:</span>
                      <span>
                        {formData.houseNo}, {formData.locality},{" "}
                        {formData.cityState} - {formData.pincode}
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="font-medium w-28">Contact:</span>
                      <span>
                        {formData.mobileNumber} | {formData.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="text-gray-600 px-4 py-2 text-sm hover:text-gray-800"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-md text-sm hover:bg-green-700 font-semibold"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-t-transparent rounded-full border-white animate-spin"></div>
                  ) : (
                    <div className="">Proceed to Payment ₹ {totalPrice} </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && <CheckOutSuccess />}
        </div>
      </div>
    </section>
  );
};

export default BookHomeCollectionForm;
