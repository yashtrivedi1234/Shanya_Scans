import React, { useEffect, useState } from 'react';
import logo from '../assets/logo/shanyalogo.png'
import logo1 from '../assets/logo/nabhlogo.png'
import logo2 from '../assets/logo/pmscheme.png'
import { FaHome, FaMapMarkerAlt, FaPhoneAlt, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, toggleCart } from '../Redux/slice/addCart.slice';
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { fetchServiceData } from '../Redux/slice/serviceSlice';
import { fetchPackageData } from '../Redux/slice/package.slice';
import { AiOutlineClose } from 'react-icons/ai';
import Sidebar from './SideBar';


const TopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false)
  const { packageData, loading, error } = useSelector((state) => state.package)
  const { serviceData } = useSelector((state) => state.service)
  const [activeService, setActiveService] = useState(null);
  const { isLogin, userData } = useSelector((state) => state.razorpay)





  const dispatch = useDispatch()
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar)
  }


  const { cartData, numberOfCart, isOpen } = useSelector((state) => state.cart);
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
        // name: val?.packageName,
        // rate: val?.packageDiscount,
        // category: val?.packageName,
        // orderType: "package"
        name: data.packageName || data.testName, // Use packageName for packages, testName for tests
        rate: data.packageRate || data.testPrice, // Use packageRate for packages, testPrice for tests
        quantity: data.quantity, // Quantity is shared for both
        orderType: data.packageName ? "package" : "scan", // Add a field to distinguish between packages and tests
        category:data.packageName ? data.packageName : data.testName
        
      }));

      console.log("Prepared checkout data:", checkoutData);

      // Close the sidebar and navigate to the checkout page
      toggleCartSidebar();
      // navigate("/scan/checkout", { state: data })
      navigate("/scan/checkout", { state: Array.isArray(checkoutData) ? checkoutData : [checkoutData] });
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



  useEffect(() => {
    fetchService()
  }, [])

  useEffect(() => {
    fetchPackage()
  }, [])






  useEffect(() => {
    // Sync cart data with localStorage whenever it changes
    localStorage.setItem("cartData", JSON.stringify(cartData));
    localStorage.setItem("numberOfCart", JSON.stringify(numberOfCart));
  }, [cartData, numberOfCart]);





  return (
    <div className="flex flex-row  lg:z-40 items-center justify-between gap-6 sm:px-20 lg:px-10 px-4 py-0 border-b bg-white h-fit  w-full  ">
      {/* Logo Section */}


      {/* First Logo */}
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo"
          className=" w-[14rem] lg:h-[5rem] object-contain h-auto -z-10 "
        />
      </Link>




      <div class='lg:flex flex-wrap justify-center px-10 lg:px-4  relative  py-2 sm:py-0'>
        <div className='items-center gap-4 hidden '>
          <div className="flex sm:hidden items-center space-x-3 cursor-pointer transform transition-all duration-300 hover:scale-105 relative">
            <FaShoppingCart
              className="text-main text-2xl lg:text-3xl"
              onClick={toggleCartSidebar}
            />
            {/* Cart Item Count */}
            {numberOfCart > 0 && (
              <div className="absolute top-[-0.5rem] right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-20">
                {numberOfCart}
              </div>
            )}
          </div>

          <Link >
            <div className="flex sm:hidden items-center bg-prime px-2 py-1 rounded-full cursor-pointer hover:shadow-md hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <IoMdLogIn className="text-white text-xl" />
              <span className="text-sm font-semibold ml-2 text-white">Login</span>
              <FaPlus className="text-white text-xl ml-2" />
            </div>
          </Link>


        </div>


        <div id="collapseMenu " className='hidden'
          class='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50'>
          <button id="toggleClose" class='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
            <svg xmlns="http://www.w3.org/2000/svg" class=" fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            class='lg:flex py-2 lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[200px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 '>
            <li class='max-lg:border-b max-lg:pb-4 px-3 lg:hidden'>
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
              </a>
            </li>
            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3'><Link to={"/"}
              class='hover:text-main text-gray-600 font-semibold block font-poppins  '>Home</Link></li>
            <li class='group max-lg:border-b max-lg:px-3 max-lg:py-3 relative font-poppins '>
              <a href='javascript:void(0)'
                class='hover:text-main hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block' style={{ whiteSpace: 'nowrap' }}>About Us
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" class="ml-1 inline-block"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                    data-name="16" data-original="#000000" />
                </svg>
              </a>
              <ul
                class='absolute top-5 max-lg:top-8 left-0 z-50 block  shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-4 group-hover:pb-4  group-hover:pt-2 transition-all 
                duration-500'>
                <li class='border-b py-1'>
                  <Link to={"/about"}
                    class='hover:text-main hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>

                    About Shanya Scans
                  </Link>
                </li>

                <li class='border-b py-1'>
                  <Link to={"/director-message"}
                    class='hover:text-main hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                    CEO Message

                  </Link>
                </li>

                <li class='border-b py-1'>
                  <Link to={"/about/management"}
                    class='hover:text-main hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>

                    Our Management
                  </Link>
                </li>


                
                <li class='border-b py-1'>
                  <Link to={"/about/team"}
                    class='hover:text-main hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>

                    Our Team
                  </Link>
                </li>

    

              </ul>
            </li>

            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3 font-poppins'><Link to={"/pathology"}
              class='hover:text-main text-gray-600 font-semibold text-[15px] block' style={{ whiteSpace: 'nowrap' }}>Blood Test</Link></li>

            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3 font-poppins'><Link to={"/scan"}
              class='hover:text-main text-gray-600 font-semibold xl:text-[15px]   block' style={{ whiteSpace: 'nowrap' }}>X-Ray & Scans</Link></li>


            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3 font-poppins'><Link to={"/package"}
              class='hover:text-main text-gray-600 font-semibold xl:text-[15px]   block' style={{ whiteSpace: 'nowrap' }}>Health Package</Link></li>

            <li class='max-lg:border-b max-lg:px-3 max-lg:py-3 font-poppins'><Link to={"/contact"}
              class='hover:text-main text-gray-600 font-semibold text-[15px] block' style={{ whiteSpace: 'nowrap' }}>Locate Us</Link></li>
          </ul>


        </div>

        <div id="toggleOpen" class={'flex lg:hidden '} >
          <button className='' onClick={() => handleSideBar()}>

            {!openSideBar ? <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg> : <AiOutlineClose className='text-xl' />}
          </button>

        </div>


      </div>

      {openSideBar && <Sidebar />}



      {/* Overlay for cart */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCartSidebar}
        ></div>
      )}

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg w-96 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">My Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleCartSidebar}
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartData.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              cartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    {/* Conditionally render item name */}
                    <p className="font-semibold">
                      {item.packageName || item.testName}
                    </p>

                    {/* Render item rate dynamically */}
                    <p className="text-gray-600">
                      ₹{item.packageRate || item.testPrice}
                    </p>

                    {/* Display quantity */}
                    <p className="text-gray-600">Quantity: {item.quantity}</p>

                    {/* Render additional test details if available */}
                    {item.testDetailName && (
                      <p className="text-gray-600">Test: {item.testDetailName}</p>
                    )}
                    {item.testDetails2 && (
                      <p className="text-gray-600">Additional Info: {item.testDetails2}</p>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItemFromCart(item.testName || item.packageName)}
                  >
                    <MdDelete className="text-[2rem]" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-lg font-semibold">
              Total: ₹{calculateTotal()}
            </p>
            <button
              className="bg-main text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-[#4364f9]"
              onClick={() => processCheckout()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default TopHeader;
