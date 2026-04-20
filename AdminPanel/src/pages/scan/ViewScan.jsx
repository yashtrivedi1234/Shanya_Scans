import React, { useState } from "react";
import { useDeleteScanMutation, useGetAllScanQuery } from "@/Rtk/scanApi";
import AddScan from "./AddScan";
import { MdAutoDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { confirmDialog } from "../utlis/confirmDialog";
import { useNavigate } from "react-router-dom";


const ViewScan = () => {
  const { data, isLoading } = useGetAllScanQuery();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [show, setShow] = useState(false)
  const [showTest, setShowTest] = useState(false)
  const [scanData, setScanData] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteScan, { isLoading: isDeleteLoading, isError, isSuccess }] = useDeleteScanMutation();
  const navigate = useNavigate()

  // Filter data first
  const filteredData = data?.filter((scan) =>
    scan.serviceDetailName.toLowerCase().includes(search.toLowerCase())
  ) || [];


  //delete function


  const handleDelete = async (id) => {
    // SweetAlert Confirm Dialog


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        const response = await deleteScan(id);
        console.log(response);

        // Show success alert
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting:", error);

        // Show error alert
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };


  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Ensure currentPage is within valid bounds
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);



  return (
    <div>
      {!show ?

        <div className="p-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold text-gray-800">Scan Services</h2>
            {/* <input
              type="text"
              placeholder="Search by name..."
              className="border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            /> */}
            <button className="bg-main text-white px-4 py-2 rounded-md shadow-md " onClick={() => setShow(true)}>
              + Add Scan
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Service name..."
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>

          {/* Loading State */}
          {isLoading ? (
            <p className="text-center text-gray-600">Loading scans...</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="w-full border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                  <tr className="border-b">
                    <th className="p-3 text-left">S.No</th>
                    <th className="p-3 text-left">Service Name</th>
                    <th className="p-3 text-left">Icon</th>
                    <th className="p-3 text-left">Service Photo</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((scan, index) => (
                      <tr key={scan.serviceId} className="border-b hover:bg-gray-100">
                        <td className="p-3">{startIndex + index + 1}</td>
                        <td className="p-3">{scan.serviceDetailName}</td>
                        <td className="p-3">
                          <img
                            src={scan.iconPhoto?.secure_url}
                            alt="Icon"
                            className="w-12 h-12 rounded-md object-cover"
                          />
                        </td>
                        <td className="p-3">
                          <img
                            src={scan.servicePhoto?.secure_url}
                            alt="Service"
                            className="w-16 h-16 rounded-md object-cover"
                          />
                        </td>
                        <td className="p-3 flex gap-2">
                          <button className="bg-green-500  text-white px-3 py-1 rounded-md text-sm hover:bg-red-600" onClick={() => navigate(`/dashboard/test/scan/${scan?.slug}`)}>
                            <FaEye />
                          </button>
                          <button className="bg-main text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                            onClick={() => (setShow(true), setScanData(scan))}
                          >
                            <MdEdit />
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                            onClick={() => handleDelete(scan?._id)}>
                            <MdAutoDelete />
                          </button>


                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-600">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
            {/* Page Size Dropdown */}
            <div>
              <label className="mr-2 text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="border px-2 py-1 rounded-md shadow-sm focus:outline-none"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 py-1 border rounded-md ${currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Prev
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`px-3 py-1 border rounded-md ${currentPage >= totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div> : <AddScan data={scanData} />

      }
    </div>
  );
};

export default ViewScan;
