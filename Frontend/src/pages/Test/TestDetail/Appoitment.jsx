import React from 'react'
import { Link } from 'react-router-dom'

const Appoitment = () => {
  return (
    <div className="max-w-[30rem] bg-[#1F509A] text-white rounded-lg shadow-lg p-6 mx-auto mt-8 relative overflow-hidden">
      <h4 className="text-2xl font-bold mb-2">How to Get In Touch With Us:</h4>
      <p className="text-gray-200 mb-4">
        If you want to know more, inquire, or connect with us for any assistance, feel free to call us at{' '}
        <span className="font-bold">1800-1234-187</span> or{' '}
        <span className="font-bold">7233-000-133</span>. Alternatively, click the button below for online booking or contact.
      </p>
      <div className="flex justify-center">
        <Link  target='_blank'>
          <button className="bg-white text-[#4A6F8F] px-6 py-3 rounded-lg font-semibold shadow-md ease-in-out duration-300 transition hover:bg-gray-200 mr-4">
            Book Appointment
          </button>
        </Link>
        <Link to="/contact">
          <button className="bg-white text-[#4A6F8F] px-6 py-3 rounded-lg font-semibold shadow-md ease-in-out duration-300 transition hover:bg-gray-200">
            Contact Us
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#84b0d7] rounded-full opacity-50 transform rotate-45"></div>
      <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#84b0d7] rounded-full opacity-50 transform rotate-45"></div>
    </div>
  )
}

export default Appoitment
