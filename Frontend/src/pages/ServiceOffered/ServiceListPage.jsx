import React, { useEffect } from "react";
import BreadCrumbs from "../../component/BreadCums";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceData, fetchServiceDetailMore } from "../../Redux/slice/serviceSlice";
import ServiceSubListPage from "./ServiceSubListPage";
import pattern1 from '../../assets/pattern/pattern7.png'
import pattern2 from '../../assets/pattern/pattern8.png'

const ServiceListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { moreServiceData,loading,error} = useSelector((state) => state.service);


  useEffect(() => {
  
    if (!moreServiceData.length) {
      dispatch(fetchServiceDetailMore());  // Fetch more service data if not already loaded
    }
  }, [dispatch,  moreServiceData.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/service")) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Popular Scans" },
  ];

  return (
    <div className=" bg-gray-100">
      <BreadCrumbs headText={`Best Diagnostic Centre In Lucknow`} items={breadcrumbItems} />
      <div className=" mx-auto container py-12 sm:py-10 lg:py-12 px-6  relative ">
        {Array.isArray(moreServiceData) && <ServiceSubListPage state={moreServiceData} isLoading={loading}/>}
      </div>  
    </div>
  );
};

export default ServiceListPage;
