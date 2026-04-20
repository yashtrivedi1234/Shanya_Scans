import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import BreadCrumbs from "../../../component/BreadCums";
import Scroll from "./Scroll";
import PackageFaq from "./PackageFaq";
import { useLocation } from "react-router-dom";

const DemoPackage = () => {
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

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Our  Best Package Detail" },
      ];

      const stripHtml = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        return doc.body.textContent || "";
      };
      

      const location=useLocation()
      const {state}=location


      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
      
  
  return (
    <div>
           <BreadCrumbs headText={"Package Detail"} items={breadcrumbItems} />
    <div className="mx-auto lg:p-6">
      {/* Main Container */}
      <div className="bg-white border rounded-lg shadow-md flex flex-col lg:flex-row mx-auto max-w-7xl ">
        {/* Left Section: Details */}
        <div className="flex-1 p-6">
          <h3 className="text-2xl font-bold">
            {state?.packageCategory}
          </h3>
          <p className="mt-2 text-gray-600">
             {/* {state?.packageOverview} */}
          
             <div
                dangerouslySetInnerHTML={{ __html: state?.packageOverview  }}
            />
          
          </p>    

          <div className="space-y-6">
          {state.packagesParamter.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 mt-6 rounded-lg shadow-md">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{category?.parameterName}</h3>
                <div className="text-gray-600">
                  {isOpen === index ? <FaCaretUp /> : <FaCaretDown />}
                </div>
              </div>

              {/* Drop-down content */}
              {isOpen === index && (
                 <div
                 dangerouslySetInnerHTML={{ __html: category?.description}}
             />
              )}
            </div>
          ))}
        </div>

        </div>

        {/* Right Section: Price Card */}
        <div className=" bg-gray-50 p-6 rounded-r-lg  h-fit  space-y-4">
        
          <Cart data={state}/>
          <PackageFaq/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DemoPackage;
