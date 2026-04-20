import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchServiceSpecificDetails } from '../../Redux/slice/serviceSlice';
import BreadCrumbs from '../../component/BreadCums';
import { motion } from "framer-motion"; // For entrance animations


const ServicePageDetails = () => {
  const { serviceDetailData, loading, error } = useSelector((state) => state.service);
  const location = useLocation();
  const dispatch = useDispatch();

  const {name}=useParams()

  
  // Extract data and data1 from location.state
  const { data, data1 ,text} = location.state;


  // Set initial active service based on `data`
  const [activeService, setActiveService] = useState(data);

  // Fetch service details when activeService changes
  useEffect(() => {
    // Listen for changes in the 'name' parameter
    const currentService = data1.find((service) => service.serviceDetailName.toLowerCase() === name.toLowerCase());
    if (currentService) {
      setActiveService(currentService);
    }
  }, [name, data1]);  // Whenever the 'name' or 'data1' changes, update the activeService

  useEffect(() => {
    if (activeService) {
      dispatch(fetchServiceSpecificDetails(activeService._id)); // Fetch service details when activeService changes
    }
  }, [activeService, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



   // Handle Sidebar Click
   const handleSidebarClick = (service) => {
    setActiveService(service);
    const newUrl = `/services/${service.serviceDetailName.toLowerCase()}`;
    window.history.replaceState(null, '', newUrl); // This changes the URL without navigation
  };
  


  return (
    <section className="overflow-x-hidden">
      {/* Breadcrumb */}
      <BreadCrumbs
        headText={activeService?.serviceDetailName}
        items={[
          { label: 'Home', href: '/' },
          // { label:  `${activeService?.serviceName}` },
          { label:  `${text}` },
          { label:  `${activeService?.serviceDetailName}` },
        ]}
        image={activeService?.images?.[0]}
        text={activeService?.serviceDetailName}
      />

      <div className="flex flex-col-reverse md:flex-row max-w-7xl mx-auto gap-4 py-6 px-4 ">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 shadow-lg p-4 h-fit ">
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <ul className="space-y-2">
            {data1.map((service) => (
              <li
                key={service.id}
                className={`flex items-center p-3 cursor-pointer rounded-lg transition duration-300 
                  ${
                    activeService.id === service.id
                      ? 'bg-main text-white'
                      : 'bg-white text-gray-800 hover:bg-[#4A6F8F] hover:text-white ease-in-out duration-500'
                  }`}
                  onClick={() => handleSidebarClick(service)} // Call the handler
              >
                <span className="mr-2 text-xl">{service.icon}</span>
                <span>{service.serviceDetailName}</span>
              </li>
            ))}
          </ul>
          {/* Appointment Booking Section */}
          <div className="w-full bg-main text-white rounded-lg shadow-lg p-6 mx-auto mt-8 relative overflow-hidden">
            <h4 className="text-2xl font-bold mb-2">How to Book An Appointment:</h4>
            <p className="text-gray-200 mb-4">
              If you want to know more, inquire, or connect with us for any assistance, feel free to call us at
              1800-1234-187 or 7233-000-133. Alternatively, click the button below for online booking or contact
            </p>
            <Link to={"/contact"}>
              <button className="bg-white text-main px-6 py-3 rounded-lg font-semibold shadow-md ease-in-out duration-300 transition hover:bg-gray-200">
                Book Appointment
              </button>
            </Link>
            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#84b0d7] rounded-full opacity-50 transform rotate-45"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#84b0d7] rounded-full opacity-50 transform rotate-45"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:w-3/4 w-full ml-auto pl-4 overflow-y-hidden">
          {/* Service Image */}
          <img
            src={serviceDetailData?.servicePhoto?.secure_url}
            alt=""
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          />

          {/* Service Details */}
          <motion.div
            className="bg-white rounded-lg md:p-6 shadow-md pt-4"
            data-aos="fade-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <h3>{serviceDetailData?.serviceDetailName}</h3> */}
            {/* <p className="mb-6 text-lg text-gray-700 text-justify"> */}
              <div dangerouslySetInnerHTML={{ __html: serviceDetailData?.serviceDetail }} className='p1 p2'/>
            {/* </p> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicePageDetails;
