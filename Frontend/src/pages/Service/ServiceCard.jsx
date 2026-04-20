import React from 'react';
import mri from '../../assets/servicelogo/mri.jpg'
import bone  from '../../assets/servicelogo/bone.jpg'
import cardio from '../../assets/serviceList/cardio.png'
import ctscan from '../../assets/serviceList/ctscan.png'
import mamo from '../../assets/serviceList/mammography.png'
import ultra from '../../assets/serviceList/ultrasound.png'
import xray from '../../assets/serviceList/theranostic.png'
import dopler from '../../assets/servicelogo/dopler.jpg'
import pathology from '../../assets/serviceList/path.png'
import neuro from '../../assets/serviceList/neuro.png'
import medicine from '../../assets/serviceList/medicine.png'
import { useNavigate } from 'react-router-dom';

const useClientData = [
  {
    image: ctscan,
    name: "Lab Test",
    service: "Comprehensive CT scan services for detailed imaging and diagnosis of various conditions."
  },
  {
    image: mri,
    name: "Radiodiagnosis",
    service: "High-resolution MRI scans for accurate diagnosis of neurological and musculoskeletal disorders."
  },
  {
    image: medicine,
    name: "Radiodiagnosis",
    service: "State-of-the-art X-ray imaging for diagnosing fractures, infections, and other conditions."
  },
  {
    image: xray, // Assuming you have a fourth logo image
    name: "Theranostics",
    service: "Bone Mineral Density tests for assessing osteoporosis and overall bone health."
  },
  {
    image: cardio,
    name: "Cardiology",
    service: "Mammogram services for early detection of breast cancer and other breast-related health issues."
  },
  {
    image: neuro,
    name: "Neurology",
    service: "Non-invasive ultrasound imaging for monitoring pregnancies, abdominal conditions, and more."
  },
  {
    image: pathology,
    name: "Dental Sciences",
    service: "Doppler ultrasound to assess blood flow, heart conditions, and vascular health."
  },
  {
    image: pathology,
    name: "Dental Sciences",
    service: "Doppler ultrasound to assess blood flow, heart conditions, and vascular health."
  },
  // {
  //   image: cardio,
  //   name: "Cardiology",
  //   service: "Comprehensive cardiology services for diagnosing and treating heart-related conditions."
  // }
];


const ServiceCard = ({ obj , number}) => {


  
  console.log(obj, number);
  const navigate=useNavigate()
  
  return (
    <div className="relative bg-white   rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl h-full flex flex-col">
      
      {/* Angled Decorative Element */}
      <div className="absolute inset-0 w-full h-1/3 bg-gradient-to-tr from-[#122658] to-[#08246b] transform -skew-y-6 -rotate-3 opacity-90 shadow-inner"></div>
      
      {/* Content Section */}
      <div className="relative flex flex-col items-center justify-between flex-1 p-8 z-10 flex-glow">
        {/* Logo or Image */}
        <div className="bg-white p-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
          <img 
            src={obj?.servicePhoto?.secure_url} 
            alt="Service" 
            className="h-20 w-20 object-cover rounded-full border-2 border-gray-200" 
          />
        </div>
        
        {/* Title and Description */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-extrabold text-gray-800">{obj?.serviceName}</h2>
          <p className="text-sm text-gray-600">{obj[number]?.service}</p>
        </div>
        
        {/* Action Button */}
        <button className="mt-4 px-6 py-2 bg-[#122658] text-white text-lg font-semibold rounded-full hover:bg-[#54648a] transition duration-300" onClick={() => navigate(`/service/${obj?.serviceName}`,{ state: { ...obj } }) }  >   
          View More
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;