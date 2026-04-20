import React, { useEffect, useState } from "react";
import img1 from '../../assets/testdetails/icon1.png';
import img2 from '../../assets/testdetails/icon2.png';
import img3 from '../../assets/testdetails/icon3.png';
import img4 from '../../assets/testdetails/icon4.png';
import { FaUsers, FaRupeeSign, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { FaClock, FaUtensils, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import pattern from '../../assets/pattern/pattern4.avif'
import pattern2 from '../../assets/pattern/pattern10.avif'
import pattern1 from '../../assets/pattern/pattern9.avif'
import Instruction from "../Test/TestInstruction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageDetails } from "../../Redux/slice/package.slice";
import SkeletonPackageDetail from "./SkeletonPackageDetails";


const features = [
    { icon: FaUsers, text: "1.5 lakh+ patients test with us every month" },
    { icon: FaRupeeSign, text: "Patients save an average of ₹700 on each scan" },
    { icon: FaShieldAlt, text: "ISO and NABH certified scan centers" },
    { icon: FaCheckCircle, text: "100% reliable and accurate reports" }
];


const PackageMoreDetail = () => {
    const [language, setLanguage] = useState("english");
    const toggleLanguage = () => setLanguage(language === "english" ? "hindi" : "english");
    const navigate = useNavigate()
    const { slug } = useParams();
    const dispatch = useDispatch()
    const location = useLocation()
    const { packageDetail, loading, error } = useSelector((state) => state.package)



    const parameters = [
        "Serum Electrolytes profile(03)",
        "Iron Studies(03)",
        "LIVER Function Test(1)",
        "Lipid Profile(8)",
        "Thyroid Profile(03)",
        "Kidney Profile(07)",
        "CBC(28)",
        "HBA1C(1)",
        "25 OH Vitamin D",
        "Vitamin B12",
        "BSF",
    ];

    const fetchDetail = async () => {
        const response = await dispatch(fetchPackageDetails(slug))
    }

    const handleClick = (val) => {
        const data = {
            name: val?.packageName,
            rate: val?.packageDiscount,
            category: val?.packageName,
            orderType: "package"
        }


        navigate("/scan/checkout", { state: Array.isArray(data) ? data : [data] });
    }

    useEffect(() => {
        fetchDetail()
    }, [slug])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith('/package')) {
            window.scrollTo(0, 0);
        }
    }, [location]);


   const extractedParameters = packageDetail?.packageParamterDetails
  ? packageDetail.packageParamterDetails
      .replace(/<\/?p>/g, "") // remove <p> tags
      .split(",") // split by comma
      .map(param => param.trim()) // trim spaces
  : [];

    return (
        <section className="sm:py-4 lg:py-4 md:px-4 py-2 px-2 bg-gray-50 ">
            {loading ? <SkeletonPackageDetail /> :
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:px-2 md:py-2 ">
                    {/* Header Section */}
                    <div className="bg-prime md:p-5 p-2 text-white  flex flex-col md:flex-row items-start justify-between">
                        <div>
                            <h2 className="lg:text-2xl text-xl font-bold text-yellow">{packageDetail?.packageName} </h2>
                            <p className="text-sm text-white">Shanya Health Package – Your Complete Wellness Solution!</p>
                        </div>

                        <div className=" flex flex-col  justify-between lg:items-center items-start">
                            <div className="text-lg font-bold text-white">₹{packageDetail?.packageDiscount}/- </div>
                            <button className="bg-yellow text-gray-800 px-10 py-2 rounded-lg mt-2 md:mt-0" onClick={() => handleClick(packageDetail)}>Book Now</button>
                        </div>

                    </div>

                    <div >
                        {/* Test Details */}
                        <p className="text-gray-700 text-justify md:mt-4 px-2 py-2">
                            <div
                                dangerouslySetInnerHTML={{ __html: packageDetail?.packageOverview }}
                            />
                        </p>

                        {/* Test Features */}
                        <div className="md:mt-5 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[{ img: img1, title: "Parameter Included", value: packageDetail?.parameterInclude },
                            { img: img2, title: "Free", value: "Sample Collection" },
                            { img: img3, title: "Free", value: "Report Counselling" },
                            { img: img4, title: "Test booked so far", value: "5820+" }].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border border-prime p-4 rounded-lg">
                                    <img src={item.img} alt="" className="w-10 h-10" />
                                    <div>
                                        <p className="text-sm text-gray-600">{item.title}</p>
                                        <p className="font-bold text-lg">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Report & Booking Info */}
                        <div className="mt-5  lg:p-4  bg-gray-100 rounded-lg shadow-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
                                {/* Report Time */}
                                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                                    <FaClock className="text-red-500 w-5 h-5 mb-1" />
                                    <p className="text-gray-600">Report Time</p>
                                    <p className="font-bold text-gray-800">{packageDetail?.report} hrs</p>
                                </div>

                                {/* Fasting Requirement */}
                                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                                    <FaUtensils className="text-blue-500 w-5 h-5 mb-1" />
                                    <p className="text-gray-600">Fasting</p>
                                    <p className="font-bold text-gray-800">{"Consult Doctor"}</p>
                                </div>

                                {/* Recommended for */}
                                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                                    <FaUserFriends className="text-green-500 w-5 h-5 mb-1" />
                                    <p className="text-gray-600">Recommended for</p>
                                    <p className="font-bold text-gray-800">{"Male,Female"}</p>
                                </div>

                                {/* Age Range */}
                                <div className="p-2 bg-white rounded-md shadow flex flex-col items-center text-xs gap-2">
                                    <FaCalendarAlt className="text-purple-500 w-5 h-5 mb-1" />
                                    <p className="text-gray-600">Age</p>
                                    <p className="font-bold text-gray-800">{packageDetail?.age || "Any Age"}</p>
                                </div>
                            </div>
                        </div>


                        <div className="relative  items-center justify-center hidden lg:flex gap-6 p-8 z-10">
                            {/* Background Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${pattern2})`,
                                    opacity: 2,
                                    // filter: "blur(2px)",
                                    zIndex: -10,
                                }}
                            ></div>

                            {/* Book Now Button */}
                            <button onClick={() => handleClick(packageDetail)} className="bg-yellow text-gray-800  px-12 py-4 rounded-[2rem] shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:scale-105" >
                                Book Now
                            </button>

                            {/* Call Us Button */}
                            <a href="tel:18001234187" className="bg-white text-black border border-red-500 px-12 py-4 rounded-[2rem] shadow-lg transition-all duration-300 hover:bg-yellow hover:text-white hover:scale-105">
                                Call Us
                            </a>
                        </div>


                        {/* Why Choose Us */}
                        <div className="mt-5 gap-4  py-2 bg-white rounded-xl shadow-lg  w-full  relative flex flex-col-reverse md:flex-row items-start max-w-7xl">

                            <div>
                                <h3 className="text-2xl font-semibold text-main text-start mb-5">
                                    Why Choose <span className="text-prime">Shanya Scans?</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-100 border rounded-lg shadow-sm  relative z-10">
                                            <div
                                                className="absolute inset-0 "
                                                style={{
                                                    backgroundImage: `url(${pattern})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    opacity: 2,
                                                    zIndex: -10,
                                                }}
                                            ></div>
                                            <feature.icon className="text-prime text-5xl" />
                                            <span className="text-gray-700 text-lg font-medium">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Instruction data={packageDetail} />
                        </div>

                        <div className="space-y-2 ">
                            <div className="bg-gray-50 mt-2 rounded-lg shadow-md p-4">
                                <h3 className="font-semibold text-lg">Parameters</h3>

                                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {extractedParameters.length > 0 ? (
                                        extractedParameters.map((param, index) => (
                                            <div
                                                key={index}
                                                dangerouslySetInnerHTML={{ __html: param.replace(/&nbsp;/g, ' ') }} 
                                                className="p-4 border border-gray-300 shadow-lg bg-white rounded-lg text-center text-gray-900 font-semibold min-h-[60px] flex items-center justify-center"
                                            >
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 col-span-full">No parameters found</p>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            }
        </section>
    );
};

export default PackageMoreDetail;