import React, { useEffect } from 'react';
import { FaHospital } from 'react-icons/fa'; // Importing hospital icon
import backgroundImage from '../assets/pattern/pattern1.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const BookNowSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // animation should only happen once on scroll
    });
  }, []);

  return (
    <section className="relative py-12 bg-[#1f708e] ">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8, // Adjust the opacity for a subtle background
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl  mx-auto  px-4 flex flex-col lg:flex-row items-center justify-center gap-[4rem]">
        {/* Hospital Icon */}
        <FaHospital
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white"
          data-aos="fade-up"
        />

        {/* Text and Button Section */}
        <div
          className="flex flex-col items-center   text-center md:text-left "
          data-aos="fade-left"
        >
          {/* Appointment Text */}
          {/* <h1 className=" text-white leading-snug ">
            Book Your Consultation With Best  Gastroenterologist Today
          </h1> */}

          {/* Heading and Button Wrapper */}
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            {/* Heading */}
            <h1 className=" text-white lg:text-start text-center md:w-2/3 font-poppins">
            Book Your Consultation With Best  GI Surgeon Today
            </h1>

            {/* Book Now Button */}
            <Link to={"https://chandanhospital.in/BookAppoinment/Appointment?DoctorId=DR00157"} target='_blank' >
            <button class="button">Book Appoitment Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNowSection;
