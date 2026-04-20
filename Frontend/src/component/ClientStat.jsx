import React, { useEffect } from "react";
import { FaMicroscope, FaVial, FaRegHospital } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import bgimg from "../assets/home/stat_bg.jpg";

const stats = [
  {
    id: 1,
    title: "Tests Conducted",
    count: "50000",
    icon: <FaMicroscope className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 2,
    title: "Years of Excellence",
    count: "2",
    icon: <MdAccessTime className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 3,
    title: "Fully Automated Labs",
    count: "3",
    icon: <FaRegHospital className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 4,
    title: "Tests Available",
    count: "5000",
    icon: <FaVial className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
];

const ClinicStats = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      className="relative py-[4rem] flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Stat Icons and Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 lg:gap-[4rem] justify-items-center">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center w-1/2 sm:w-auto mb-8 sm:mb-0"
              data-aos="fade-up"
              data-aos-delay={index * 200} // staggered animation
            >
              {/* Icon */}
              <div className="mb-4 text-main">{stat.icon}</div>

              {/* Count */}
              <h4 className="text-4xl sm:text-5xl font-extrabold text-main mb-1">
                {stat.count}+
              </h4>

              {/* Title */}
              <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicStats;
