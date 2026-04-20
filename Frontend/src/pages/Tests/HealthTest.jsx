import React, { useEffect } from 'react';
import Slider from 'react-slick';
import pattern from '../../assets/pattern/feabg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackageTag } from '../../Redux/slice/package.slice';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HealthConditions = () => {
    const dispatch = useDispatch();
    const { packageTag } = useSelector((state) => state.package);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPackageTag());
    }, [dispatch]);

    // Slick carousel settings
    const settings = {
        dots: false,
        infinite: true, // Enables infinite scrolling
        speed: 500,
        autoplay: true, // Enables auto-play
        autoplaySpeed: 2000, // Slide changes every 2 seconds
        slidesToShow: 6,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024, // Tablets
                settings: { slidesToShow: 4, slidesToScroll: 2 }
            },
            {
                breakpoint: 768, // Mobile devices
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            }
        ]
    };

    return (
        <section className="relative z-10 py-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-cover bg-center opacity-50 z-[-10]" style={{ backgroundImage: `url(${pattern})` }}></div>

            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-main">
                    Browse by Health Concern
                </h2>

                {/* Health Condition Slider */}
                <Slider {...settings} className="px-2">
                    {Array.isArray(packageTag) && packageTag.length > 0 &&
                        packageTag.map((condition, index) => (
                            <div key={index} className="px-2">
                                <div
                                    className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer h-36" 
                                    onClick={() => navigate(`/package/${condition?.packageSlugName}`)}
                                >
                                    <img src={condition.icon?.secure_url} alt={condition.packageTagName} className="w-12 h-12 mb-2 object-contain" />
                                    <p className="text-gray-700 text-sm font-medium text-center leading-tight">
                                        {condition.packageTagName}
                                    </p>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        </section>
    );
};

export default HealthConditions;
