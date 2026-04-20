import React from 'react';
import checkup from '../../assets/home/health.avif';

const CheckUpList = () => {
  return (
    <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl pb-[10rem]">
      {/* Image Section */}
      <div className="w-full h-64 lg:w-1/2 lg:h-auto">
        <img 
          className="h-full w-full object-cover"
          src={checkup} 
          alt="Home Collection Packages" 
        />
      </div>

      {/* Content Section */}
      <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
        <div className="flex flex-col p-12 md:px-16">
          <h3 >
            Popular Home Collection Packages
          </h3>
          <p className="mt-4 text-gray-700">
            Connect with the best & experienced health experts from the comfort of your home.
          </p>

          {/* Package List */}
          <ul className="mt-6 space-y-3 text-gray-600">
            <li className="font-medium">Express Package 47 Parameters</li>
            <li className="font-medium">Express Package 42 Parameters</li>
            <li className="font-medium">Express Package 52 Parameters</li>
            <li className="font-medium">Basic Health Check-Up At Home</li>
            <li className="font-medium">Master Health Check-Up At Home</li>
            <li className="font-medium">Executive Health Check-Up At Home</li>
            <li className="font-medium">Diabetic Check-Up At Home</li>
          </ul>

          <div className="mt-8">
            <a
              href="#"
              className="inline-block w-full text-center text-lg font-medium text-white bg-green-600 border-2 border-green-600 py-4 px-10 hover:bg-green-800 hover:shadow-md md:w-auto"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckUpList;
