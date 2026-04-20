import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import img1 from '../../assets/image-slider/scanner.png';
import img2 from '../../assets/image-slider/slider1.jpeg';
import img3 from '../../assets/image-slider/scanner.png';
import img4 from '../../assets/image-slider/path.jpg';
import img5 from '../../assets/image-slider/member.png';
import img6 from '../../assets/image-slider/ambul.png';
import { Link } from 'react-router-dom';

const imageList = [
  { image: img1, url: "/scan" },
  { image: img6, url: "/contact" },
  { image: img2, url: "/package" },
  { image: img4, url: "/pathology" },
  { image: img5, url: "/contact" },


];

const NextArrow = ({ onClick }) => (
  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-70" onClick={onClick}>
    <FaArrowRight size={20} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-70" onClick={onClick}>
    <FaArrowLeft size={20} />
  </div>
);

const Add2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className='py-10'>
      <div className="w-full max-w-7xl mx-auto">
        <Slider {...settings}>
          {imageList.map((val, index) => (
            <Link to={val.url} key={index} className="flex justify-center px-2">
              <div className="w-full max-h-[50rem] flex items-center justify-center">
                <img 
                  src={val.image} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-contain rounded-lg "
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Add2;
