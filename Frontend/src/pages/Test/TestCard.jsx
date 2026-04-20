import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importing the icons
import icon1 from "../../assets/testicon/icon1.avif";
import icon2 from "../../assets/testicon/bone.jpg";
import icon3 from "../../assets/testicon/cardio.jpg";
import icon4 from "../../assets/testicon/ctscan.jpg";
import icon5 from "../../assets/testicon/dopler.jpg";
import icon6 from "../../assets/testicon/ecg.jpg";
import icon7 from "../../assets/testicon/mamogram.jpg";
import icon8 from "../../assets/testicon/mri.jpg";
import icon9 from "../../assets/testicon/pathology.jpg";
import icon10 from "../../assets/testicon/petct.jpg";
import icon11 from "../../assets/testicon/radionuclide.avif";
import icon12 from "../../assets/testicon/utrasound.jpg";
import icon13 from "../../assets/testicon/xray.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestData } from "../../Redux/slice/testSlice";

// Updated tests array with icons
const tests = [
  { id: 1, name: "MRI Scan", category: "MRI", price: 5000, icon: icon8 },
  { id: 2, name: "CT Scan", category: "CT Scan", price: 3000, icon: icon4 },
  { id: 3, name: "Ultrasound", category: "Ultrasound", price: 1500, icon: icon12 },
  { id: 4, name: "Blood Test", category: "Blood Tests", price: 800, icon: icon1 },
  { id: 5, name: "X-Ray", category: "X-Ray", price: 1000, icon: icon13 },
  { id: 6, name: "ECG", category: "ECG", price: 1200, icon: icon6 },
  { id: 7, name: "Radionuclide Therapy", category: "Radionuclide Therapies", price: 15000, icon: icon11 },
  { id: 8, name: "Pathology Test", category: "Pathology", price: 2000, icon: icon9 },
  { id: 9, name: "PET CT Scan", category: "PET CT", price: 10000, icon: icon10 },
  { id: 10, name: "Gamma Scans", category: "Gamma Scans", price: 12000, icon: icon3 },
  { id: 11, name: "Mammograph", category: "Mammograph", price: 3500, icon: icon7 },
  { id: 12, name: "OPG Scan", category: "OPG", price: 2500, icon: icon2 },
  { id: 13, name: "DEXA Scan", category: "DEXA", price: 4000, icon: icon5 },
  { id: 14, name: "Neurology Test", category: "Neurology", price: 4500, icon: icon6 },
  { id: 15, name: "Cardiology Test", category: "Cardiology", price: 6000, icon: icon3 },
  { id: 16, name: "Cardiology Test", category: "Cardiology", price: 6000, icon: icon3 },
];

const TestCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { testData, loading, error } = useSelector((state) => state.test)



  const fetchData = async () => {
    const response = await dispatch(fetchTestData())
  }

  useEffect(() => {
    fetchData()
  }, [])




  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-80 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="py-10 lg:py-16">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-4 max-w-7xl mx-auto">
          {testData.map((test, index) => (
            <div key={test._id} className="relative">
              {/* Card */}
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300  relative z-10 min-h-[120px] flex flex-col justify-between cursor-pointer" onClick={() => {
                // Check if the test name is 'pathology'
                if (test?.testName === "Pathology Test") {
                  // Navigate to the pathology page
                  navigate(`/pathology`, {
                    state: { ...test },
                  });
                } else {
                  // Navigate to the test page with the test name
                  navigate(`/find/test/${encodeURIComponent(test?.testName)}`, {
                    state: { ...test },
                  });
                }
              }}>
                {/* Content */}
                <div className="text-center mt-8 p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {test?.testName}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-100 p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                    onClick={() => {
                      // Check if the test name is 'pathology'
                      if (test?.testName === "Pathology Test") {
                        // Navigate to the pathology page
                        navigate(`/pathology`, {
                          state: { ...test },
                        });
                      } else {
                        // Navigate to the test page with the test name
                        navigate(`/find/test/${encodeURIComponent(test?.testName)}`, {
                          state: { ...test },
                        });
                      }
                    }}
                  >
                    View More
                  </button>

                </div>
              </div>

              {/* Icon */}
              <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-26 h-26 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center">
                  <img
                    src={test?.testPhoto?.secure_url}
                    alt="testPhoto"
                    className="w-16 h-16 object-contain cursor-pointer"
                    onClick={() => {
                      // Check if the test name is 'pathology'
                      if (test?.testName === "Pathology Test") {
                        // Navigate to the pathology page
                        navigate(`/pathology`, {
                          state: { ...test },
                        });
                      } else {
                        // Navigate to the test page with the test name
                        navigate(`/find/test/${encodeURIComponent(test?.testName)}`, {
                          state: { ...test },
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default TestCard;
