import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pattern1 from '../../assets/pattern/pattern7.png';
import pattern2 from '../../assets/pattern/pattern8.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetailMore } from "../../Redux/slice/serviceSlice";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

import image from '../../assets/radio/cardioimaging.png'


const DiagnosticTests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moreServiceData } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServiceDetailMore());
  }, [dispatch]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow:1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-10 relative block md:hidden">
      <div className="absolute top-0 right-0">
        <img src={pattern1} alt="" />
      </div>
      <div className="absolute bottom-[2rem] left-0">
        <img src={pattern2} alt="" />
      </div>
      <div className="flex flex-col max-w-xl justify-center px-4 md:items-center md:text-center text-start mx-auto relative z-10" data-aos="fade-up">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-main">Our Best Radiology Services123</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <Slider {...settings}>
          {moreServiceData.map((service) => (
            <div
            className="mt-2 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 py-4 px-6 max-w-7xl mx-auto"
            data-aos="fade-up"
          >
  
              <div key={service._id} className="relative m-2">
                {/* Card */}
                <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300  relative z-10 sm:min-h-[110px] flex flex-col justify-between cursor-pointer" onClick={() => {
                  // Check if the test name is 'pathology'
                  // Navigate to the test page with the test name
                  navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);
    
                }}>
                  {/* Content */}
                  <div className="text-center mt-10  p-2 flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {service?.serviceDetailName}
                    </h3>
                  </div>
    
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-100 p-6 border border-blue-500 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                      onClick={() => {
    
                        // Navigate to the test page with the test name
                        navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);
    
                      }}
                    >
                      View More
                    </button>
    
                  </div>
                </div>
    
                {/* Icon */}
                <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 z-20 ">
                  <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center p-1 ">
                    <img
                      // src={service?.servicePhoto?.secure_url}
                      src={image}
                      alt="testPhoto"
                      className="w-16 h-16 object-cover rounded-full"
                      onClick={() => {
                        navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);
                      }}
                    />
                  </div>
                </div>
    
              </div>
            
          </div>
    
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DiagnosticTests;
