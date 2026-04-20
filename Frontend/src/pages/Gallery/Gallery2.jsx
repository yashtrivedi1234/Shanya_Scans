import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";

const Gallery2 = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const sliderRef = useRef(null); // Ref for Slider component

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
    if (location.pathname === "/about") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    arrows: false, // Disable default arrows since we're using custom ones
  };

  return (
    <div className="relative">
      <div className="bg-white py-6 sm:py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
            {data.slice().reverse().map((image, index) => (
              <a
                href="#"
                className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  openModal(index);
                }}
              >
                <img
                  src={image?.photo?.secure_url}
                  loading="lazy"
                  alt={`Gallery ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-xl p-4 bg-white rounded-lg overflow-hidden">
            <div
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl font-bold cursor-pointer z-10"
            >
              &#10005;
            </div>

            {/* Custom Arrows */}
            <button
              onClick={() => sliderRef.current.slickPrev()} // Use slickPrev()
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black z-50 text-4xl"
            >
              &#10094;
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()} // Use slickNext()
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black z-50 text-4xl"
            >
              &#10095;
            </button>

            <Slider ref={sliderRef} {...settings}>
              {data.slice().reverse().map((image, index) => (
                <div key={index}>
                  <img
                    src={image?.photo?.secure_url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-[400px] object-contain rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery2;
