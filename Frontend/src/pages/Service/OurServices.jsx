import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import p1 from '../../assets/pattern/pattern-11.png'

import { Link } from 'react-router-dom';
import { FaUserMd } from 'react-icons/fa';
import Service from './Service';
import ServicePage from './ServicePage';

const OurService = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });

        // Handle scroll refresh
        const handleScroll = () => {
            AOS.refresh();
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="py-[2rem] flex flex-col gap-8 bg-white relative">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 hidden lg:block"
                style={{
                    backgroundImage: `url(${p1})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'left',
                    opacity: 0.5,
                    width: '40%',
                    left: '0',
                }}
            ></div>
             <ServicePage/>
        </div>
    );
};

export default OurService;
