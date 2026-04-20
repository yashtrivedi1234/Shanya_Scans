import React, { useEffect } from 'react'
import cclogo from '../assets/logo/cclogo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackageData, fetchServiceData } from '../Redux/slice/package.slice'
import { fetchTestData } from '../Redux/slice/testSlice'
import { fetchServiceDetailMore } from '../Redux/slice/serviceSlice'
import { BsMailbox, BsPhone } from 'react-icons/bs'
import { PiPhoneCall } from 'react-icons/pi'
import { FaChevronRight, FaMessage } from 'react-icons/fa6'
import { FaLocationArrow } from 'react-icons/fa'
import slugify from 'slugify'
import { MdMail } from 'react-icons/md'
const Footer = () => {

  const dispatch = useDispatch()
  const { packageData, loading, error } = useSelector((state) => state.package);
  const { moreServiceData } = useSelector((state) => state.service);
  const { testData } = useSelector((state) => state.test)

  const fetchPackage = async () => {
    await dispatch(fetchPackageData());
  };

  const fetchService = async () => {
    await dispatch(fetchServiceDetailMore());  // Fetch more service data if not already loaded

  };

  const fetchData = async () => {
    const response = await dispatch(fetchTestData())
  }

  useEffect(() => {
    fetchData()
    fetchService()
    fetchPackage()
  }, [])



  return (
    <div>
      <section class="py-6 bg-gray-900">
        <div class="max-w-7xl px-4 mx-auto">

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-gray-700">

            <div className='w-full'>
              <h6 class="text-xl font-semibold text-white mb-4">Support</h6>
              <ul className="space-y-2">
                {[
                  { path: "/about", label: "About Us" },
                  { path: "/privacy-policy", label: "Privacy & Policy" },
                  { path: "/term-condition", label: "Terms & Condition" },
                  { path: "/refund-cancelation", label: "Refund & Cancellation" },
                  { path: "/blog", label: "Blogs" },
                  { path: "/carrer", label: "Career" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <FaChevronRight size={14} className="text-gray-400" />
                    <Link to={item.path} className="text-base text-gray-400 hover:text-main">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

             <ul className='flex items-center gap-1'>
             <FaChevronRight size={14} className="text-gray-400" />
             <Link to={"https://www.shanyascans.com/admin/"} target='_blank' className='text-gray-400'>Admin</Link>
             </ul>
              

            </div>

            <div className="w-full">
              <h6 className="text-xl font-semibold text-white mb-4">Our Popular Scans</h6>
              <ul className="space-y-2">
                {moreServiceData.slice(0, 6).map((val, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaChevronRight size={14} className="text-gray-400" />
                    {val?.serviceDetailName === "Digital 3.0 Tesla MRI" ? (
                      <Link
                        to="/scan/digital-30-tesla-mri"
                        className="text-base text-gray-400 hover:text-main"
                      >
                        {val?.serviceDetailName}
                      </Link>
                    ) : (
                      <Link
                        to={`/scan/${slugify(val?.serviceDetailName, { lower: true })}`}
                        className="text-base text-gray-400 hover:text-main"
                      >
                        {val?.serviceDetailName}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

            </div>

            <div className='w-full'>
              <h6 class="text-xl font-semibold text-white mb-4">Health Package</h6>
              <ul className="space-y-2">
                {packageData.slice(0, 5).map((val, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaChevronRight size={14} className="text-gray-400" />
                    <Link to={`/package/${slugify(val?.packageName, { lower: true })}`} className="text-base text-gray-400 hover:text-main">
                      {val?.packageName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <h6 className="text-xl font-semibold text-white mb-4">Get In Touch</h6>
              <ul className="space-y-3">
                {[
                  { icon: <MdMail size={18} />, text: "shanyaglobal.lko@gmail.com", link: "mailto:shanyaglobal.lko@gmail.com" },
                  { icon: <MdMail size={18} />, text: "hr@shanyascans.com", link: "mailto:hr@shanyascans.com" },
                  { icon: <BsPhone size={18} />, text: "+91 7233000133", link: "tel:+917233000133" },
                  { icon: <PiPhoneCall size={18} />, text: "Toll-Free: 18001234187", link: "tel:18001234187" },
                  { icon: <FaMessage size={18} />, text: "WhatsApp: +91 7233000133", link: "https://wa.me/917233000133" },
                  { icon: <FaLocationArrow size={18} />, text: "Plot No TC-49, V-VIII, Vibhuti Khand, Gomti Nagar, Lucknow", link: "https://www.google.com/maps?ll=26.871852,80.99835&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=4661358628032490054" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-white">
                    {item.icon}
                    <a href={item.link} target={item.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="text-base text-gray-400 hover:text-main">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center  border-t border-t-gray-500 ">
            <p className="text-sm text-white text-center sm:text-left">Copyright © 2025 <span className="font-semibold">Shanya Global</span> || All Rights Reserved || </p>
            <a href="https://www.codecrafter.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center text-base text-gray-400 hover:text-main">
              <span className='ml-1 text-white'> Developed By:</span>
              <img src={cclogo} alt="Code Crafter Web Solutions" className="w-32 h-auto object-contain ml-2" />
            </a>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Footer