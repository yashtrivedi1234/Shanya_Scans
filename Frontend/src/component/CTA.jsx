import React from "react";
import img from '../assets/home/cta.jpg'

const CTA = () => {
  return (
    <div className="">
      <div className="mx-auto">
        <div
          className="relative z-20 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
          style={{
            backgroundImage:
              "linear-gradient(to left bottom, #1F509A, #1b477f, #163f66, #12374d, #0e2f36)",
          }}
        >
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-8 lg:py-16 lg:pr-0">
            <div className="lg:self-center">
              <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span className="block">  Reliable Pathology Tests for Your Health Needs</span>
              </h2>
              {/* <p className="mt-4 text-base leading-6 text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p> */}
              <p className="mt-4 text-base leading-6 text-dark-blue-800"></p>
              <a
                href="#"
                target="_blank"
                style={{ backgroundColor: "#000" }}
                className="mt-8 border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base leading-6 font-medium text-white transition duration-150 ease-in-out"
              >
                Book  Appointment
              </a>
              {/* <a href="#" target="_blank" className="ml-4 mt-8 text-white font-bold text-sm underline">
                Learn more
              </a> */}
            </div>
          </div>
          <div className="relative pb-3/5 -mt-6 md:pb-1/2">
            <img
              className="absolute inset-0 w-full h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-10 lg:translate-y-20"
              src={img}
              alt="CTA Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
