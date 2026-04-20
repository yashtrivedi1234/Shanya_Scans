import React from "react";
import Slider from "react-slick";
import { FaRocket, FaMicroscope, FaDollarSign } from "react-icons/fa";
import mainImage from "../assets/home/whywe.webp";

const WhyChooseSanya = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    appendDots: (dots) => (
      <div className="flex justify-center mt-10">
        <ul className="flex space-x-6">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-4 h-4 bg-blue-700 hover:bg-blue-600 transition-all rounded-full"></div>
    ),
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 px-6 lg:px-12 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-xl"></div>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1F509A] via-blue-600 to-[#1F509A] mb-16 tracking-tight">
          Why Choose Sanya?
        </h2>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-24">
          {/* Left Section: Slider */}
          <div className="lg:w-1/2 space-y-10">
            <Slider {...sliderSettings}>
              {/* Slide 1 */}
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-6">
                <FaRocket className="text-[#1F509A] text-6xl transition-transform transform hover:scale-110" />
                <div>
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4 hover:text-blue-700 transition-all">
                    Fast, Safe, and Accurate
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our services are designed to ensure 100% on-time sample
                    collection and delivery, with safety and accuracy at the
                    forefront.
                  </p>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-6">
                <FaMicroscope className="text-[#1F509A] text-6xl transition-transform transform hover:scale-110" />
                <div>
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4 hover:text-blue-700 transition-all">
                    State-of-the-Art Technology
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Experience cutting-edge technology that provides accurate
                    and reliable results with ease.
                  </p>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-6">
                <FaDollarSign className="text-[#1F509A] text-6xl transition-transform transform hover:scale-110" />
                <div>
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4 hover:text-blue-700 transition-all">
                    Affordable Pricing
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our pricing is designed to be affordable for everyone
                    without compromising on quality.
                  </p>
                </div>
              </div>
            </Slider>

            {/* CTA Button */}
            <div className="flex justify-center mt-12">
              <button className="px-12 py-5 bg-[#1F509A] text-white text-xl font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-600 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="relative lg:w-1/2 flex justify-center items-center ">
            <div className="w-full lg:w-[90%] bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <img
                src={mainImage}
                alt="Why Choose Sanya"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-blue-500 rounded-full opacity-40 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSanya;
