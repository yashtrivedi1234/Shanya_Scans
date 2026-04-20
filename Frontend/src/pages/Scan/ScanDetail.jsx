import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../component/BreadCums';
import ServiceCard from '../Service/ServiceCard';
import { useLocation } from 'react-router-dom';
import ServiceTable from '../ServiceOffered/ServiceTable';
import OurTeam from '../About/OurTeam';
import ServiceDoctor from '../ServiceOffered/ServiceDoctor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamData } from '../../Redux/slice/teamSlice';

const ScanDetail = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services" },
  ];


  const location = useLocation();
  const dispatch = useDispatch()
  const { teamData, loading, error } = useSelector((state) => state.team)
  const { testData } = useSelector((state) => state.test)





  const { state } = location;
  const { data } = state; // Extracting data passed via state

  const stripHTMLTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const fetchDoctor = async () => {
    const response = await dispatch(fetchTeamData())
  }


  const fetchData = async () => {
    const response = await dispatch(fetchTestData())
  }

  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    fetchDoctor()
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  const relatedDoctor = teamData.filter(val => {

    return val?.refService === data?.serviceDetailName;
  });











  return (
    <div>
      {/* BreadCrumbs component for navigation */}
      <BreadCrumbs headText={data?.serviceDetailName} items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12">
        <h3 className=" mb-2">{data?.serviceDetailName}</h3>
        <div class="mx-auto flex flex-col md:block">
          <img src={data?.servicePhoto?.secure_url} className='float-right m-4 md:mx-6 mt-0  rounded-md shadow-md max-w-[30rem]' alt="Main visual" />
          <div
            className="text-justify p1"
            dangerouslySetInnerHTML={{
              __html: data?.serviceDetail,
            }}
          />
        </div>
      </div>


      {/* our doctors */}
      {relatedDoctor && relatedDoctor.length != 0 &&
        <div className='mx-auto  '>
          <h3 className="text-center relative">
            Our Expert Doctors and Technician
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-blue-500"></span>
          </h3>
          <div className='flex justify-center'>
            <ServiceDoctor data={relatedDoctor} />
          </div>


        </div>}


      {/* ServiceCard component */}

      {data && data != 0 &&
        <div>
          <h3 className="text-center relative">
            Related Procedures
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-blue-500"></span>
          </h3>
          <ServiceTable state={data} test={testData} />
        </div>
      }




    </div>
  );
};

export default ScanDetail;
