import React, { useEffect } from 'react'
import BreadCrumbs from '../../component/BreadCums'
import ClinicStats from '../../component/ClientStat';
import HowItWorks from '../../component/HowWeWork';
import ServicePage from '../Service/ServicePage';
import HomeAbout from '../Home/HomeAbout';
import Faq from '../../component/Faq';
import OurTeam from './OurTeam';
import TimeLine from './TimeLine';
import AboutSanya from './AboutSanya';
import { useLocation } from 'react-router-dom';
import Director from './Director';
import AboutShanya from './AboutSanya';

const About = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    // { label: 'About ASTITVA CLINIC ' },
    { label: 'About Us' }
  ];

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname === '/about') {
      window.scrollTo(0, 0);
    }
  }, [location]);


  return (
    <div>
      <BreadCrumbs headText={"About Shanya Scans & Theranostics"} items={breadcrumbItems} />
      <div className=''>
         <AboutShanya/>
      </div>
      {/* <Director/> */}

      <TimeLine />

      <ClinicStats />

      {/* <OurTeam/> */}
      <Faq />

    </div>

  )
}

export default About