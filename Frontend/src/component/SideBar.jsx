import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaServicestack, FaHeartbeat, FaImages, FaBlog, FaPhoneAlt, FaPlus, FaSnapchatGhost, FaLandmark } from 'react-icons/fa';
import { fetchPackageData, fetchServiceData } from '../Redux/slice/package.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Md11Mp, MdLabel, MdReviews, MdThermostatAuto } from 'react-icons/md';

const Sidebar = ({handleSideBar}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHealthPackageOpen, setIsHealthPackageOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const dispatch = useDispatch();

  const { packageData, loading, error } = useSelector((state) => state.package);
  const { serviceData } = useSelector((state) => state.service);

  const fetchPackage = async () => {
    await dispatch(fetchPackageData());
  };

  const fetchService = async () => {
    await dispatch(fetchServiceData());
  };

  // const handleSideBar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }


  useEffect(() => {
    fetchService();
  }, []);

  useEffect(() => {
    fetchPackage();
  }, []);

  const toggleServiceDetails = (serviceName) => {
    if (activeService === serviceName) {
      setActiveService(null);
    } else {
      setActiveService(serviceName);
    }
  };

  return (
    <div className='z-auto'>
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`transition-all transform fixed top-0 left-0 z-60 w-64 h-full text-white  pt-1 pb-2 overflow-y-auto bg-gradient-to-r block lg:hidden from-blue-600 to-blue-800 dark:border-neutral-700 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <nav className="flex flex-col items-start px-2 py-2   ">
          <ul className=" w-full ">
            {/* Home */}
            <li>
              <Link to={"/"} className="flex items-center gap-x-4 py-3 px-2 text-lg font-medium rounded-lg border-b-2 border-white hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaHome className="text-xl" />
                Home
              </Link>
            </li>

            {/* About Us */}
            <li className="relative ">
              <button
                type="button"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center gap-x-4 py-3 px-2 text-lg font-medium rounded-lg  border-b-2 border-white  hover:bg-blue-500 transition-all w-full"
              >
                <FaUserAlt className="text-lg" />
                About Us
                <svg
                  className={`ms-auto transform ${isAboutOpen ? 'rotate-180' : ''} transition-transform duration-300`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isAboutOpen && (
                <div className="ml-2 space-y-2">
                  <Link to={"/about"} className="block px-2 py-2 text-sm rounded-lg hover:bg-blue-500 border-b-2 border-white transition-all" onClick={() => handleSideBar()}>
                    About Shanya Global
                  </Link>
                  <Link to={"/about/team"} className="block px-2 py-2 text-sm rounded-lg hover:bg-blue-500 border-b-2 border-white  transition-all" onClick={() => handleSideBar()}>
                    Our Team
                  </Link>
                  <Link to={"/about/management"} className="block px-2 py-2 text-sm rounded-lg hover:bg-blue-500 border-b-2 border-white  transition-all" onClick={() => handleSideBar()}>
                    Our Management
                  </Link>
                  <Link to={"/director-message"} className="block px-2 py-2 text-sm rounded-lg border-b-2 border-white  hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                    Director's Message
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link to={"/scan"} className="flex items-center gap-x-4 py-3 px-2 text-lg font-medium rounded-lg  border-b-2 border-white  hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <MdThermostatAuto className="text-xl" />
               X-Rays & Scan
              </Link>
            </li>

            <li>
              <Link to={"/pathology"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <MdLabel className="text-xl" />
                Blood Test
              </Link>
            </li>

            <li>
              <Link to={"/package"} className="flex items-center gap-x-4 py-3 px-2  border-b-2 border-white  text-lg font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaHeartbeat className="text-xl" />
                Health Package
              </Link>
            </li>

   






            {/* Services */}


            {/* Health Package */}
            {/* <li className="relative">
              <button
                type="button"
                onClick={() => setIsHealthPackageOpen(!isHealthPackageOpen)}
                className="flex items-center gap-x-4 py-3 px-4 text-lg font-medium rounded-lg hover:bg-blue-500 transition-all"
              >
                <FaHeartbeat className="text-xl" />
                Health Package
                <svg
                  className={`ms-auto transform ${isHealthPackageOpen ? 'rotate-180' : ''} transition-transform duration-300`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isHealthPackageOpen && (
                <div className="ml-6 space-y-2">
                  {packageData.map((val, index) => (
                    <Link
                      to={`/package/${val?.packageName}`}
                      state={val}
                      className="block py-2 text-sm rounded-lg hover:bg-blue-500 transition-all"
                      key={index}
                      onClick={()=>handleSideBar()}
                    >
                      {val?.packageName}
                    </Link>
                  ))}
                </div>
              )}
            </li> */}

            {/* Gallery */}
            <li>
              <Link to={"/gallery"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaImages className="text-xl" />
                Gallery
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link to={"/blog"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaBlog className="text-xl" />
                Blog
              </Link>
            </li>

            <li>
              <Link to={"/book-home-collection"} className="flex items-center gap-x-4  border-b-2 border-white  py-3 px-2 text-lg font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaPlus className="text-xl" />
                Book Home Collection
              </Link>
            </li>

            <li>
              <Link to={"/review"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <MdReviews className="text-xl" />
                Review
              </Link>
            </li>

            <li>
              <Link to={"/carrer"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <MdReviews className="text-xl" />
                Career
              </Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link to={"/contact"} className="flex items-center gap-x-4 py-3 px-2 text-lg  border-b-2 border-white  font-medium rounded-lg hover:bg-blue-500 transition-all" onClick={() => handleSideBar()}>
                <FaPhoneAlt className="text-xl" />
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* End Sidebar */}
    </div>
  );
};

export default Sidebar;
