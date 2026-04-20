import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamData } from '../../Redux/slice/teamSlice';
import { fetchTestData } from '../../Redux/slice/testSlice';
import { fetchServiceSpecificDetails } from '../../Redux/slice/serviceSlice';
import BreadCrumbs from '../../component/BreadCums';
import ServiceTable from './ServiceTable';
import slugify from 'slugify';

const ServiceDetailsMorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();


  const { serviceDetailData, loading, error } = useSelector((state) => state.service);
  const { testData } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTestData());
    dispatch(fetchServiceSpecificDetails(slug));
    window.scrollTo(0, 0);
  }, [slug]);


  return (
    <div>
      <BreadCrumbs
        headText={serviceDetailData?.serviceDetailName ? ("Best " + serviceDetailData.serviceDetailName + " Centre in Lucknow") : "Loading..."}
        items={[
          { label: "Home", href: "/" },
          { label: "Scan", href: "/scan" },
          { label: serviceDetailData?.serviceDetailName ? (serviceDetailData.serviceDetailName) : "Service" },
        ]}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 ">

        {/* 🔹 Skeleton Loader */}
        {loading ? (
          <div>
            <div className="h-8 w-48 bg-gray-300 rounded-md animate-pulse mb-4"></div> {/* Title */}
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 space-y-4">
                <div className="h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="w-full h-56 md:h-64 bg-gray-300 rounded-md animate-pulse"></div> {/* Image */}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto  py-4 sm:py-6 md:py-8 lg:py-0  ">
              {/* <h3 className=" mb-2 hidden lg:block">{serviceDetailData?.serviceDetailName}</h3> */}
              <div class="mx-auto flex flex-col md:block">
                <img src={serviceDetailData?.servicePhoto?.secure_url} className='float-right  md:mx-6 mt-0  rounded-md shadow-md max-w-[30rem]  max-h-[23rem] object-contain' alt="Main visual" />
                <div
                  className="text-justify p1 py-2 hyphens-auto"
                  dangerouslySetInnerHTML={{
                    __html: serviceDetailData?.serviceDetail,
                  }}
                />
              </div>
            </div>

          </>
        )}
      </div>

      {/* 🔹 Related Procedures Section */}
      {!loading && serviceDetailData && (
        <div>
          <h3 className="text-center relative">
            Related Procedures
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-yellow"></span>
          </h3>
          <ServiceTable state={serviceDetailData} />
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsMorePage;
