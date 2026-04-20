import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestSpecificDetail } from '../../Redux/slice/testSlice';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumbs from '../../component/BreadCums';
import CheckOutSuccess from '../Cart/CheckoutSuccess';
import { getRazorpayId, order, placeOrder, verifyPayment } from '../../Redux/slice/razorSlice';
import { addToCart } from '../../Redux/slice/addCart.slice';

const TestCheckOut = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { testSpecificDetail } = useSelector((state) => state.test);
  const { state } = location;

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: 'Lucknow',
    pincode: '',
    address: '',
    orders: [
      {
        name: '',
        price: '',
        quantity: 1,
      },
    ],
  });
  const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);
  const [spinLoading, setSpinLoading] = useState(false);
  const [successPlaced, setSuccessPlaced] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const getTestDetail = async () => {
    await dispatch(fetchTestSpecificDetail(state?._id));
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const key = await dispatch(getRazorpayId()).unwrap();

      // Step 2: Create Razorpay Order
      const totalAmount = testSpecificDetail?.testPrice
      const checkoutPayload = {
        ..."your payLoad",
        slot: "123",
        date: "123",
        total: testSpecificDetail?.testPrice,
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
            const response = await dispatch(placeOrder(formData))
            if (response?.payload?.data) {
              setSuccessPlaced(true)
            }
            //  setStep(3)
            // Redirect to order summary or confirmation page
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: "ayush",
          email: 'user@example.com',
          contact: "6388291292",
        },
        theme: {
          color: '#3399cc',
        },
      };


      // setSpinloading(false)
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.log(error);

      console.error('Error in payment process:', error);
      alert('Something went wrong. Please try again later.');
    }
  };




  // const handleSubmit = async (e) => {
  //   e.preventDefault();





  //   setSpinLoading(true);
  //   const ourOrder = {
  //     name: testSpecificDetail?.testDetailName,
  //     price: testSpecificDetail?.testPrice,
  //     quantity: 1,
  //   };

  //   formData.orders.push(ourOrder);
  //   const response = await dispatch(placeOrder(formData));
  //   setSpinLoading(false);
  //   if (response?.payload?.data) {
  //     setSuccessPlaced(true);
  //   }

  //   setFormData({
  //     fullName: '',
  //     gender: '',
  //     age: '',
  //     mobileNumber: '',
  //     whatsappNumber: '',
  //     email: '',
  //     city: 'Lucknow',
  //     pincode: '',
  //     address: '',
  //     orders: [
  //       {
  //         name: '',
  //         price: '',
  //         quantity: 1,
  //       },
  //     ],
  //   });
  // };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Test' },
    { label: `${testSpecificDetail?.testDetailName}` },
    { label: 'Add to Cart' },
  ];

  return (
    <section className="bg-gray-100">
      <BreadCrumbs headText={testSpecificDetail?.testDetailName} items={breadcrumbItems} />
      <div className="container mx-auto py-10 sm:py-12 md:py-14 lg:py-16">
        {!successPlaced ? (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-center space-x-6 mb-6">
                <button
                  className={`px-6 py-3 rounded-lg font-semibold ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() => setActiveTab(1)}
                >
                  1
                </button>
                <button
                  className={`px-6 py-3 rounded-lg font-semibold ${activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() => setActiveTab(2)}
                >
                  2
                </button>
              </div>

              {activeTab === 1 && (
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-main">
                      {testSpecificDetail?.testDetailName || '18F-FDG Whole body PET-CT'}
                    </h3>
                    <p className="text-xl text-[#1F509A] font-semibold">
                      ₹{testSpecificDetail?.testPrice || '₹5500'}
                    </p>
                  </div>
                  <div
                    className="text-justify mt-0 p1"
                    dangerouslySetInnerHTML={{ __html: testSpecificDetail?.testRequirement1 }}
                  />
                  <div className="mt-2">
                    <Link className="py-2 font-semibold text-main hover:text-red-500 ease-in-out duration-500">
                      View More
                    </Link>
                  </div>
                  <div className="mt-4 space-x-4">
                    <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300" onClick={() => handleAddToCart(testSpecificDetail)}>
                      Add to Cart
                    </button>
                    <button
                      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
                      onClick={() => setActiveTab(2)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h1 className="text-3xl font-extrabold text-[#1F509A] text-center mb-6">User Detail Form</h1>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName

                          }
                          required
                          minLength={3}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Age</label>
                        <input
                          type="number"
                          name="age"
                          required
                          minLength={1}
                          maxLength={100}
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your age"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Mobile Number</label>
                        <input
                          type="text"
                          name="mobileNumber"
                          required
                          minLength={10}
                          maxLength={10}
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your mobile number"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">WhatsApp Number</label>
                        <input
                          type="text"
                          name="whatsappNumber"
                          required
                          minLength={10}
                          maxLength={10}
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your WhatsApp number"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          minLength={2}
                          value={formData.city}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your pincode"
                        />


                      </div>
                      <div className="col-span-1">
                        <label className="block text-base text-gray-700 font-semibold">Test</label>
                        <input
                          type="text"
                          name="test"
                          readOnly
                          required
                          value={testSpecificDetail?.testDetailName}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your pincode"
                        />


                      </div>
                    </div>



                    <div>
                      <label className="block text-base text-gray-700 font-semibold">Address</label>
                      <textarea
                        name="address"
                        required

                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your address"
                      ></textarea>
                    </div>

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
              )}
            </div>
          </div>
        ) : (
          <CheckOutSuccess />
        )}
      </div>
    </section>
  );
};

export default TestCheckOut;
