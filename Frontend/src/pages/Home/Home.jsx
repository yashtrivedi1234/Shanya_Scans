import React, { useEffect } from 'react'
import HomeSlider from './HomeSlider'
import Blog from '../Blogs/Blogs'
import ServicePage from '../Service/ServicePage'
import HeroHeader from '../../component/TestHeader'
import HowItWorks from '../../component/HowWeWork'
import Feature from './Feature'
import BookNowSection from '../../component/BookingSection'
import OurService from '../Service/OurServices'
import HomeAbout from './HomeAbout'
import Stats from '../../component/Stats'
import ClinicStats from '../../component/ClientStat'
import PackageCard from '../Package/PackageCard'
import Package from '../Package/Package'
import Blog14 from '../Package/PackageCard'
import CheckUpList from './CheckUpList'
import ListTest from './ListTest'
import DiagnosticTests from './DignosisTest'
import CTA from '../../component/CTA'
import WhyChooseSanya from '../../component/WhyWeChoose'
import WhyWe from '../../component/WhyWe'
import Bk from '../../component/Bk'
import { useLocation } from 'react-router-dom'
import HomePackages from './HomePacakageCard'
import LabTestSlider from '../Tests/LabTest'
import Add1 from '../Adds/Add1'
import HealthConditions from '../Tests/HealthTest'
import Add2 from '../Adds/Add2'
import HomeService from './HomeService'



const Home = () => {

   const location=useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);


  return (
    <div >

      <HomeSlider/>
      <HomeAbout/>
      <LabTestSlider/>
        <Add1/>
      <HealthConditions/>  
      {/* <Add2/> */}
      <Add2/>
      <DiagnosticTests/>
      <HomeService/>
      <ClinicStats/>
      {/* <ServicePage/> */}
      <Feature/>
      <Blog14/>
      <HowItWorks/>
      <WhyWe/>
      <Blog/>
    </div>
  )
}

export default Home