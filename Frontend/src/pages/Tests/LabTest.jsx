import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/heath-concern/img1.png";
import img2 from "../../assets/heath-concern/img2.png";
import img3 from "../../assets/heath-concern/img3.png";
import img4 from "../../assets/heath-concern/img4.png";
import img5 from "../../assets/heath-concern/img5.png";
import img6 from "../../assets/heath-concern/img6.png";
import img7 from "../../assets/heath-concern/img7.png";
import img8 from "../../assets/heath-concern/img8.png";
import img9 from "../../assets/heath-concern/img9.png";
import img10 from "../../assets/heath-concern/img10.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchPathologyTag } from "../../Redux/slice/testSlice";
import { useNavigate } from "react-router-dom";

const labTests = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const LabTestSlider = () => {
   
  const dispatch=useDispatch()
  const {pathologyTag,loading,error}=useSelector((state)=>state.test)
  const navigate=useNavigate()

  const fetchData=async()=>{
      const response=await dispatch(fetchPathologyTag())      
  }

  useEffect(()=>{
      fetchData()
  },[])



  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2} },
    ],
  };

  return (
    <section className=" mx-auto bg-gray-100 " >
      <div className="max-w-7xl px-6 mx-auto  py-10 sm:py-12 md:py-14 lg:py-10 overflow-x-hidden ">
        {/* <h2 className="text-2xl font-extrabold text-start text-main mb-6 uppercase ">
        Our Lab Tests 
      </h2> */}
        <h2 className="text-gray-800 text-3xl md:text-3xl lg:text-4xl font-extrabold mb-6 text-start">
          <span className="text-main">Frequently</span> Scans &{" "}
          <span className="text-yellow">Lab Test</span>
        </h2>

        <Slider {...settings} className="">
          {pathologyTag.map((service, index) => (
            <div key={index} onClick={()=>navigate(`/pathology/${service?.labSlugName}`)} >
              <div className="relative w-fitrounded-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src={service?.icon?.secure_url}
                  alt={`Test ${index + 1}`}
                  className="w-full h-[10rem]  object-contain  cursor-pointer"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LabTestSlider;
