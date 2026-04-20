import { useEffect, useState } from 'react';
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaShareAlt,
    FaArrowRight,
    FaBell
} from 'react-icons/fa';
import BreadCrumbs from '../../component/BreadCums';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpening } from '../../Redux/slice/testSlice';

const CareerListingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [showCategories, setShowCategories] = useState(false);
    const navigate = useNavigate();

    const { opening, loading, error } = useSelector((state) => state.test);
    const dispatch = useDispatch();

    const { department } = useParams()


    console.log(department);


    const categories = [
        'All Categories',
        'Doctor',
        'Nursing',
        'Paramedics',
        'Academic Staff'
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchOpening());
    }, [dispatch]);


    useEffect(() => {
        if (department) {
            setSelectedCategory(department)
        }
    }, [])

    const filteredJobs = selectedCategory === 'All Categories'
        ? opening
        : opening.filter(job => job.jobCategory === selectedCategory);

    const jobsPerPage = 4;
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowCategories(false);
        setCurrentPage(1);
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Career" },
    ];

    return (
        <section className='pb-2'>
            <BreadCrumbs headText={'Career Listing Page'} items={breadcrumbItems} />
            <div className="max-w-7xl mx-auto p-4 bg-gray-50">

                {/* Category Dropdown */}
                <div className="relative mb-6">
                    <button
                        onClick={() => setShowCategories(!showCategories)}
                        className="w-full md:w-64 bg-white border border-gray-200 p-3 text-left rounded-md shadow-sm"
                    >
                        {selectedCategory}
                    </button>

                    {showCategories && (
                        <div className="absolute z-10 w-full md:w-64 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {currentJobs && Array.isArray(currentJobs) && currentJobs.length === 0 ? <p className='flex items-center justify-center mx-auto p-4'>No Vacancy Are there</p>

                    : <div className="mb-16">
                        {currentJobs.map((job) => (
                            <div key={job._id} className="border-b py-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-medium text-gray-800">{job.jobTitle}</h2>
                                        <div className="flex flex-wrap gap-x-8 mt-2">
                                            <div className="text-gray-600 my-1">
                                                Category: <span className="font-medium">{job.jobCategory}</span>
                                            </div>
                                            <div className="text-gray-600 my-1">
                                                Type: <span className="font-medium">{job.jobType}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            <div className="flex items-center text-gray-600">
                                                <FaMapMarkerAlt className="h-4 w-4 text-red-500 mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-1" />
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="text-main font-medium flex items-center"
                                            onClick={() => navigate(`/carrer/description/${job?.jobTitle}`)}
                                        >
                                            Apply <FaArrowRight className="h-3 w-3 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }


                {/* Job Listings */}


                {/* Pagination */}
                <div className="flex justify-center items-center mt-8 gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                    >
                        <FaChevronLeft className="h-3 w-3" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === index + 1 ? 'bg-main text-white' : 'hover:bg-gray-100'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                    >
                        <FaChevronRight className="h-3 w-3" />
                    </button>
                </div>

                {/* Floating Buttons */}
                <div className="fixed bottom-6 right-6 flex flex-col gap-2">
                    <button className="bg-main text-white p-4 rounded-full shadow-lg">
                        <FaBell className="h-5 w-5" />
                    </button>
                    <button className="bg-white border border-gray-200 p-4 rounded-full shadow-lg">
                        <FaShareAlt className="h-5 w-5" />
                    </button>
                </div>

                {/* Not sure section */}
                <div className="relative w-full h-64 bg-gray-200 rounded-lg mt-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-gray-900/70 flex items-center justify-center flex-col text-white z-10">
                        <h2 className="text-4xl font-bold mb-4 text-white">Not sure where you fit in?</h2>
                        <button className="bg-main hover:bg-main text-white py-2 px-6 rounded-full">
                            Submit your Resume
                        </button>
                    </div>
                    <div className="absolute inset-0">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://medanta.s3.ap-south-1.amazonaws.com/banners/October2023/SQxgyrJAewNACrFC2I46MiQk2lNqeL-metac3VibWl0IHlvdXIgcmVzdW1lLmpwZw==-.jpg')",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CareerListingPage;
