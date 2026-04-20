import React from 'react';
import Service from './Service';
import pattern from '../../assets/pattern/pattern-11.png'; // Make sure the path is correct

const ServicePage = () => {
  return (
    <div className="py-[2rem] flex flex-col gap-8  relative">
      {/* Background pattern */}
      <div
                className="absolute inset-0 hidden lg:block"
                style={{
                    backgroundImage: `url(${pattern})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'left',
                    opacity: 0.3,
                    width: '100%',
                
                }}
      ></div>

      {/* Content Section */}
      <div className="flex flex-col max-w-xl justify-center  px-4 md:items-center md:text-center text-start mx-auto lg:py-10 relative z-10">
        <h3 className="text-start">
          Our Best Service
        </h3>
        <p className="text-lg opacity-80">
          We provide the best service of pathology in Lucknow.
        </p>
      </div>

      {/* Call to Service Component */}
      <Service />
    </div>
  );
};

export default ServicePage;
