import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTestData } from '../../Redux/slice/testSlice';
import bloodImg from '../../assets/search.jpeg';
import slugify from 'slugify';
import TypewriterHeading from '../../component/TypeWriterHeading';

// Normalize function for matching purposes
const normalizeString = (str) => str.toLowerCase().replace(/[\s-]+/g, '');

const SearchForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to store test data, search input, and filtered tests
    const [testData, setTestData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredTests, setFilteredTests] = useState([]);

    // Fetch test data
    const fetchAllTest = async () => {
        const response = await dispatch(fetchTestData());
        setTestData(response?.payload?.data || []); // Assuming response.payload.data contains the test data
    };

    useEffect(() => {
        fetchAllTest();
    }, []);

    // Handle search input changes
    const handleSearch = (e) => {
        const value = e.target.value; // Keep search input as-is
        setSearchInput(value);

        if (value === '') {
            setFilteredTests([]);
            return;
        }

        // Step 1: Search by testName
        const byTestName = testData.filter((test) =>
            normalizeString(test.testName).includes(normalizeString(value))
        );

        // Step 2: Search by testDetailName
        const byTestDetail = testData.filter((test) =>
            test.testDetail.some((detail) =>
                normalizeString(detail.testDetailName).includes(normalizeString(value))
            )
        );

        // Combine testName and testDetail results
        const combinedResults = [...byTestName, ...byTestDetail];

        // Step 3: Prioritize results where search input is found in testDetails
        const prioritizeMatches = (tests) => {
            return tests.sort((a, b) => {
                const isMatchAInName = normalizeString(a.testName).includes(normalizeString(value));
                const isMatchBInName = normalizeString(b.testName).includes(normalizeString(value));

                const isMatchAInDetail = a.testDetail.some(detail =>
                    normalizeString(detail.testDetailName).includes(normalizeString(value))
                );
                const isMatchBInDetail = b.testDetail.some(detail =>
                    normalizeString(detail.testDetailName).includes(normalizeString(value))
                );

                // Prioritize tests that have a match in test details over those that only match by name
                if (isMatchAInDetail && !isMatchBInDetail) return -1;
                if (!isMatchAInDetail && isMatchBInDetail) return 1;

                // If both match or both don't match in details, fall back to name matching
                if (isMatchAInName && !isMatchBInName) return -1;
                if (!isMatchAInName && isMatchBInName) return 1;

                return 0; // If both match equally
            });
        };

        // Apply the prioritization: prioritize matched items at the top
        const sortedResults = prioritizeMatches(combinedResults);

        // Set the filtered results
        setFilteredTests(sortedResults);
    };

    // Handle clicking on a test detail
    const handleTestDetailClick = (data) => {
        // You can navigate to a detailed page for the test or show more information here
        // navigate(`/find/test/${encodeURIComponent(data?.testDetailName)}/cart`, {
        //     state: { ...data },
        // });
        navigate(`/test/${slugify(data?.testDetailName, { lower: true, strict: true })}`);
    };

    // Handle clicks on popular test categories
    const handlePopularTestClick = (testName) => {
        setSearchInput(testName); // Set the search input to the clicked popular test
        handleSearch({ target: { value: testName } }); // Trigger the filtering logic
    };

    return (
        <section className="w-full h-full flex flex-col flex-grow justify-around bg-gradient-to-r from-[#1F509A] to-[#3b76d0] px-8 xl:px-6 rounded-3xl shadow-2xl lg:py-2 py-8">


            {/* Heading */}
            {/* <h2 className="text-2xl font-extrabold text-white mb-6 text-center uppercase tracking-wider drop-shadow-xl">
                Book a Test Online
            </h2> */}
            <TypewriterHeading text="Book Your Test Online" className="xl:mb-0" />

            {/* Search Box */}
            <div className="mb-2 flex justify-center relative">
                <div className="flex items-center border-2 border-[#f9e666] rounded-full shadow-lg overflow-hidden w-full max-w-xl bg-white/20 backdrop-blur-md">
                    <input
                        type="text"
                        id="test-search"
                        placeholder="🔍 Search your test..."
                        value={searchInput}
                        onChange={handleSearch}
                        className="w-full px-6 py-3 text-lg text-white  placeholder-white focus:outline-none bg-transparent"
                    />
                    <button
                        type="button"
                        className="bg-white text-blue-600 px-6 py-3 rounded-r-full hover:bg-blue-600 hover:text-white transition duration-300"
                    >
                        <FaSearch size={24} />
                    </button>
                </div>

                {/* Search Results - Absolute Positioning */}
                {searchInput && (
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white shadow-2xl rounded-xl border border-gray-200 z-50 max-h-60 overflow-y-auto">
                        {filteredTests.length > 0 ? (
                            <div>
                                {filteredTests.map((test) => (
                                    <div
                                        key={test._id}
                                        className="p-5 hover:bg-gray-100 transition border-b border-gray-200"
                                    >
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                                            {test.testName}
                                        </h4>
                                        <div className="space-y-2">
                                            {test.testDetail.map((detail) => (
                                                <button
                                                    key={detail._id}
                                                    onClick={() => handleTestDetailClick(detail)}
                                                    className="block w-full text-left text-blue-700 hover:text-blue-900 transition text-base font-semibold"
                                                >
                                                    {detail.testDetailName}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 p-5 text-center text-lg font-medium">No results found.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Image */}
            <div className="flex justify-center xl:h-[250px] lg:h-[200px] md:h-[180px] sm:h-[160px] h-[140px] ">
                <img
                    src={bloodImg}
                    alt="bloodImage"
                    className="h-full w-full object-contain rounded-3xl shadow-2xl "
                />
            </div>


        </section>


    );
};


export default SearchForm;
