import React from 'react';
import BreadCrumbs from '../../component/BreadCums';

const TeamDetail = () => {
  // Doctor's details for Dr. Narvesh Kumar
  const doctorDetails = {
    name: "Dr. Narvesh Kumar",
    education: "MD and PDCC (SGPI)",
    designation: "Ex Consultant and HOD at Apollo Medics LKO",
    specialty: "Specialist in Nuclear Medicine",
    aboutShanya: "At Shanya Path Labs, we are committed to offering precise diagnostic services with cutting-edge technology. I am proud to be part of a team that provides the highest level of care and medical accuracy to our patients.",
    image: "path_to_doctor_image.jpg"  // Replace this with the actual image path
  };

  return (
    <div className="mx-auto p-6 max-w-7xl ">
      {/* Breadcrumbs Section */}
      <BreadCrumbs />

      {/* Doctor's Details Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Specialist</h1>
        
        {/* Doctor's Image and Name */}  
        <div className="flex items-center gap-6 mb-6">
          <img 
            src={doctorDetails.image} 
            alt={doctorDetails.name} 
            className="w-24 h-24 object-cover rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">{doctorDetails.name}</h2>
            <p className="text-gray-500">{doctorDetails.education}</p>
            <p className="text-gray-600">{doctorDetails.designation}</p>
            <p className="text-gray-600">{doctorDetails.specialty}</p>
          </div>
        </div>

        {/* About the Doctor */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Message from Dr. Narvesh Kumar</h3>
          <p className="text-gray-600">{doctorDetails.aboutShanya}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
