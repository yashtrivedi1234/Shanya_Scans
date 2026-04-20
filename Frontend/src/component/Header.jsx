import React, { useEffect, useState } from 'react'
import { FaCross, FaHome, FaMapMarkerAlt, FaPhoneAlt, FaPlus, FaShoppingCart } from 'react-icons/fa'; // Import the Plus icon
import { IoHomeOutline } from 'react-icons/io5'; // Import the Home icon
import { RxCross2 } from "react-icons/rx";
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/Shanya.png'
import TopHeader from './TopHeader';
import Sidebar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackageData, fetchServiceData } from '../Redux/slice/package.slice';
import { removeFromCart, toggleCart } from '../Redux/slice/addCart.slice';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdLogIn } from 'react-icons/io';




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false)
  const { packageData, loading, error } = useSelector((state) => state.package)
  const { serviceData } = useSelector((state) => state.service)
  const [activeService, setActiveService] = useState(null);


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
    console.log("remove item from cart is", itemId);

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
    console.log("Process checkout data:", cartData);

    let checkoutData = [];
    if (cartData.length > 0) {
      // Map over cart data to prepare checkout data
      checkoutData = cartData.map((data) => ({
        itemName: data.packageName || data.testName, // Use packageName for packages, testName for tests
        itemRate: data.packageRate || data.testPrice, // Use packageRate for packages, testPrice for tests
        itemQuantity: data.quantity, // Quantity is shared for both
        itemType: data.packageName ? "Package" : "Test", // Add a field to distinguish between packages and tests
      }));

      console.log("Prepared checkout data:", checkoutData);

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



  useEffect(() => {
    fetchService()
  }, [])

  useEffect(() => {
    fetchPackage()
  }, [])




  return (
    <div>
      <header class='shadow-md bg-white font-[sans-serif] tracking-wide relative z-30 '>

      
        {openSideBar && <Sidebar />}
        <div className='flex'>
        
        <TopHeader />

          <div id="toggleOpen" class={' ml-auto mr-2 hidden border border-red-500 '} >
            <button className='' onClick={() => handleSideBar()}>

              {!openSideBar ? <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg> : <AiOutlineClose className='text-xl' />}
            </button>
            
          </div>

          
        </div>


      </header>
    </div>
  )
}

export default Header