import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestDetail } from "../../Redux/slice/testSlice";
import { addToCart } from "../../Redux/slice/addCart.slice";

const tests = [
  { id: 1, name: "MRI Scan", category: "MRI", price: 5000 },
  { id: 2, name: "CT Scan", category: "CT Scan", price: 3000 },
  { id: 3, name: "Ultrasound", category: "Ultrasound", price: 1500 },
  { id: 4, name: "Blood Test", category: "Blood Tests", price: 800 },
  { id: 5, name: "X-Ray", category: "X-Ray", price: 1000 },
  { id: 6, name: "ECG", category: "ECG", price: 1200 },
  { id: 7, name: "Radionuclide Therapy", category: "Radionuclide Therapies", price: 15000 },
  { id: 8, name: "Pathology Test", category: "Pathology", price: 2000 },
  { id: 9, name: "PET CT Scan", category: "PET CT", price: 10000 },
  { id: 10, name: "Gamma Scans", category: "Gamma Scans", price: 12000 },
  { id: 11, name: "Mammograph", category: "Mammograph", price: 3500 },
  { id: 12, name: "OPG Scan", category: "OPG", price: 2500 },
  { id: 13, name: "DEXA Scan", category: "DEXA", price: 4000 },
  { id: 14, name: "Neurology Test", category: "Neurology", price: 4500 },
  { id: 15, name: "Cardiology Test", category: "Cardiology", price: 6000 },
];

const FindTest = () => {
  const [filterCategory, setFilterCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMore, setViewMore] = useState(false); // State for "View More"
  const itemsPerPage = 8;

  const {testDetailData,loading,error}=useSelector((state)=>state.test)
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()
  const {id}=useParams()  

  const {state}=location


 
  const fetchData = async () => {
    // Check if data is already loaded
    if (!testDetailData || testDetailData.length === 0 || testDetailData[0]?.id !== id) {
      await dispatch(fetchTestDetail(id));
    }
  };

  const handleAddToCart = (item) => {
    // setItemCount(itemCount + 1); // Increment the count
    dispatch(addToCart(item)); // Dispatch the action to add to cart
  };

  

  const filteredTests = tests
    .filter((test) => {
      const matchesCategory = filterCategory ? test.category === filterCategory : true;
      const matchesSearchTerm = test.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  const displayedTests = viewMore
    ? filteredTests
    : filteredTests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BreadCrumbs items={[{ label: "Home", href: "/" }, { label: "Available Medical Tests" }]} />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Test Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {testDetailData.length > 0 ? (
                testDetailData.map((test) => (
                  <tr key={test.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{test?.testDetailName}</td>
                    <td className="p-4">{test?.category}</td>
                    <td className="p-4">{`₹${test?.testPrice}`}</td>
                    <td className="p-4 flex gap-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" >
                        Book Now
                      </button>
                      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"     onClick={() => navigate(`/find/test/${test?.testDetailName}/detail`,{ state: { ...test } }) }>
                        View More
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    No tests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-6">
          {!viewMore && (
            <div>
              <button
                className="px-3 py-2 mx-1 rounded-full bg-gray-200 hover:bg-gray-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 mx-1 rounded-full ${
                    page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="px-3 py-2 mx-1 rounded-full bg-gray-200 hover:bg-gray-300"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                &gt;
              </button>
            </div>
          )}

          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setViewMore(!viewMore)}
          >
            {viewMore ? "View Less" : "View More"}
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default FindTest;
