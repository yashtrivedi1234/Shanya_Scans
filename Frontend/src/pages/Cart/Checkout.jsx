import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { getRazorpayId, order, placeOrder, verifyPayment } from "../../Redux/slice/razorSlice";
import CheckOutSuccess from "./CheckoutSuccess";
import { clearCart } from "../../Redux/slice/addCart.slice";

const getAvailableSlots = (period, selectedDate) => {
  const slots = [];
  const currentTime = new Date();
  const isToday = selectedDate === currentTime.toISOString().split("T")[0];

  currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / 30) * 30); // Round to nearest 30 mins

  let startHour, endHour;

  // Define time ranges based on the period
  if (period === "Morning") {
    startHour = 9;
    endHour = 12;
  } else if (period === "Afternoon") {
    startHour = 12;
    endHour = 18;
  } else if (period === "Evening") {
    startHour = 18;
    endHour = 23;
  }

  const time = new Date();
  time.setHours(startHour, 0, 0, 0);

  while (time.getHours() < endHour) {
    // For today, ensure slots are only available for times in the future
    if (!isToday || time > currentTime) {
      const hours = time.getHours();
      const minutes = time.getMinutes() === 0 ? "00" : "30";
      const periodSuffix = hours >= 12 ? "PM" : "AM";
      slots.push(`${hours > 12 ? hours - 12 : hours}:${minutes} ${periodSuffix}`);
    }
    time.setMinutes(time.getMinutes() + 30); // Increment by 30 minutes
  }

  return slots;
};


const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    city: "",
    address: "",
    country: "",
    mobile: "",
    altMobile: "",
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Today's date
  const { cartData } = useSelector((state) => state.cart);
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [spinloading, setSpinloading] = useState(false)

  console.log("location is", location);


  const state = location?.state || {};
  const checkoutData = state?.checkoutData || []; // Fallback to an empty array if undefined



  console.log("checkout page is", checkoutData);


  const calculateTotal = (checkoutData) => {
    console.log("Calculating total for:", checkoutData);

    return checkoutData.reduce(
      (total, item) => total + item.itemRate * item.itemQuantity,
      0
    );
  };


  const periods = [
    { name: "Morning", icon: <FaSun />, timeRange: "9:00 AM - 12:00 PM" },
    { name: "Afternoon", icon: <FaCloudSun />, timeRange: "12:00 PM - 6:00 PM" },
    { name: "Evening", icon: <FaMoon />, timeRange: "6:00 PM - 11:00 PM" },
  ];

  const handleSubmit = async () => {
    try {
      setSpinloading(true)
      await dispatch(clearCart())
      // Step 1: Fetch Razorpay Key
      const key = await dispatch(getRazorpayId()).unwrap();

      // Step 2: Create Razorpay Order
      const totalAmount = calculateTotal(checkoutData);
      const checkoutPayload = {
        ...address,
        slot: selectedSlot,
        date: selectedDate,
        total: totalAmount,
      };
      const razorpayOrder = await dispatch(order(checkoutPayload)).unwrap();

      if (!razorpayOrder?.order?.id) {
        alert('Failed to create Razorpay order. Try again.');
        return;
      }

      // Step 3: Verify Razorpay Object
      if (!window.Razorpay) {
        alert('Razorpay SDK not loaded. Please refresh the page.');
        return;
      }

      // Step 4: Initialize Razorpay Payment
      const options = {
        key: key,
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'Shanya Global',
        description: 'Payment for your order',
        order_id: razorpayOrder.order.id,
        handler: async (response) => {
          // Step 5: Verify Payment
          const paymentVerificationPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_order_id: response.razorpay_order_id,
          };

          const verificationResult = await dispatch(
            verifyPayment(paymentVerificationPayload)
          ).unwrap();

          if (verificationResult?.success) {
            // alert('Payment successful!');
            await dispatch(placeOrder(formData))
            setStep(4)
            // Redirect to order summary or confirmation page
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: address.name,
          email: 'user@example.com',
          contact: address.mobile,
        },
        theme: {
          color: '#3399cc',
        },
      };
      setSpinloading(false)
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error in payment process:', error);
      alert('Something went wrong. Please try again later.');
    }
  };



  return (
    <div className="container mx-auto  px-4 py-10 lg:py-16 overflow-x-hidden">
      <div className="max-w-6xl mx-auto border rounded-lg shadow-lg bg-white p-6">
        {/* Step Progress */}
        <div className="flex justify-between items-center mb-6 ">
          {["Order Details", "Address Details", "Slot Selection", "Success"].map(
            (label, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex items-center ${step === index + 1 ? "text-blue-600" : "text-gray-400"
                    }`}
                >
                  <div
                    className={`h-8 w-8 flex items-center justify-center border-2 rounded-full ${step === index + 1 ? "bg-blue-600 text-white" : "border-gray-400"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2">{label}</span>
                </div>
                {index < 3 && (
                  <div className="flex-grow h-px bg-gray-300 mx-2"></div>
                )}
              </React.Fragment>
            )
          )}
        </div>


        {/* Step Content */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartData.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {checkoutData.map((item, index) => (
                  <div key={index} className="flex justify-between mb-4">
                    <span>{item.itemName}</span>
                    <span>
                      ₹{item.itemRate} x {item.itemQuantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total:</span>
                  <span>₹{calculateTotal(checkoutData)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Address Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Name", "City", "Address", "Country", "Mobile", "Alt Mobile"].map(
                (label, index) => (
                  <div key={index}>
                    <label className="block text-sm font-semibold mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="border w-full px-3 py-2 rounded focus:outline-none focus:ring"
                      value={address[label.toLowerCase().replace(" ", "")] || ""}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          [label.toLowerCase().replace(" ", "")]:
                            e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Delivery Slot</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Date</label>
              <input
                type="date"
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {periods.map(({ name, icon, timeRange }) => (
              <div key={name} className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {icon} {name} ({timeRange})
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {getAvailableSlots(name, selectedDate).length > 0 ? (
                    getAvailableSlots(name, selectedDate).map((slot, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 border rounded ${selectedSlot === slot
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                          }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <span className="col-span-3 text-gray-500">
                      No slots available.
                    </span>
                  )}
                </div>
              </div>
            ))}

          </div>
        )}


        {step === 4 && <CheckOutSuccess />}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && step != 4 && (
            <button
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}
          {step < 3 && step !== 4 ? (
            <button
              className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          ) : step === 4 ? (
            <button
              className="px-4 py-2 border rounded bg-main text-white hover:bg-[#4e3edb]"
              onClick={() => {
                navigate("/")
              }}

            >
              Back to Home
            </button>
          ) : (
            // <button
            //   className="px-4 py-2 border rounded bg-main text-white hover:bg-[#4040eb]"
            //   onClick={() => handleSubmit()}
            // >
            //   Submit Order
            // </button>
            <button
              type="submit" // Only the submit button has "submit" type
              className="px-4 py-2 border rounded bg-main text-white hover:bg-[#4040eb]"
              onClick={() => handleSubmit()}
            >

              {spinloading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>  // Spinner
              ) : (

                "Submit"
              )}

            </button>

          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
