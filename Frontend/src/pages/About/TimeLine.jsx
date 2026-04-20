import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image from '../../assets/about_photo/misson1.jpeg'

const TimeLine = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Animation triggers every time on scroll
    });
  }, []);

  return (
    <div>
      <div className="relative py-10 lg:py-16 bg-[url(image)] bg-cover bg-center"  style={{ backgroundImage: `url(${image})` }}>
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <h3 className="text-center text-3xl font-extrabold text-white" data-aos="fade-up">
            Our Mission and Vision
          </h3>
          <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid">
            {/* Mission Section */}
            <div className="flex md:contents flex-row-reverse">
              <div className="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto" data-aos="fade-left">
                <h3 className="text-lg font-semibold lg:text-xl">Our Mission</h3>
                <p className="mt-2 leading-6 text-justify">
                  At Shanya Scans & Theranostics, our mission is to deliver the most accurate diagnostic services through advanced technology. We are committed to providing reliable, affordable, and high-quality pathology and radiology services to all our customers.
                </p>
              </div>
              <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto" data-aos="fade-in">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
              </div>
            </div>

            {/* Vision Section */}
            <div className="flex md:contents">
              <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto" data-aos="fade-in">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-indigo-300"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
              </div>
              <div className="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-6 col-end-10 mr-auto" data-aos="fade-right">
                <h3 className="text-lg font-semibold lg:text-xl">Our Vision</h3>
                <p className="mt-2 leading-6 text-justify">
                  Our Vision is to be recognized as the leading Scan and Pathology Lab, establishing new standards for excellence in patient care and innovation. We aspire to create a world where advanced diagnostic services are accessible to all, empowering individuals to make informed health decisions and enhancing the overall well-being of our community.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="flex md:contents flex-row-reverse">
              <div className="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto" data-aos="fade-left">
                <h3 className="text-lg font-semibold lg:text-xl">Our Values</h3>
                <p className="mt-2 leading-6 text-justify">
                  We are dedicated to providing the highest quality diagnostic services, setting benchmarks in accuracy and reliability. Our core values include Compassion, Integrity, Innovation, Accessibility, Collaboration, and Accountability, ensuring a patient-centered approach in everything we do.
                </p>
              </div>
              <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto" data-aos="fade-in">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
              </div>
            </div>

            {/* Community Impact Section */}
            <div className="flex md:contents">
              <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto" data-aos="fade-in">
                <div className="flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-indigo-300"></div>
                </div>
                <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
              </div>
              <div className="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-6 col-end-10 mr-auto" data-aos="fade-right">
                <h3 className="text-lg font-semibold lg:text-xl">Community Impact</h3>
                <p className="mt-2 leading-6 text-justify">
                  By combining cutting-edge diagnostic technology with a patient-first approach, we are helping families lead healthier lives. Shanya Scans is proud to be a trusted partner for diagnostics, ensuring timely and accurate results.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
