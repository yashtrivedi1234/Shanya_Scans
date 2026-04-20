import React, { useState } from 'react';
import { FaHeartbeat, FaRegDotCircle, FaStethoscope } from 'react-icons/fa'; 


const ServiceCards = () => {
  const [activeCard, setActiveCard] = useState(0); // State to track the active card for color change

  // Define cards data (titles, descriptions, and icons)
  const cards = [
    {
      title: "Health Packages",
      description:
        "Comprehensive health check-up packages tailored to your needs. Stay healthy and informed.",
      icon: <FaHeartbeat size={40} />,
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600", // Gradient color for the first card
    },
    {
      title: "Scanning Consultations",
      description:
        "Advanced scanning services including MRI, CT, and ultrasound for accurate diagnosis.",
      icon: <FaRegDotCircle size={40} />,
      bgColor: "bg-white", // Default background color
    },
    {
      title: "Tests & Diagnostics",
      description:
        "Complete range of diagnostic tests, including blood tests, genetic analysis, and more.",
      icon: <FaStethoscope size={40} />,
      bgColor: "bg-white", // Default background color
    },
  ];

  // Handle hover effect to change background color
  const handleHover = (index) => {
    setActiveCard(index);
  };

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl absolute mx-auto bottom-[-12rem] left-[14rem]">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out transform ${card.bgColor} ${
            activeCard === index ? 'scale-105' : ''
          }`}
          onMouseEnter={() => handleHover(index)} // Trigger color change on hover
          onMouseLeave={() => handleHover(-1)} // Reset on mouse leave
        >
          <div className="flex items-center mb-4">
            <div className="text-white mr-4">{card.icon}</div>
            <h3 className="text-gray-800 font-semibold text-xl">{card.title}</h3>
          </div>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
