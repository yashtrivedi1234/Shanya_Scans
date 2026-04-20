import React from 'react'

const TestCart = ({data}) => {
  return (
    <div>
          <div className="max-w-2xl md:max-w-full w-full bg-white cursor-pointer border border-gray-200  rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 z-10">
      {/* Image Section */}
      {/* <div
        className="h-48 bg-cover bg-center rounded-t-xl"
        style={{ backgroundImage: `url(${item?.image})` }}
      ></div> */}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1F509A] to-[#3b76d0] text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
        <h3 className="text-lg font-semibold text-white">{data?.testDetailName}</h3>
        {/* <span className="text-xs font-medium bg-black/20 px-3 py-1 rounded-md">
          Checkup
        </span> */}
      </div>

      {/* Pricing Section */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400 line-through">₹{data?.testPrice}</span>
          <span className="text-2xl font-extrabold text-[#1F509A]">
            ₹{data?.testPrice}
          </span>
          <span className="text-xs text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-md">
             {data?.testDiscount}% Off
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 py-2 space-y-3">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/ios-filled/20/000000/hourglass.png"
            alt="parameters"
            className="text-gray-500"
          />
          <span className="text-sm text-gray-600">
            {/* <b>{70}</b>  */}
            <div dangerouslySetInnerHTML={{ __html: data?.testDeliver1 }} />
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/ios-filled/20/000000/report-card.png"
            alt="reports"
            className="text-gray-500"
          />
          <span className="text-sm text-gray-600">
            Reports within <b>{}    <div dangerouslySetInnerHTML={{ __html: data?.testDeliver2 }} /></b>
          </span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-8 py-8 bg-gray-50 flex justify-between items-center rounded-b-xl space-x-4">
        <button className="text-sm font-medium text-[#1F509A] border border-[#1F509A] px-5 py-2 z-10 rounded-lg hover:bg-[#1F509A] hover:text-white transition">
          Buy Now
        </button>
        <button className="text-sm font-medium text-white z-10 bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  )
}

export default TestCart