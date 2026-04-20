import { useState } from "react";

const Instruction = ({ data }) => {
  const [isEnglish, setIsEnglish] = useState(true);

  const instructions = {
    english: `
      <ul class='list-disc pl-5 space-y-2'>
        <li>Fasting: 4-6 hours prior to the scan.</li>
        <li>Duration of the scan: 30-60 minutes.</li>
        <li>Radioactive Injection: Used for detailed imaging.</li>
        <li>Post-scan: Drink plenty of fluids to eliminate radioactive material.</li>
              <li>Duration of the scan: 30-60 minutes.</li>
        <li>Radioactive Injection: Used for detailed imaging.</li>
        <li>Post-scan: Drink plenty of fluids to eliminate radioactive material.</li>
      </ul>
    `,
    hindi: `
      <ul class='list-disc pl-5 space-y-2'>
        <li>स्कैन से 4-6 घंटे पहले उपवास करें।</li>
        <li>स्कैन की अवधि: 30-60 मिनट।</li>
        <li>रेडियोधर्मी इंजेक्शन: विस्तृत इमेजिंग के लिए।</li>
        <li>पोस्ट-स्कैन: रेडियोधर्मी पदार्थ को बाहर निकालने के लिए खूब पानी पिएं।</li>
             <li>स्कैन की अवधि: 30-60 मिनट।</li>
        <li>रेडियोधर्मी इंजेक्शन: विस्तृत इमेजिंग के लिए।</li>
        <li>पोस्ट-स्कैन: रेडियोधर्मी पदार्थ को बाहर निकालने के लिए खूब पानी पिएं।</li>
      </ul>
    `,
  };

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

          dangerouslySetInnerHTML={{ __html: isEnglish ? data?.instructionEnglish : data?.instructionHindi }}
        />

      </div>
    </div>
  );
};

export default Instruction;
