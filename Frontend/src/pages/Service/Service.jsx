import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ServiceCard from './ServiceCard';
import mri from '../../assets/servicelogo/mri.jpg'
import bone  from '../../assets/servicelogo/bone.jpg'
import cardio from '../../assets/servicelogo/cardio.avif'
import ctscan from '../../assets/servicelogo/ctscan.jpg'
import mamo from '../../assets/servicelogo/mamogram.jpg'
import ultra from '../../assets/servicelogo/ultrasound.jpg'
import xray from '../../assets/servicelogo/xray.avif'
import dopler from '../../assets/servicelogo/dopler.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData } from '../../Redux/slice/serviceSlice';
const responsive = {
  0: { items: 1 },
  768: { items: 2 },
  1024: { items: 3 },
  1440: { items: 4 },
};




const Service = () => {
    const useClientData = [
        {
          image: ctscan,
          name: "Lab Test",
          service: "Comprehensive CT scan services for detailed imaging and diagnosis of various conditions."
        },
        {
          image: mri,
          name: "Radiodiagnosis",
          service: "High-resolution MRI scans for accurate diagnosis of neurological and musculoskeletal disorders."
        },
        {
          image: xray,
          name: "Nuclear Medicine",
          service: "State-of-the-art X-ray imaging for diagnosing fractures, infections, and other conditions."
        },
        {
          image: bone, // Assuming you have a fourth logo image
          name: "Theranostics",
          service: "Bone Mineral Density tests for assessing osteoporosis and overall bone health."
        },
        {
          image: mamo,
          name: "Cardiology",
          service: "Mammogram services for early detection of breast cancer and other breast-related health issues."
        },
        {
          image: ultra,
          name: "Neurology",
          service: "Non-invasive ultrasound imaging for monitoring pregnancies, abdominal conditions, and more."
        },
        {
          image: dopler,
          name: "Dental Sciences",
          service: "Doppler ultrasound to assess blood flow, heart conditions, and vascular health."
        },
        // {
        //   image: cardio,
        //   name: "Cardiology",
        //   service: "Comprehensive cardiology services for diagnosing and treating heart-related conditions."
        // }
      ];

      const dispatch=useDispatch()

      const {serviceData,loading,error}=useSelector((state)=>state.service)


      
      
      const fetchData=async()=>{
          const response=await dispatch(fetchServiceData())
      }

      const allServiceData=serviceData.map((val,ind)=>{
           return(
            <div key={ind} className="w-full px-2">
            <ServiceCard obj={val} number={ind+1}  />
          </div>
           )
      })

      
      
  
    const items = useClientData.map((val, ind) => (
      <div key={ind} className="w-full px-2">
        <ServiceCard obj={val} key={ind+1} number={ind+1} />
      </div>
    ));

    useEffect(()=>{
       fetchData()
    },[])
  
    return (
      <div className='flex justify-center items-center h-full 0'>
        <div className='w-full sm:w-10/12 md:w-12/12 lg:w-[50rem] xl:w-10/12'>
          <AliceCarousel
            mouseTracking
            autoPlayInterval={1200}
            animationDuration={1200}
            infinite
            disableButtonsControls
            items={allServiceData}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay
          />
        </div>
      </div>
    );
  };
  
  export default Service;
  
  