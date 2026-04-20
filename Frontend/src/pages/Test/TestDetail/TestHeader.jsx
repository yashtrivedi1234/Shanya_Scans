import React from "react";

const TestHeader = ({data}) => {
  return (
    <div className="relative bg-gray-100 py-10 ">
        
      {/* Orange Background */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-[#1F509A]"></div>

      {/* Main Content Card */}
      <div className="relative max-w-2xl  mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-4">
             {data?.testDetailName}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Also known as{" "}
              {/* <span className="font-semibold">
                Mullerian - inhibiting hormone | Mullerian Hormone | AMH
                Fertility Test | Ovarian Biomarker Test
              </span> */}
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              The AMH test analyses the levels of the anti-Mullerian hormone,
              which corresponds to a person's egg count. The doctor might also
              use an AMH test to help and diagnose an ovarian mass. Although it
              is connected to the egg count, it does not predict fertility.
            </p>
            <p className="mt-4 text-gray-600 text-sm">
              <span className="font-medium">Available everyday:</span> 6:30 AM
              to 10 PM
            </p>
          </div>
          {/* Hero Image */}
          {/* <div className="mt-6 lg:mt-0 lg:ml-6">
            <img
              src="/hero-image.png" // Replace with your image path
              alt="Hero"
              className="w-40 h-40 object-cover rounded-full"
            />
          </div> */}
        </div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <p className="font-medium text-gray-800">Sample(s) required:</p>
            <p className="text-gray-600"> <div dangerouslySetInnerHTML={{ __html: data?.testRequirement1 }} /></p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Preparation required:</p>
            <p className="text-gray-600"><div dangerouslySetInnerHTML={{ __html: data?.testRequirement2 }} /></p>
          </div>
        </div>

        {/* Pricing and Add to Cart */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-xl font-bold text-green-600">₹100</span>
            <span className="line-through text-gray-500">₹137</span>
            <span className="text-green-500 text-sm">27% off</span>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
            Add to Cart
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TestHeader;
