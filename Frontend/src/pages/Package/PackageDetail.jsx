import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../../component/BreadCums";

const PackageDetails = () => {
  const [isOpen, setIsOpen] = useState(null); // Used for handling the open/close of the drop-down
  const packageData = {
    name: "Master Health Checkup at Home (68 Parameters)",
    description: "Comprehensive health package offering detailed tests for overall wellness.",
    details: [
      {
        category: "Hemogram with ESR (19)",
        tests: [
          "TOTAL LEUCOCYTE", "RBC COUNT", "HEMOGLOBIN", "HAEMATOCRIT", "MCV", 
          "MCH", "MCHC", "RDW", "MPV", "NEUTROPHILS", "LYMPHOCYTES", "MONOCYTES", 
          "EOSINOPHILS", "BASOPHILS", "PLATELETS", "PLATELET MORPHOLOGY", 
          "WBC MORPHOLOGY", "RBC MORPHOLOGY", "ESR"
        ]
      },
      {
        category: "Urine Routine (20)",
        tests: ["Urine Sugar", "Urine Protein", "Urine Bilirubin", "Urine Ketones", "Urine pH"]
      },
      {
        category: "Renal Profile (3)",
        tests: ["Serum Urea", "Creatinine", "Uric Acid"]
      },
      // Add more categories as needed...
    ],
    price: "₹3000"
  };

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index); // Toggle the dropdown
  };

  return (
    <section className="overflow-hidden bg-gray-100 py-12">
      <Helmet>
        <title>Package Details - Health Checkup</title>
        <meta name="description" content="Comprehensive health checkup packages offering detailed tests for overall wellness." />
      </Helmet>

      {/* Breadcrumb */}
      <BreadCrumbs headText={packageData.name} items={[{ label: 'Home', href: '/' }, { label: 'Packages' }]} />

      {/* Package Details Section */}
      <div className=" border border-red-500 flex items-center justify-center">
      <div className=" mx-auto p-4 bg-white shadow-lg rounded-lg border border-red-500 max-w-4xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">{packageData.name}</h2>
          <p className="text-lg text-gray-600 mt-4">{packageData.description}</p>
        </motion.div>

        <div className="space-y-6">
          {packageData.details.map((category, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{category.category}</h3>
                <div className="text-gray-600">
                  {isOpen === index ? <FaCaretUp /> : <FaCaretDown />}
                </div>
              </div>

              {/* Drop-down content */}
              {isOpen === index && (
                <ul className="mt-4 pl-6 space-y-2">
                  {category.tests.map((test, i) => (
                    <li key={i} className="text-gray-700 ">
                      - {test}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <span className="text-xl font-semibold text-gray-800">Price: {packageData.price}</span>
          <button className="bg-[#4A6F8F] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition ease-in-out duration-300 hover:bg-[#39596b]">
            Book Now
          </button>
        </div>
      </div>
 
      </div>
    </section>
  );
};

export default PackageDetails;
