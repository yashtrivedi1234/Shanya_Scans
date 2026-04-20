import React, { useEffect } from 'react'
import BreadCrumbs from '../../../component/BreadCums'
import TestHeader from './TestHeader'

import Scroll from '../../Package/PackageDetail/Scroll'
import TestCart from './TestCart'
import TestContent from './TestContent'
import Appoitment from './Appoitment'
import PackageFaq from '../../Package/PackageDetail/PackageFaq'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestSpecificDetail } from '../../../Redux/slice/testSlice'

const TestDetail = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tests Details' },
      ];
  
      const location=useLocation()
      const dispatch=useDispatch()
      const {testSpecificDetail,loading,error}=useSelector((state)=>state.test)
    
      console.log("test specific details are:- ",testSpecificDetail);
      

      
      const {state}=location
     
      console.log(state);

    
      const fetchData=async()=>{
           const response=await dispatch(fetchTestSpecificDetail(state?._id))
           console.log(response);
           
      }


     useEffect(()=>{
         fetchData()
     },[])
  
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

      

  return (
    <div>
             <BreadCrumbs items={breadcrumbItems} headText={"Tests Details"} />
        <div className=" lg:p-6">
        {/* main content  */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col lg:flex-row mx-auto max-w-8xl ">
            {/* left side */}
             <div className="flex-1 p-6">
           <TestHeader data={testSpecificDetail}/>
           <TestContent data={testSpecificDetail}/>
           {/* <PackageFaq/> */}
            </div>

            {/* right side */}
            <div className=" bg-gray-50 p-6 rounded-r-lg  h-fit  space-y-6">
        
        <TestCart data={testSpecificDetail}/>
     <Scroll/>
     <Appoitment data={testSpecificDetail}/>
      </div>
        </div>
       </div>
    </div>
  )
}

export default TestDetail