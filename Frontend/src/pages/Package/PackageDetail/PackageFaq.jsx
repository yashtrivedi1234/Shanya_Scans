import React, { useState } from 'react'

    const faqData = [
        {
          question: "What is included in the Full Body Checkup?",
          answer: "The checkup includes tests for diabetes, liver, kidney, thyroid, and more, covering 91 parameters.",
        },
        {
          question: "How do I prepare for the test?",
          answer: "You need to fast for 10-12 hours before the test.",
        },
        {
          question: "How long will it take to get the reports?",
          answer: "Reports will be available within 7 hours of sample collection.",
        },
        {
          question: "Is this test suitable for all age groups?",
          answer: "Yes, this test is designed for individuals of all age groups.",
        },
      ];
    


const PackageFaq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleFaq = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-2">
        <h3 className=" font-semibold  mb-4 lg:text-xl ">Frequently Asked Questions</h3>
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-md font-normal text-gray-700 text-2xl">{faq.question}</h3>
              <span className="text-gray-600">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="text-2sm font-normal text-gray-600 max-w-[25rem]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

export default PackageFaq