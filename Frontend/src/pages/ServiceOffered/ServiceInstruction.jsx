import { useState } from "react";

const ServiceInstruction = ({ data }) => {
  const [isEnglish, setIsEnglish] = useState(true);



  return (
    <div className="w-full max-w-xl mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="flex justify-between items-center p-4 bg-prime text-white">
        <span className="font-semibold">Instruction / निर्देश</span>
        <div className="flex items-center">
          <span className="text-sm mr-2">English</span>
          <button
            className="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 focus:outline-none"
            onClick={() => setIsEnglish(!isEnglish)}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform ${isEnglish ? '' : 'translate-x-5'}`}></div>
          </button>
          <span className="text-sm ml-2">हिन्दी</span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
        <div
          className="text-justify text-sm text-gray-700 p1"

          dangerouslySetInnerHTML={{ __html: isEnglish ? data?.testDetails1 : data?.testDetails2 }}
        />

      </div>
    </div>
  );
};

export default ServiceInstruction;
