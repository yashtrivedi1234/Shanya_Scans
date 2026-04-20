import { useEffect, useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaShareAlt, FaArrowLeft, FaChevronRight, FaBriefcase, FaMoneyBillWave, FaGraduationCap, FaTasks, FaTools } from 'react-icons/fa';
import BreadCrumbs from '../../component/BreadCums';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpeningDetail } from '../../Redux/slice/testSlice';

const CareerPageDescription = () => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const navigate = useNavigate();
    const { department } = useParams();
    const dispatch = useDispatch();

    const { openingDetail, loading, error } = useSelector((state) => state.test);

    useEffect(() => {
        dispatch(fetchOpeningDetail(department));
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [department, dispatch]);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Career", href: "/carrer" },
        { label: openingDetail?.jobTitle || "Job Detail" },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4 text-center">
                <h2 className="text-xl text-red-600">Error loading job details. Please try again.</h2>
                <button 
                    onClick={() => navigate("/carrer")}
                    className="mt-4 bg-main hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                    Back to Jobs
                </button>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 min-h-screen">
            <BreadCrumbs headText={'Career Opportunities'} items={breadcrumbItems} />

            <div className="max-w-7xl mx-auto pb-12">
                {/* Navigation */}
                <header className="p-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <button 
                            onClick={() => navigate("/carrer")} 
                            className="flex items-center bg-main hover:bg-red-700 transition-colors text-white px-5 py-3 rounded-lg text-sm md:text-base font-medium shadow-md"
                        >
                            <FaArrowLeft size={14} className="mr-2" />
                            Back to Careers
                        </button>
                    </div>
                </header>

                <main className="flex flex-col md:flex-row px-4 gap-8">
                    {/* Left column - Job details */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {openingDetail?.jobTitle}
                                </h1>
                            </div>

                            {/* Job meta info */}
                            <div className="flex flex-wrap gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center text-gray-700">
                                    <FaBriefcase size={18} className="text-main mr-2" />
                                    <span className="font-medium">{openingDetail?.jobCategory}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaClock size={18} className="text-main mr-2" />
                                    <span className="font-medium">{openingDetail?.jobType}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaMapMarkerAlt size={18} className="text-main mr-2" />
                                    <span className="font-medium">{openingDetail?.location}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaCalendarAlt size={18} className="text-main mr-2" />
                                    <span className="font-medium">Posted: {new Date(openingDetail?.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <p>{openingDetail?.deadline}</p>
                                   
                                </div>
                            </div>

                            {/* Quick apply button for mobile */}
                            <div className="md:hidden mb-6">
                                <button 
                                    className="bg-main hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-lg font-medium text-lg w-full shadow-md"
                                    onClick={() => navigate("/jobs/apply")}
                                >
                                    Apply Now
                                </button>
                            </div>

                            {/* Job description section */}
                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-main text-white p-2 rounded-lg mr-3">
                                        <FaBriefcase size={16} />
                                    </span>
                                    Job Description
                                </h2>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: openingDetail?.jobDescription }} 
                                    className="text-gray-700 mb-6 p1 leading-relaxed"
                                />
                            </div>

                            <div 
                                className={`space-y-6 ${showFullDescription ? '' : 'max-h-[300px] overflow-hidden relative'}`}
                            >
                                {/* Qualifications section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-main text-white p-2 rounded-lg mr-3">
                                            <FaGraduationCap size={16} />
                                        </span>
                                        Qualifications
                                    </h2>
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: openingDetail?.qualifications }} 
                                        className="text-gray-700 p1 leading-relaxed"
                                    />
                                </div>

                                {/* Responsibilities section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-main text-white p-2 rounded-lg mr-3">
                                            <FaTasks size={16} />
                                        </span>
                                        Responsibilities
                                    </h2>
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: openingDetail?.responsibilities }} 
                                        className="text-gray-700 p1 leading-relaxed"
                                    />
                                </div>

                                {/* Skills section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-main text-white p-2 rounded-lg mr-3">
                                            <FaTools size={16} />
                                        </span>
                                        Skills
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {openingDetail?.skills || "Not specified"}
                                    </p>
                                </div>

                                {/* Salary section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-main text-white p-2 rounded-lg mr-3">
                                            <FaMoneyBillWave size={16} />
                                        </span>
                                        Salary
                                    </h2>
                                    <p className="text-gray-700 text-lg font-medium">
                                        {openingDetail?.salary || "Competitive (Based on experience)"}
                                    </p>
                                </div>

                                {!showFullDescription && (
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                                )}
                            </div>

                            <button
                                onClick={toggleDescription}
                                className="mt-6 text-main hover:text-red-700 font-medium flex items-center"
                            >
                                {showFullDescription ? 'Show less' : 'Show more'}
                                <FaChevronRight size={14} className={`ml-1 transform transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                            </button>

                            {/* Apply Button */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        className="bg-main hover:bg-red-700 transition-colors text-white px-6 py-4 rounded-lg font-medium text-lg flex-1 flex justify-center items-center shadow-md"
                                        onClick={() => navigate("/jobs/apply")}
                                    >
                                        Apply for this position
                                    </button>
                   
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Company info and similar jobs */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Company Overview</h3>
                            <p className="text-gray-700 mb-4">
                                Join our dynamic team and be part of an innovative company that values creativity, growth, and excellence.
                            </p>
                            <button 
                                className="text-main  font-medium text-sm"
                                onClick={() => navigate("/about")}
                            >
                                Learn more about us
                            </button>
                        </div>

                      
                    </div>
                </main>
            </div>
        </section>
    );
};

export default CareerPageDescription;