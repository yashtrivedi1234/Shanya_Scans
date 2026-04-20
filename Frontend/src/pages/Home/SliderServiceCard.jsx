import React from "react";

const services = [
  {
    id: 1,
    image: "🔬", // Replace with actual image paths
    discount: "Up to 60% off",
    title: "Blood Tests",
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    image: "🖥️", // Replace with actual image paths
    discount: "Up to 70% off",
    title: "X-Rays, Scans and MRI Tests",
    bgColor: "bg-blue-200"
  },
  {
    id: 3,
    image: "👨‍⚕️", // Replace with actual image paths
    discount: "Up to 75% off",
    title: "Doctor & Diet Consultations",
    bgColor: "bg-red-100"
  },
  {
    id: 4,
    image: "💊", // Replace with actual image paths
    discount: "Flat 55% off",
    title: "Herbved+ Supplements",
    bgColor: "bg-red-200"
  },
  {
    id: 5,
    image: "🧬", // Replace with actual image paths
    discount: "Up to 70% off",
    title: "Genetic Testing",
    bgColor: "bg-pink-100"
  },
  {
    id: 6,
    image: "📜", // Replace with actual image paths
    discount: "",
    title: "Upload Prescription",
    bgColor: "bg-blue-100"
  }
];

const SliderServiceCard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg shadow-lg flex flex-col items-center ${service.bgColor}`}
          >
            <div className="text-4xl mb-2">{service.image}</div>
            {service.discount && (
              <span className="text-sm bg-white px-2 py-1 rounded-full text-blue-600 font-semibold">
                {service.discount}
              </span>
            )}
            <p className="text-center text-gray-800 font-medium mt-2">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderServiceCard;
