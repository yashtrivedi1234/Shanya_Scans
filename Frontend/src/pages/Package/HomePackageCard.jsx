import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Redux/slice/addCart.slice";
import slugify from "slugify";

const HomePackageCard = ({ item }) => {
  const [itemCount, setItemCount] = useState(0); // Local state to track item count
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setItemCount(itemCount + 1); // Increment the count
    dispatch(addToCart(item)); // Dispatch the action to add to cart
  };

  return (
   <div
        className="w-full md:max-w-sm lg:max-w-[25rem] sm:max-w-full cursor-pointer bg-white mb-10 lg:mb-0 rounded-xl shadow-xl overflow-hidden flex flex-col"
        style={{ height: "440px" }} // Ensures all cards are the same height
        onClick={() =>
          navigate(`/package/${slugify(item?.packageName, { lower: true, strict: true })}`)
        }
      >
        {/* Image Section */}
        <div
          className="h-48 bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url(${item?.packagePhoto?.secure_url})` }}
        ></div>
  
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1F509A] to-[#3b76d0] text-white md:px-6 px-2 py-4 flex justify-between items-center ">
        <h3 className="text-lg font-semibold text-white truncate w-[90%]">
          {item?.packageName}
        </h3>
      </div>
  
        {/* Pricing Section */}
        <div className="md:px-6 px-2 py-2">
          <div className="flex items-center space-x-3">
            {/* <span className="text-sm text-gray-400 line-through">
              ₹{item?.packageRate}
            </span> */}
            <span className="text-2xl font-extrabold text-[#1F509A]">
              ₹{item?.packageDiscount}/-
            </span>
  
          </div>
        </div>
  
        {/* Details Section */}
        <div className="md:px-6 px-2 py-2 space-y-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/ios-filled/20/000000/hourglass.png"
              alt="parameters"
              className="text-gray-500"
            />
            <span className="text-sm text-gray-600">
              <b>{item?.parameterInclude}</b> parameters included
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/ios-filled/20/000000/report-card.png"
              alt="reports"
              className="text-gray-500"
            />
            <span className="text-sm text-gray-600">
              Reports within <b>{item?.report || "24Hour"}</b>
            </span>
          </div>
        </div>
  
        {/* Spacer */}
        <div className="flex-grow"></div>
  
        {/* Footer Buttons */}
        <div className="md:px-6 px-2 py-4 bg-gray-50 flex justify-between items-center rounded-b-xl">
          <button
            onClick={() =>
              navigate(`/package/${slugify(item?.packageName, { lower: true, strict: true })}`)
            }
            className="text-sm font-medium text-[#1F509A] border border-[#1F509A] px-5 py-2 z-50 rounded-lg hover:bg-[#1F509A] hover:text-white transition"
          >
            View Details
          </button>
          <button
            className="text-sm font-medium text-gray-800 bg-yellow px-5 py-2 rounded-lg hover:bg-yellow transition z-50"
            onClick={handleAddToCart}
          >
            Add to Cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </div>
      </div>
  
  );
};

export default HomePackageCard;
