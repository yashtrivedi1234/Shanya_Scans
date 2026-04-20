import React, { useEffect } from "react";
import BreadCrumbs from "../../component/BreadCums";
import img1 from "../../assets/services/service1.jpg";
import img2 from "../../assets/services/service2.png";
import img3 from "../../assets/services/service3.jpg";
import img4 from "../../assets/services/service4.jpg";
import img5 from "../../assets/services/service5.png";
import img6 from "../../assets/services/service6.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetails } from "../../Redux/slice/serviceSlice";
import slugify from "slugify";
import PathologySkeleton from "../pathology/PathologySkeleton";


import image from '../../assets/radio/cardioimaging.png'

const services = [
  { name: "Digital 3.0", img: img1 },
  { name: "Tesla 48 Channel MRI", img: img2 },
  { name: "128 Slice High Speed CT Scan", img: img3 },
  { name: "Ultrasound (3D/4D / Dopplers/ TIFFA)", img: img4 },
  { name: "Guided Interventions", img: img5 },
  { name: "Digital X-Ray", img: img6 },

];

const SkeletonLoader = () => (
  <div className="cursor-pointer animate-pulse">
    <div className="bg-gray-300 h-64 w-full mx-auto"></div>
    <div className="px-4 py-[1rem] xl:px-6 border bg-[#F7F7F7]">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);



const DTest = ({ state, isLoading }) => {

  const serviceDetails = state
  const location = useLocation()
  const dispatch = useDispatch()
  const { serviceName } = useParams();
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await dispatch(fetchServiceDetails(state._id))
  }

  const stripHtml = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/service')) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    // { label: 'About ASTITVA CLINIC ' },
    { label: `${serviceDetails[0]?.serviceId?.serviceName}` },

  ];

  return (
    <div>
      {isLoading ? <PathologySkeleton/> :
      <div className=" mx-auto flex-col items-center justify-center container md:px-4 hidden md:flex ">
           <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-main">Our Best   Radiology Service</h2>
          <div
            className={`grid gap-12 justify-center font-poppins  ${serviceDetails.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 w-full mt-8"
              }`}
          >
            {
              Array.isArray(serviceDetails) &&
              serviceDetails.map((service, index) => (

                <div key={state._id} className="relative ">
                  {/* Card */}
                  <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300  relative z-10 min-h-[120px] flex flex-col justify-between cursor-pointer " onClick={() => {
                    navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);
                  }}>
                    {/* Content */}
                    <div className="text-center mt-8 p-4 flex-1">
                      <h3 className="text-[1rem] font-semibold text-gray-800 font-poppins">
                        {service?.serviceDetailName}
                      </h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-100 p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <button
                        className="mt-4 px-4 py-2 bg-yellow text-black rounded-lg shadow  transition"
                        onClick={() => {

                          // Navigate to the test page with the test name
                          navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);

                        }}
                      >
                        View More
                      </button>

                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 z-20 ">
                    <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center p-1 ">
                      <img
                        src={service?.servicePhoto?.secure_url}
                        
                        alt="testPhoto"
                        className="w-16 h-16 object-cover rounded-full"
                        onClick={() => {
                          navigate(`/scan/${slugify(service?.serviceDetailName, { lower: true, strict: true })}`);
                        }}
                      />
                    </div>
                  </div>

                </div>
              ))}

          </div>
        
      </div>
      }
    </div>
  );
};

export default DTest;
