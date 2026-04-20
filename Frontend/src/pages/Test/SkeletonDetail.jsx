import React from "react";

const SkeletonTestDetail = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Header Section */}
      <div className="bg-gray-300 p-5 flex items-start justify-between">
        <div>
          <div className="h-6 w-40 bg-gray-400 rounded"></div>
          <div className="h-4 w-60 bg-gray-400 rounded mt-2"></div>
        </div>
        <div className="flex flex-col items-start">
          <div className="h-6 w-20 bg-gray-400 rounded"></div>
          <div className="h-10 w-32 bg-gray-500 rounded-lg mt-2"></div>
        </div>
      </div>
      
      <div className="p-5">
        {/* Test Details */}
        <div className="h-20 bg-gray-200 rounded"></div>

        {/* Test Features */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 border border-gray-300 p-4 rounded-lg">
              <div className="w-10 h-10 bg-gray-400 rounded"></div>
              <div>
                <div className="h-4 w-24 bg-gray-400 rounded"></div>
                <div className="h-6 w-16 bg-gray-500 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Report & Booking Info */}
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                <div className="w-5 h-5 bg-gray-400 rounded mb-1"></div>
                <div className="h-4 w-24 bg-gray-400 rounded"></div>
                <div className="h-6 w-16 bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Buttons */}
        <div className="relative z-10 flex items-center justify-center gap-6 p-8">
          <div className="h-12 w-36 bg-gray-500 rounded-2xl shadow-lg"></div>
          <div className="h-12 w-36 bg-gray-300 rounded-2xl shadow-lg"></div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-5 px-4 py-2 bg-white rounded-xl shadow-lg w-full flex items-start max-w-7xl">
          <div className="w-1/2">
            <div className="h-6 w-40 bg-gray-400 rounded mb-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-100 border rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-gray-400 rounded"></div>
                  <div className="h-4 w-40 bg-gray-400 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-gray-50 p-4 mt-5 rounded-lg shadow-md">
          <div className="h-6 w-32 bg-gray-400 rounded"></div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 border border-gray-300 shadow-lg bg-white rounded-lg text-center">
                <div className="h-6 w-20 bg-gray-400 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTestDetail;
