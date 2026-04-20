import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import s1 from '../../assets/banner/banne1.jpg';
import s2 from '../../assets/banner/banner2.jpg';
import img1 from '../../assets/home/service/blood-test.png';
import img2 from '../../assets/home/service/conversation.png';
import img3 from '../../assets/home/service/ct-scan.png';
import img4 from '../../assets/home/service/healthcare.png';
import slider1 from '../../assets/Slider-Banner/scbanner.jpg'
import slider2 from '../../assets/Slider-Banner/ct.jpg'
import slider3 from '../../assets/Slider-Banner/mri.jpg'
import slider4 from '../../assets/Slider-Banner/pet.jpg'
import SearchForm from './SearchForm';
import SliderServiceCard from './SliderServiceCard';
import pattern from '../../assets/pattern/patter4.png'
import bgImage from '../../assets/pattern/pattern4.avif'
import icons1 from '../../assets/slider-icon/medical.png'
import icons2 from '../../assets/slider-icon/package.png'
import icons3 from '../../assets/slider-icon/vacuum-test-tubes.png'
import { FaCalendarCheck, FaClipboardList, FaHeadset } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '../../Redux/slice/teamSlice';


const HomeSlider = () => {

  const { bannerData, loading, error } = useSelector((state) => state.team)
  const dispatch = useDispatch()



  const fetchData = async () => {
    const response = await dispatch(fetchBanner("banner1"))
  }



  useEffect(() => {
    fetchData()
  }, [dispatch])




  const services = [
    {
      id: 1,
      icon: icons1,
      title: "Health Packages",
      description: "Exclusive health packages lorem Lorem ipsum dolor sit amet cupiditate.",
    },

    {
      id: 2,
      icon: icons2,
      title: "Our Scans",
      description: "Exclusive health packages lorem Lorem ipsum dolor sit amet cupiditate.",
    },
    {
      id: 3,
      icon: icons3,
      title: "Our Lab Tests",
      description: "Exclusive health packages lorem Lorem ipsum dolor sit amet cupiditate.",
    },
  ];

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // For tablets or small laptops
        settings: {
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 600, // For small tablets and large phones
        settings: {
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480, // For phones
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section >
      <div className="flex flex-col lg:flex-row w-full lg:gap-4 px-4 lg:px-2 items-stretch">
        {/* Slider Section */}
        <div className="w-full lg:w-[60%]  flex flex-col">
          <Slider {...settings} className="w-full flex-1">


            {bannerData.map((val, index) => {
              return (
                <div key={index + 1} className="w-full h-full">
                  <img src={val?.photo?.secure_url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              )
            })}
          </Slider>
        </div>

        {/* Search Form Section */}
        <div className="w-full lg:w-[40%] bg-white rounded-lg shadow-md flex flex-col ">
          <SearchForm className="flex-1" />
        </div>


      </div>

    </section>
  );
};

// Custom next arrow component
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-main text-white rounded-full p-3 cursor-pointer hover:bg-[#1f708e] z-10"
      onClick={onClick}
    >
      <FaArrowRight size={20} />
    </div>
  );
};

// Custom previous arrow component
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-main text-white rounded-full p-3 cursor-pointer hover:bg-[#1f708e] z-10"
      onClick={onClick}
    >
      <FaArrowLeft size={20} />
    </div>
  );
};

export default HomeSlider;
