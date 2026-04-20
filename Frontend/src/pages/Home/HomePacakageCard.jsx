import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomePackageCard from '../Package/HomePackageCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import img1 from '../../assets/Package/package1.jpg'
import img2 from '../../assets/Package/Package2.png'
import img3 from '../../assets/Package/Package3.png'
import pattern from '../../assets/home/microshape.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageData } from "../../Redux/slice/package.slice";

import PackageCard from '../Package/PackagesCard';






const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} arrow-next text-black bg-black rounded-full`} onClick={onClick} style={{ display: 'block' }}>
      &#8250; {/* Right Arrow Icon */}
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} arrow-prev  text-black bg-black rounded-full`} onClick={onClick} style={{ display: 'block', colo: 'black' }}>
      &#8249; {/* Left Arrow Icon */}
    </div>
  );
};

const HomePackages = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 4 cards on larger devices by default
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="ezy__blog14 light py-12 lg:pt-12 lg:py-16 text-stone-800 bg-white  dark:text-white overflow-hidden  relative">
      <div
        className="absolute inset-0 hidden lg:block z-0"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: 'contain',
          backgroundPosition: 'left',
          opacity: 0.4,
          width: '40%',
          left: '0',

        }}
      ></div>
      <div className="max-w-7xl px-4 md:px-24 mx-auto border border-red-500">
        <div className="grid grid-cols-1">
          <div className="flex flex-col max-w-xl  justify-center md:items-center md:text-center mx-auto lg:py-10 relative z-10">
            <h3 className="mb-2">
              Our Diagnostic Packages
            </h3>
            <p className="opacity-80">
              Discover budget-friendly health checkup packages in Lucknow, offering reliable tests to help you take care of your health
            </p>

          </div>
        </div>
        <Slider {...settings}>
          {packageData.map((item, i) => (
            <div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
              <HomePackageCard item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HomePackages;




