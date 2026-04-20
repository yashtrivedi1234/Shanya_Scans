import React, { useEffect } from "react";
import BreadCrumbs from "../../component/BreadCums";
import img1 from "../../assets/services/service1.jpg";
import img2 from "../../assets/services/service2.png";
import img3 from "../../assets/services/service3.jpg";
import img4 from "../../assets/services/service4.jpg";
import img5 from "../../assets/services/service5.png";
import img6 from "../../assets/services/service6.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetails } from "../../Redux/slice/serviceSlice";

const services = [
  { name: "Digital 3.0", img: img1 },
  { name: "Tesla 48 Channel MRI", img: img2 },
  { name: "128 Slice High Speed CT Scan", img: img3 },
  { name: "Ultrasound (3D/4D / Dopplers/ TIFFA)", img: img4 },
  { name: "Guided Interventions", img: img5 },
  { name: "Digital X-Ray", img: img6 },

];

const ServiceList = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const { serviceName } = useParams();

  const { serviceDetailData, loading, error } = useSelector((state) => state.service)

  const { state } = location



  const fetchData = async () => {
    if (!state?._id) return; // Prevent unnecessary fetch
    try {
      const response = await dispatch(fetchServiceDetails(state._id));
      console.log("Data fetched successfully", response);
    } catch (error) {
      console.error("Error fetching service details", error);
    }
  };


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
    if (state?._id && serviceName) {
      fetchData();
    }
  }, [state?._id, serviceName])


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
    { label: `${serviceDetailData[0]?.serviceId?.serviceName}` },

  ];





  return (
    <div>
      <BreadCrumbs headText={`${serviceDetailData[0]?.serviceId?.serviceName}`} items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16 border border-red-500 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.isArray(serviceDetailData) &&
            serviceDetailData.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl "
              >
                {/* Service Image */}
                <div className="relative group">
                  <img
                    src={service?.servicePhoto?.secure_url}
                    alt={service?.serviceDetailName}
                    className="w-full h-56 object-cover"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                      className="text-white text-lg font-semibold text-center"
                      to={`/service/${encodeURIComponent(
                        service?.serviceDetailName
                      )}/detail`}
                      state={{
                        data: service,
                        data1: serviceDetailData,
                        text: serviceDetailData[0]?.serviceId?.serviceName,
                      }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                {/* Service Content */}
                <div className="px-[2rem] py-[0.7rem]">

                  <Link
                    to={`/service/${encodeURIComponent(
                      service?.serviceDetailName
                    )}/detail`}
                    state={{
                      data: service,
                      data1: serviceDetailData,
                      text: serviceDetailData[0]?.serviceId?.serviceName,
                    }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 hover:text-red-500">
                      {service?.serviceDetailName}
                    </h3>
                  </Link>
                </div>

              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ServiceList;
