import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin, FaShoppingCart, FaPlus, FaCartArrowDown, FaHome } from 'react-icons/fa';
import { FaSquareThreads } from "react-icons/fa6";
import { BsPhone, BsTwitterX } from "react-icons/bs";
import { MdOutlineHomeWork } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { fetchServiceData } from '../Redux/slice/serviceSlice';
import { fetchPackageData } from '../Redux/slice/package.slice';
import { removeFromCart, toggleCart } from '../Redux/slice/addCart.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown, IoMdLogIn } from 'react-icons/io';
import { isVerifyLogin, login, logout, verification, phoneLogin, phoneVerification } from '../Redux/slice/razorSlice';

const TopHeader1 = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/people/Ashirwad-Vastu-Consulting/61571230313314/",
      color: "bg-blue-600", // Facebook blue
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/ashirwadvastuconsulting/",
      color: "bg-gradient-to-r from-pink-500 to-yellow-500", // Instagram gradient
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@AshirwadVastuConsulting",
      color: "bg-red-600", // YouTube red
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/ashirwad-vastu-consulting/",
      color: "bg-[#007BB6]", // LinkedIn blue
    },
    {
      icon: <FaSquareThreads />,
      url: `https://www.threads.net/@ashirwadvastuconsulting`, // Replace with your WhatsApp number
      color: "bg-[#000000]", // WhatsApp green
    },
    {
      icon: <BsTwitterX />,
      url: `https://x.com/AshirwadVastu`, // Replace with your WhatsApp number
      color: "bg-[#141414]", // WhatsApp green
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false)
  const { packageData, loading, error } = useSelector((state) => state.package)
  const { serviceData } = useSelector((state) => state.service)
  const [activeService, setActiveService] = useState(null);
  const [isLogin, setLogin] = useState(false)
  const [isModel, setModel] = useState(false)
  const [userData, setUserData] = useState({})
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loginType, setLoginType] = useState("email"); 
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const naviagte = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [spinLoading, setSpinloading] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Track verification status


  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };


  const dispatch = useDispatch()
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar)
  }


  const { cartData, numberOfCart, } = useSelector((state) => state.cart);
  const navigate = useNavigate()

  // Toggle cart sidebar open/close
  const toggleCartSidebar = () => {
    dispatch(toggleCart());
  };

  // Handle item removal from the cart
  const removeItemFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Pass the unique identifier (_id for test or packageName for package)
  };


  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.packageRate || item.testPrice) * item.quantity,
      0
    );
  };



  const processCheckout = () => {


    let checkoutData = [];
    if (cartData.length > 0) {
      // Map over cart data to prepare checkout data
      checkoutData = cartData.map((data) => ({
        itemName: data.packageName || data.testName, // Use packageName for packages, testName for tests
        itemRate: data.packageRate || data.testPrice, // Use packageRate for packages, testPrice for tests
        itemQuantity: data.quantity, // Quantity is shared for both
        itemType: data.packageName ? "Package" : "Test", // Add a field to distinguish between packages and tests
      }));



      // Close the sidebar and navigate to the checkout page
      toggleCartSidebar();
      navigate(`/checkout`, { state: { checkoutData } });
    } else {
      console.log("No items in the cart for checkout.");
    }
  };


  useEffect(() => {
    // Sync cart data with localStorage whenever it changes
    localStorage.setItem("cartData", JSON.stringify(cartData));
    localStorage.setItem("numberOfCart", JSON.stringify(numberOfCart));
  }, [cartData, numberOfCart]);

  const fetchPackage = async () => {
    const response = await dispatch(fetchPackageData())
  }

  const fetchService = async () => {
    const response = await dispatch(fetchServiceData())
  }


  const handleLogout = async () => {
    const response = await dispatch(logout())
    if (response?.payload?.success) {
      navigate("/")
      window.location.reload(); // Force refresh
    }
  }



  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleLogin = async () => {
  if (isVerified) return;

  // EMAIL LOGIN (unchanged)
  if (loginType === "email") {
    if (!email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSpinloading(true);
    try {
      const loginResponse = await dispatch(login({ email }));
      if (loginResponse?.payload?.success) {
        setOtpSent(true);
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setSpinloading(false);
    }
  }

  // PHONE LOGIN → /auth/login
  if (loginType === "phone") {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSpinloading(true);
    try {
      const loginResponse = await dispatch(phoneLogin({ phone }));
      if (loginResponse?.payload?.success) {
        setOtpSent(true);
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setSpinloading(false);
    }
  }
};


const handleVerifyOtp = async () => {
  if (isVerified) return;

  if (!otp || otp.length !== 6) {
    alert("Please enter a valid OTP.");
    return;
  }

  setSpinloading(true);
  try {
    // EMAIL OTP VERIFY (unchanged)
    if (loginType === "email") {
      const verifyResponse = await dispatch(verification({ email, otp }));
      if (verifyResponse?.payload?.success) {
        setModel(false);
        await dispatch(isVerifyLogin());
        window.location.reload();
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }

    // PHONE OTP VERIFY → /auth/verify (same flow as email)
    if (loginType === "phone") {
      const verifyResponse = await dispatch(phoneVerification({ phone, otp }));

      if (verifyResponse?.payload?.success) {
        setModel(false);
        await dispatch(isVerifyLogin());
        setLogin(true);
        setIsDropdownOpen(false);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  } finally {
    setSpinloading(false);
  }
};



  useEffect(() => {
    fetchService()
  }, [])

  useEffect(() => {
    fetchPackage()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(isVerifyLogin());
        console.log(response);

        if (response?.payload?.success) {
          setLogin(true)
          setUserData(response?.payload?.data)
        }
      } catch (error) {
        console.error('Error verifying login:', error);
      }
    };
    fetchData()
  }, []);





  return (
    <div className="bg-prime text-white py-0 xl:py-1 shadow-lg z-50">
      <div className="max-w-full mx-auto flex flex-col lg:flex-row lg:justify-between px-10 py-2 xl:py-0 items-center gap-2 md:gap-4  container ">
        {/* Contact Info Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-6 ">

          <div className="flex items-center gap-2 group transition-transform duration-300 transform hover:scale-105">
            <BsPhone className="text-base lg:text-sm text-[#fff] group-hover:text-[#0e2024] transition-colors duration-300" />
            <a
              href="mailto:shanyaglobal.lko@gmail.com"
              className="text-xs sm:text-sm lg:text-base font-normal tracking-wide group-hover:text-[#0e2024] transition-colors duration-300"
            >
              Toll Free No: 18001234187
            </a>
          </div>
        </div>

        <div className='flex items-center   gap-10'>

          <div className="lg:flex hidden items-center gap-[1.5rem] group  list-none">
            <li ><Link className='underline duration-300 ease-in-out' to={"/gallery"}
            >Gallery</Link></li>
            <li ><Link className='underline duration-300 ease-in-out' to={"/review"}
            >Reviews</Link></li>
            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3'><Link className='underline duration-300 ease-in-out' to={"/carrer"}
            >Career</Link></li>
            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3'><Link className='underline duration-300 ease-in-out' to={"/blog"}
            >Blog</Link></li>
          </div>

          <div className='flex items-center gap-4 '>
            <Link to={"/book-home-collection"}>
              <div className="flex items-center bg-gradient-to-r from-[#f9e666] to-[#fcb045] px-4 py-1 rounded-full cursor-pointer hover:shadow-md hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <span className="text-sm font-semibold ml-2 text-gray-800">Home Collection</span>
                <FaPlus className="text-gray-800 text-xl ml-2" />
              </div>
            </Link>

            <Link>
              {!isLogin ? (
                <div className="flex items-center px-4 py-1 rounded-full cursor-pointer bg-gradient-to-r from-[#f9e666] to-[#fcb045] shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105" onClick={() => setModel(true)}>
                  <IoMdLogIn className="text-gray-800 text-2xl" />
                  <span className="text-md font-semibold ml-3 text-gray-800">Login</span>
                </div>
              ) : (
                <div className="relative z-60">
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center text-white cursor-pointer"
                  >
                    <span className="mr-2">Welcome {userData?.name}</span>
                    <IoMdArrowDropdown className="text-white text-xl" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-50">
                      <Link to="/dashboard" className="block px-4 py-2 text-black hover:bg-gray-200" onClick={() => toggleDropdown()}>
                        Dashboard
                      </Link>
                      <button
                        onClick={() => handleLogout()}  // Replace with your actual logout function
                        className="block w-full px-4 py-2 text-black text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Link>

            <div onClick={toggleCartSidebar} className="flex  items-center space-x-3 cursor-pointer transform transition-all duration-300 hover:scale-105 relative">
              <FaCartArrowDown
                className="text-white text-2xl lg:text-2xl"
                
              />
              {/* Cart Item Count */}
              {numberOfCart > 0 && (
                <div className="absolute top-[-0.2rem] -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center z-20">
                  {numberOfCart}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal */}
      {isModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-[30rem] border border-gray-300 dark:border-gray-700 relative z-50">

            {/* Close Button (Top-Right) */}
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all"
              onClick={() => setModel(false)}
            >
              ❌
            </button>

            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-5 text-center">
              🔐 Login
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  loginType === "email"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  setLoginType("email");
                  setOtpSent(false);
                  setOtp("");
                }}
              >
                ✉️ Email
              </button>

              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  loginType === "phone"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  setLoginType("phone");
                  setOtpSent(false);
                  setOtp("");
                }}
              >
                📱 Phone
              </button>
            </div>

            {!otpSent ? (
              <>
                {loginType === "email" ? (
                  <input
                    type="email"
                    placeholder="✉️ Enter Your Email Address"
                    className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    type="tel"
                    placeholder="📱 Enter Mobile Number"
                    className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  />
                )}
                <button
                  className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
                  onClick={handleLogin}
                  disabled={spinLoading}
                >
                  {spinLoading ? "Processing..." : "🚀 CONTINUE"}
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="🔢 Enter OTP"
                  className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="mt-5 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 text-white py-3 rounded-md font-semibold transition-all shadow-lg"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {spinLoading ? "Verifying..." : "✅ VERIFY OTP"}
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
  );
};

export default TopHeader1;
