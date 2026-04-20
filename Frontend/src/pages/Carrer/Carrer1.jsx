import { useEffect, useState } from 'react';
import {
    FiClock,
    FiMapPin,
    FiBookOpen,
    FiDollarSign,
    FiBriefcase,
    FiSearch,
    FiChevronDown,
    FiUsers,
    FiAward,
    FiClock as FiTime,
    FiTrendingUp,
    FiMail,
    FiArrowRight
} from 'react-icons/fi';
import {
    FaUserMd,
    FaNotesMedical,
    FaAmbulance,
    FaGraduationCap,
    FaFlask,
    FaHeartbeat,
    FaStethoscope,
    FaFileMedical
} from 'react-icons/fa';
import BreadCrumbs from '../../component/BreadCums';
import { motion } from 'framer-motion';
import CareerListingPage from './CarrerListing';
import CareerPageDescription from './CarrerDescription';



import banne1 from '../../assets/carrer-page/banner.png'
import img1 from '../../assets/carrer-page/img1.png'
import img2 from '../../assets/carrer-page/img2.png'
import img3 from '../../assets/carrer-page/img3.png'
import img4 from '../../assets/carrer-page/img4.jpg'
import { Link, useNavigate } from 'react-router-dom';


const CareerPage = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    const categories = ['All', 'Doctors', 'Nursing', 'Paramedics', 'Academic Staff'];

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Career" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const testimonials = [
        {
            name: "Dr. Sarah Johnson",
            role: "Senior Cardiologist",
            image: "https://medanta.s3.ap-south-1.amazonaws.com/career/July2024/doctor-testimonial-1.jpg",
            quote: "Working at Medanta has given me incredible opportunities to grow professionally while making a real difference in patients' lives."
        },
        {
            name: "Nurse Robert Chen",
            role: "Head Nurse, ICU",
            image: "https://medanta.s3.ap-south-1.amazonaws.com/career/July2024/nurse-testimonial-1.jpg",
            quote: "The collaborative environment here fosters innovation and compassionate care. I'm proud to be part of this incredible team."
        },
        {
            name: "Dr. Aisha Patel",
            role: "Pediatric Surgeon",
            image: "https://medanta.s3.ap-south-1.amazonaws.com/career/July2024/doctor-testimonial-2.jpg",
            quote: "Medanta's commitment to excellence and patient care aligns perfectly with my personal values as a healthcare professional."
        }
    ];

    return (
        <section className="bg-white overflow-hidden">
            <BreadCrumbs headText={"Career"} items={breadcrumbItems} />

            {/* Hero Banner */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={banne1}
                    alt="Career at Medanta"
                    className="w-full h-full object-cover"
                />

            </div>

            {/* Stats Section */}
            <div className="bg-text-main py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            <p className="text-4xl font-bold text-text-yellow mb-2">2,500+</p>
                            <p className="text-main font-medium">Healthcare Professionals</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            <p className="text-4xl font-bold text-text-yellow mb-2">12</p>
                            <p className="text-main font-medium">Specialized Departments</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            <p className="text-4xl font-bold text-text-yellow mb-2">98%</p>
                            <p className="text-main font-medium">Employee Satisfaction</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            <p className="text-4xl font-bold text-text-yellow mb-2">15+</p>
                            <p className="text-main font-medium">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Culture Section */}
            <div className="container mx-auto px-4 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-text-main mb-1 text-main">Our Workplace Culture</h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">Join a team where innovation meets compassion, and where your career growth is prioritized as much as patient care.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 bg-gray-100">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-400"
                    >
                        <div className="w-16 h-16 bg-text-main/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <FiUsers className="h-8 w-8 text-text-main" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-text-main text-center">Collaborative Environment</h3>
                        <p className="text-gray-600 text-center">Work alongside talented professionals in a supportive team-based setting focused on excellent patient care.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-400"
                    >
                        <div className="w-16 h-16 bg-text-main/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <FiAward className="h-8 w-8 text-text-main" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-text-main text-center">Professional Growth</h3>
                        <p className="text-gray-600 text-center">Access continuing education, mentorship programs, and clear career advancement pathways.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-400"
                    >
                        <div className="w-16 h-16 bg-text-main/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <FiTime className="h-8 w-8 text-text-main" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-text-main text-center">Work-Life Balance</h3>
                        <p className="text-gray-600 text-center">Flexible scheduling options and comprehensive benefits designed to support your wellbeing.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-400"
                    >
                        <div className="w-16 h-16 bg-text-main/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <FaFlask className="h-8 w-8 text-text-main" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-text-main text-center">Innovation Focus</h3>
                        <p className="text-gray-600 text-center">Contribute to cutting-edge research and medical advancements that define the future of healthcare.</p>
                    </motion.div>
                </div>
            </div>



            {/* Career Categories */}
            <div className=" mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-main mb-1">Career Categories</h2>
                    <div className="w-24 h-1 bg-text-yellow mx-auto mb-2"></div>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">Discover opportunities across our diverse departments and find the perfect role for your skills and passion.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-2 mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer group h-[26rem]"
                        onClick={() => navigate("/carrer/Doctor")}
                    >
                        <div className="bg-gray-300 h-full">
                            <img src={img1} alt="Doctors" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                            <div className="p-8 w-full">
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-full bg-text-yellow/90 flex items-center justify-center mb-3">
                                        <FaUserMd className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl text-white font-bold">Doctors</h3>
                                    <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lead patient care with expertise and compassion</p>
                                </div>
                                <div className="h-1 w-0 group-hover:w-full bg-text-yellow transition-all duration-500"></div>
                            </div>
                        </div>
                    </motion.div>
                    {
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer group h-[26rem]"
                            onClick={() => navigate("/carrer/Nursing")}
                        >
                            <div className="bg-gray-300 h-full">
                                <img src={img3} alt="Nursing" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                                <div className="p-8 w-full">
                                    <div className="mb-4">
                                        <div className="w-12 h-12 rounded-full bg-text-yellow/90 flex items-center justify-center mb-3">
                                            <FaNotesMedical className="text-white" size={24} />
                                        </div>
                                        <h3 className="text-2xl text-white font-bold">Nursing</h3>
                                        <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Provide essential care with skill and empathy</p>
                                    </div>
                                    <div className="h-1 w-0 group-hover:w-full bg-text-yellow transition-all duration-500"></div>
                                </div>
                            </div>
                        </motion.div>}

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer group h-[26rem]"
                        onClick={() => navigate("/carrer/Paramedics")}
                    >
                        <div className="bg-gray-300 h-full">
                            <img src={img4} alt="Paramedics" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                            <div className="p-8 w-full">
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-full bg-text-yellow/90 flex items-center justify-center mb-3">
                                        <FaAmbulance className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl text-white font-bold">Paramedics</h3>
                                    <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Deliver critical emergency response and care</p>
                                </div>
                                <div className="h-1 w-0 group-hover:w-full bg-text-yellow transition-all duration-500"></div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer group h-[26rem]"
                        onClick={() => navigate("/carrer/Academic Staff")}
                    >
                        <div className="bg-gray-300 h-full">
                            <img src={img2} alt="Academic Staff" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                            <div className="p-8 w-full">
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-full bg-text-yellow/90 flex items-center justify-center mb-3">
                                        <FaGraduationCap className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl text-white font-bold">Academic Staff</h3>
                                    <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shape the future through education and research</p>
                                </div>
                                <div className="h-1 w-0 group-hover:w-full bg-text-yellow transition-all duration-500"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Benefits Section */}


            {/* Call to Action */}
            <div className="container mx-auto px-4 py-10">
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto my-10 border border-gray-200">
                                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
                                        Still Searching for the Right Position?
                                    </h2>

                                    <div className="mb-8">
                                        <p className="text-lg text-gray-700 mb-4">
                                            Let's Find Your Fit! Submit your resume and we'll contact you when the perfect opportunity arises.
                                        </p>

                                        <div className="mt-6 flex flex-col sm:flex-row items-center">
                                            <span className="text-gray-600 mr-2 mb-2 sm:mb-0">Email at:</span>
                                            <a
                                                href="mailto:hr@shanyascans.com"
                                                className="text-main font-medium hover:text-blue-800 hover:underline transition-colors flex items-center"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                                hr@shanyascans.com
                                            </a>
                                        </div>
                                        <Link to={"/jobs/apply"}

                                            className="bg-main hover:bg-main/90 mt-10 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center w-fit"
                                        >
                                            <FaFileMedical className="mr-2" />
                                            SUBMIT RESUME
                                        </Link>
                                    </div>

                                </div>
                   
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="https://medanta.s3.ap-south-1.amazonaws.com/career/August2024/Yebkr1FKuFWad91ztNzstWJn5WuhLR-metaVExTVGlvaFVwR0g4RDBYb09wYTVVa0phOEliWXdpLW1ldGFUbTkwTFhOMWNtVXRkMmhsY21VdGVXOTFMV1pwZEMxcGJpNXFjR2M9LS5qcGc=-.jpg"
                                alt="Healthcare professionals"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>






        </section>
    )

}


export default CareerPage