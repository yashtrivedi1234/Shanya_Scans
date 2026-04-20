import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestData, fetchTestDetail } from "../../Redux/slice/testSlice";
import { addToCart } from "../../Redux/slice/addCart.slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TestInfoTable = () => {
  const [activeTest, setActiveTest] = useState([]);
  const [testName, setTestName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [viewMore, setViewMore] = useState(false);
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);
  const { id: testParam } = useParams(); // Extract parameter after `/test/
  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "Search a Test...";

  const [totalPages1,setTotalPages]=useState(1)

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const { testDetailData,testTotalPage,testTotalData} = useSelector((state) => state.test);


  


  const fetchData=async()=>{
    const data={
        page:totalPages1,
        limit:50
    }
    console.log(state,data);
    
     const response=await dispatch(fetchTestDetail(state._id))
     console.log("response 1234",response);
     
  }
  
  // Fetch test details using the _id passed in the state
  useEffect(() => {
    const fetchData = async () => {
      const testId = state?._id || testParam; // Use state._id or fallback to testParam
      if (testId) {
       const response= await dispatch(fetchTestDetail(testId));

       
      } else {
        console.error("No test ID found");
      }
    };
  
    fetchData();
  }, [testParam, state?._id]); // Trigger fetch on changes
  
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleBuyNow = (item) => {
    navigate(`/service/checkout`, { state: { ...item } });
  };

  const filteredTests = testDetailData.filter((test) =>
    test.testDetailName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const displayedTests = viewMore
    ? filteredTests
    : filteredTests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageLimit = 5; // Number of page links to show at once
    let start = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    let end = Math.min(start + pageLimit - 1, totalPages);

    // Adjust to show the last page if we're close to the end
    if (end - start < pageLimit - 1) {
      start = Math.max(end - pageLimit + 1, 1);
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${"Test"}` },
    { label: `${state?.testName}` },
  ];


  

  return (
    <section className="bg-gray-50">
      <BreadCrumbs headText={state?.testName} items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 sm:py-12 md:py-14 lg:py-16 ">
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" p-5 pr-40  w-full text-md border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute inset-y-0 right-0 flex items-center px-6 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition">
              Search
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg shadow-md bg-white max-w-6xl mx-auto">
          <table className=" text-left w-full table-auto">
            <thead>
              <tr className="bg-blue-500 text-white text-sm">
                <th className="py-3 px-6 font-semibold">Test Name</th>
                <th className="py-3 px-6 font-semibold">Test Category</th>
                <th className="py-3 px-6 font-semibold">Price</th>
                <th className="py-3 px-6 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedTests.length > 0 ? (
                displayedTests.map((test) => (
                  <tr key={test._id} className="border-t hover:bg-gray-50 text-sm text-gray-800 ">
                    <td className="py-3 px-6">{test?.testDetailName}</td>
                    <td className="py-3 px-6">{test?.category}</td>
                    <td className="py-3 px-6 font-medium">
                      {test?.testPrice
                        ? `₹${test?.testPrice}`
                        : "Call for discounted price"}
                    </td>
                    <td className="py-3 px-6 text-right space-x-4">
                      <button
                        className="bg-green-500 text-white text-sm px-3 py-1 rounded-md hover:bg-green-400 transition duration-200"
                        onClick={() => handleBuyNow(test)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-400 transition duration-200"
                        onClick={() => handleAddToCart(test)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-600 font-medium">
                    No tests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            First
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestInfoTable;
