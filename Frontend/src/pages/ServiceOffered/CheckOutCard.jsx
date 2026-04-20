import React, { useState } from "react";
import { useDispatch } from "react-redux";


const CheckOutCard = ({ value }) => {
  const [itemCount, setItemCount] = useState(0); // Local state to track count
  const [selectedTab, setSelectedTab] = useState("instruction"); // State for tab selection

  const dispatch = useDispatch();

  const handleAddToCart = (data) => {
    setItemCount(itemCount + 1); // Increment the count
    dispatch(addToCart(data)); // Dispatch the action to add to the cart
  };


  

  return (
    <div className="lg:max-w-xl  w-full bg-white cursor-pointer border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 z-10">

  
    {/* Tabs Section */}
    <div className="bg-gray-50 lg:px-6 rounded-b-lg space-y-4 pb-6">
      <div className="flex border-b mb-4 bg-gradient-to-r from-[#1F509A] to-[#3b76d0]">
        {["instruction", "instructionHindi"].map((tab) => (
          <button
            key={tab}
            className={`w-1/2 p-4 text-center font-semibold transition-all duration-300 ${
              selectedTab === tab
                ? "border-b-4 border-blue-500 text-white bg-blue-600"
                : "text-white bg-transparent hover:bg-blue-500"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === "instruction" ? "Instruction" : "Instruction in Hindi"}
          </button>
        ))}
      </div>
  
      {/* Content Section */}
      <div className="overflow-y-auto max-h-[500px] rounded-lg bg-white shadow-inner p-4">
        {selectedTab === "instruction" && (
          <div
            className="text-justify text-sm text-gray-700 p1"
            dangerouslySetInnerHTML={{
              __html: value?.testDetails1,
            }}
          />
        )}

<div className=" max-h-[500px] rounded-lg bg-white shadow-inner p-4">
  
        {selectedTab === "instructionHindi" && (
          <div
            className="text-justify text-sm text-gray-700 p1"
            dangerouslySetInnerHTML={{
              __html: value?.testDetails2,
            }}
          />
        )}
        </div>
      </div>
    </div>
  
    {/* Optional Footer Buttons */}
    {/* <div className="px-8 py-2 bg-gray-50 flex justify-between items-center rounded-b-xl space-x-4">
      <button className="text-sm font-medium text-[#1F509A] border border-[#1F509A] px-5 py-2 z-10 rounded-lg hover:bg-[#1F509A] hover:text-white transition">
        Buy Now
      </button>
      <button
        className="text-sm font-medium text-white z-10 bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        onClick={() => handleAddToCart(data)}
      >
        Add to Cart {itemCount > 0 && `(${itemCount})`}
      </button>
    </div> */}
  </div>
  
  
  );
};

export default CheckOutCard;
