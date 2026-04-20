import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestData, fetchTestDetail } from "../../Redux/slice/testSlice";
import { addToCart } from "../../Redux/slice/addCart.slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";

const ServiceTable = ({state,test}) => {
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

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {testDetailData,loading,error } = useSelector((state) => state.test);

   const fetchData=async()=>{
      const response=await dispatch(fetchTestDetail(state?.slug))

    }
  

  
   useEffect(()=>{
         fetchData()
   },[state])
  
  



  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleBuyNow = (item) => {
    // navigate(`/service/more/detail`, { state: { ...item } });
     navigate(`/test/${slugify(item?.testDetailName, { lower: true, strict: true })}`);
  };

  const filteredTests = testDetailData.filter((test) =>
    test?.testDetailName?.toLowerCase()?.includes(searchTerm.toLowerCase())
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
    <section>
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 ">
      <div className="overflow-hidden overflow-x-auto rounded-lg shadow-lg bg-white max-w-6xl mx-auto">
        {loading ? (
          <div className="p-6">
            <p className="text-gray-600 text-center">Loading...</p>
            {[...Array(itemsPerPage)].map((_, idx) => (
              <div key={idx} className="h-8 bg-gray-200 animate-pulse rounded mb-4" />
            ))}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-main text-white text-sm sm:text-base">
                <th className="py-3 px-4 sm:px-6 font-semibold text-left">Test Name</th>
                <th className="py-3 px-4 sm:px-6 font-semibold text-left">Test Category</th>
                <th className="py-3 px-4 sm:px-6 font-semibold text-center">Price</th>
                <th className="py-3 px-4 sm:px-6 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedTests.length > 0 ? (
                displayedTests.map((test) => (
                  <tr key={test._id} className="border-b hover:bg-gray-100 text-sm text-gray-800 ">
                    <td className="py-2 px-4 sm:px-6 uppercase">{test?.testDetailName}</td>
                    <td className="py-2 px-4 sm:px-6 uppercase">{test?.category}</td>
                    <td className="py-2 px-4 sm:px-6 font-medium text-center">
                      {test?.testPrice ? `₹${test?.testPrice}` : "Call for discounted price"}
                    </td>
                    <td className="py-2 px-4 sm:px-6 text-right">
                      <div className="flex md:flex-row  flex-col justify-end gap-2 sm:gap-4 items-end">
                        <button className="bg-green-500 text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-green-400 transition" onClick={() => handleBuyNow(test)}>
                          Buy Now
                        </button>
                        <button className="bg-red-500 text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-red-400 transition"     onClick={() => handleAddToCart(test)}>
                          Add to Cart
                        </button>
                      </div>
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
        )}
      </div>
  
      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-2 sm:gap-4">
        <button onClick={() => setCurrentPage(1)} className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 text-sm sm:text-base" disabled={currentPage === 1}>
          First
        </button>
        
        {getPageNumbers().map((page) => (
          <button key={page} className={`px-4 py-2 rounded-lg text-sm sm:text-base ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
        
        <button onClick={() => setCurrentPage(totalPages)} className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 text-sm sm:text-base" disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  </section>
  
  
  );
};

export default ServiceTable;
