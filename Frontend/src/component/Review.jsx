import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BreadCrumbs from './BreadCums';

const ReviewWidget = () => {

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    // { label: 'About ASTITVA CLINIC ' },
    { label: 'Our Reviews' },
   
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      offset: 200, // Offset to trigger animation
      once: true, // Only animate once
    });
  }, []);

   useEffect(() => {
  window.scrollTo(0, 0);
    }, []);

  return (
    <div>
         <BreadCrumbs headText={"Our Review"} items={breadcrumbItems} />
    <div className="flex justify-center items-center p-4 py-10 sm:py-12 md:py-14 lg:py-16 bg-gray-100">

      <iframe
        src="https://widget.tagembed.com/2141048"
        style={{ width: '100%', border: 'none' }}
        className="w-full max-w-7xl h-screen rounded-lg "
        data-aos="fade-up"
        title="Review Widget"
      ></iframe>
    </div>
    </div>
  );
};

export default ReviewWidget;
