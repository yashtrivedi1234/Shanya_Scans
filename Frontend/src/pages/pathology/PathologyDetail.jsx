import React, { useEffect, useState } from "react";
import img1 from '../../assets/testdetails/icon1.png';
import img2 from '../../assets/testdetails/icon2.png';
import img3 from '../../assets/testdetails/icon3.png';
import img4 from '../../assets/testdetails/icon4.png';
import { FaUsers, FaRupeeSign, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { FaClock, FaUtensils, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import pattern from '../../assets/pattern/pattern4.avif'
import pattern2 from '../../assets/pattern/pattern10.avif'
import pattern1 from '../../assets/pattern/pattern9.avif'
import Instruction from "../Test/TestInstruction";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageDetails } from "../../Redux/slice/package.slice";
import SkeletonPackageDetail from "./SkeletonPackageDetails";
import { fetchPathologyDetails } from "../../Redux/slice/testSlice";
import ServiceInstruction from "../ServiceOffered/ServiceInstruction";


const features = [
  { icon: FaUsers, text: "1.5 lakh+ patients test with us every month" },
  { icon: FaRupeeSign, text: "Patients save an average of ₹700 on each scan" },
  { icon: FaShieldAlt, text: "ISO and NABH certified scan centers" },
  { icon: FaCheckCircle, text: "100% reliable and accurate reports" }
];


const PathologyMoreDetail = () => {
  const [language, setLanguage] = useState("english");
  const toggleLanguage = () => setLanguage(language === "english" ? "hindi" : "english");
  const navigate = useNavigate()
  const { slug } = useParams();
  const dispatch = useDispatch()

  const { pathologyDetail, loading, error } = useSelector((state) => state.test)

  const parameters = [
    "Serum Electrolytes profile(03)",
    "Iron Studies(03)",
    "LIVER Function Test(1)",
    "Lipid Profile(8)",
    "Thyroid Profile(03)",
    "Kidney Profile(07)",
    "CBC(28)",
    "HBA1C(1)",
    "25 OH Vitamin D",
    "Vitamin B12",
    "BSF",
  ];

  const fetchDetail = async () => {
    const response = await dispatch(fetchPathologyDetails(slug))

  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (val) => {
    const data = {
      name: val?.testDetailName,
      rate: val?.testPrice,
      category:val?.testDetailName,
      orderType:"pathology"
    }
    navigate("/scan/checkout", { state: Array.isArray(data) ? data : [data] });
  }


  useEffect(() => {
    fetchDetail()
  }, [])



  return (
    <section className="py-2 sm:py-4 lg:py-6  bg-gray-50">
      {loading ? <SkeletonPackageDetail /> :
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-2">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#1F509A] to-[#3b76d0] md:p-4 p-2 text-white  flex flex-col md:flex-row items-start justify-between">
            <div>
              <h2 className="md:text-2xl text-xl font-bold text-white">
                {(pathologyDetail?.testDetailName || "")
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h2>

              <p className="text-sm text-white">Shanya Scans & Theranostics – Uttar Pradesh’s No. 1 Diagnostic Centre in Lucknow for Accurate & Reliable Testing!</p>
            </div>

            <div className=" flex flex-col  justify-between md:items-center items-start">
              <div className="text-lg font-bold text-[#dfdbdb]">₹{pathologyDetail?.testPrice}/- </div>
              <button className="bg-yellow text-black px-10 py-2 rounded-lg mt-2 md:mt-0" onClick={() => handleClick(pathologyDetail)}>Book Now</button>
            </div>

          </div>

          <div className="lg:p-5 mt-4">
            {/* Test Details */}
            <p className="text-gray-700">
              <div className="text-justify"
                dangerouslySetInnerHTML={{ __html: pathologyDetail?.testRequirement1 }}
              />

            </p>


            {/* Test Features */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[{ img: img1, title: "Parameter Included", value: pathologyDetail?.paramterInclude },
              { img: img2, title: "Free", value: pathologyDetail?.sampleCollection },
              { img: img3, title: "Free", value: pathologyDetail?.reportConsuling },
              { img: img4, title: "Test booked so far", value: "5820+" }].map((item, index) => (
                <div key={index} className="flex items-center gap-4 border border-prime p-4 rounded-lg">
                  <img src={item.img} alt="" className="w-10 h-10" />
                  <div>
                    <p className="text-sm text-gray-600">{item.title}</p>
                    <p className="font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Report & Booking Info */}
            <div className="mt-5 lg:p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {/* Report Time */}
                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                  <FaClock className="text-red-500 w-5 h-5 mb-1" />
                  <p className="text-gray-600">Report Time</p>
                  <p className="font-bold text-main">{pathologyDetail?.reportTime}</p>
                </div>

                {/* Fasting Requirement */}
                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                  <FaUtensils className="text-blue-500 w-5 h-5 mb-1" />
                  <p className="text-gray-600">Fasting</p>
                  <p className="font-bold text-main">{pathologyDetail?.fasting}</p>
                </div>

                {/* Recommended for */}
                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                  <FaUserFriends className="text-green-500 w-5 h-5 mb-1" />
                  <p className="text-gray-600">Recommended for</p>
                  <p className="font-bold text-main">{pathologyDetail?.recommedFor}</p>
                </div>

                {/* Age Range */}
                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                  <FaCalendarAlt className="text-purple-500 w-5 h-5 mb-1" />
                  <p className="text-gray-600">Age</p>
                  <p className="font-bold text-main">{pathologyDetail?.age}</p>
                </div>
              </div>
            </div>


            <div className="relative z-10 lg:flex lg:flex-row hidden  items-center justify-center gap-6 lg:p-8">
              {/* Background Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${pattern2})`,
                  opacity: 2,
                  // filter: "blur(2px)",
                  zIndex: -10,
                }}
              ></div>

              {/* Book Now Button */}
              <button className="bg-yellow text-black px-12 py-4 rounded-[2rem] shadow-lg transition-all duration-300  hover:scale-105" onClick={() => handleClick(pathologyDetail)}>
                Book Now
              </button>

              {/* Call Us Button */}
              <button className="bg-white text-black border border-yellow px-12 py-4 rounded-[2rem] shadow-lg transition-all duration-300 hover:bg-yellow hover:text-white hover:scale-105">
                Call Us
              </button>
            </div>

            {/* Instructions Toggle */}
            {/* <div className="mt-5">
                   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={toggleLanguage}>
                     {language === "english" ? "Show in Hindi" : "Show in English"}
                   </button>
                   <div className="mt-3 p-4 bg-gray-100 rounded-lg">
                     {language === "english" ? (
                       <p className="text-gray-700">Instructions: Please visit the center with a valid ID and follow the necessary health precautions.</p>
                     ) : (
                       <p className="text-gray-700">निर्देश: कृपया वैध आईडी के साथ केंद्र पर जाएं और आवश्यक स्वास्थ्य सावधानियों का पालन करें।</p>
                     )}
                   </div>
                 </div> */}

            {/* Why Choose Us */}
            <div className="mt-5 lg:px-4 gap-4  py-2 bg-white rounded-xl shadow-lg  w-full  relative z-10 flex flex-col-reverse md:flex-row items-start max-w-7xl">
              {/* <div
                     className="absolute inset-0 "
                     style={{
                       backgroundImage: `url(${pattern})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       opacity: 2,
                       zIndex: -10,
                     }}
                   ></div> */}
              <div>


                <h3 className="text-2xl font-semibold text-main text-start mb-5">
                  Why Choose <span className="text-prime">Shanya Scans?</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-100 border rounded-lg shadow-sm  relative z-10">
                      <div
                        className="absolute inset-0 "
                        style={{
                          backgroundImage: `url(${pattern})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          opacity: 2,
                          zIndex: -10,
                        }}
                      ></div>
                      <feature.icon className="text-prime text-5xl" />
                      <span className="text-gray-700 text-lg font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ServiceInstruction data={pathologyDetail} />


            </div>


            {/* How to Book */}
            {/* <div className="mt-5 p-5 bg-white rounded-lg shadow-md">
                   <h3 className="text-xl font-bold text-gray-800">How to Book</h3>
                   <p className="text-gray-700">You can book your test online or call our helpline for assistance.</p>
                 </div> */}

            {/* Our Best Scans */}
            {false &&
              <div className="mt-5 p-5 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-prime">Other Abdominal X-ray</h3>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 relative z-10">
                  {/* <div
                           className="absolute inset-0 "
                           style={{
                             backgroundImage: `url(${pattern2})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             opacity: 2,
                             zIndex: -10,
                           }}
                         ></div> */}
                  {['Abdominal X-ray', 'Cervical X-ray', 'Chest X-ray', 'Knee X-ray', 'Pelvis X-ray'].map((scan, index) => (
                    <div key={index} className="p-3 bg-gray-100 rounded-lg text-gray-800 text-center border shadow-xl font-semibold relative z-10">

                      {scan}
                    </div>
                  ))}
                </div>
              </div>}
          </div>
        </div>
      }
    </section>
  );
};

export default PathologyMoreDetail;