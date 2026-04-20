import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPathologyTest } from "../../Redux/slice/testSlice";
import BreadCrumbs from "../../component/BreadCums";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import PathologySkeleton from "./PathologySkeleton";
import { motion } from "framer-motion";

const Pathology = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathologyTest, loading } = useSelector((state) => state.test);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const testsPerPage = 100;

  useEffect(() => {
    dispatch(fetchPathologyTest());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pathology Test" },
  ];

  // Filter tests based on search query
  const filteredTests = pathologyTest.filter((test) =>
    test.testDetailName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  // Pagination logic
  const getPaginationPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
      pages = [1, 2, 3, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
    return pages;
  };

  return (
    <section className="min-h-screen bg-white text-white">
      <BreadCrumbs headText={"Best Pathology Centre in Lucknow"} items={breadcrumbItems} />
      <div className="container mx-auto px-6 py-6 md:py-10 lg:py-14">
        
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Pathology Test..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page to 1 when searching
            }}
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prime text-black"
          />
        </div>

        {loading ? (
          <PathologySkeleton />
        ) : filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
            {currentTests.map((test, index) => (
              <motion.div
                key={test._id}
                className="relative bg-white bg-opacity-10 backdrop-blur-md p-2 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 bg-prime"
                onClick={() =>
                  navigate(
                    `/pathology/${slugify(test?.testDetailName, {
                      lower: true,
                      strict: true,
                    })}`
                  )
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-prime opacity-30 rounded-xl"></div>
                <h3 className="text-lg font-bold relative z-10 text-white uppercase">
                  {test?.testDetailName}
                </h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tests found.</p>
        )}

        {/* Pagination Controls */}
        {filteredTests.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                currentPage === 1 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-prime text-white hover:bg-prime-dark"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {getPaginationPages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`px-4 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
                    page === currentPage
                      ? "bg-prime text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } ${page === "..." ? "cursor-default" : ""}`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                currentPage === totalPages ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-prime text-white hover:bg-prime-dark"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pathology;