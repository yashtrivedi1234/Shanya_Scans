import { useDeleteLabTestMutation, useGetAllLabTestQuery } from '@/Rtk/labTestTag'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useNavigate } from 'react-router-dom';

const LabTest = () => {
  const { data, isLoading } = useGetAllLabTestQuery();
  const [deleteLabTest] = useDeleteLabTestMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleEdit = (data) => {
    navigate("/dashboard/pathology/add", { state: data });
  };

  const handleDelete = async (id) => {
    await deleteLabTest(id);
  };

  const columns = [
    { header: "Pathology Name", accessor: "type" },
    { header: "Price", accessor: "price" },
    { header: "Action", accessor: "action", type: "action" },
  ];

  // Filter based on search
  const filteredData = data?.filter((test) =>
    test.testDetailName?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const tableData = filteredData.map((test) => ({
    type: test.testDetailName || "N/A",
    price: test.testPrice + " Rs" || "N/A",
    action: (
      <div className="flex gap-3">
        <button
          onClick={() => handleEdit(test)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => handleDelete(test._id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash size={18} />
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pt-4">
        <h2 className="text-2xl font-semibold text-gray-700">Pathology Test List</h2>
        <button
          className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/dashboard/pathology/add")}
        >
          + Add Pathology Test
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Test Name..."
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : (
        <TableComponent
          title="Lab Test Tag"
          columns={columns}
          data={tableData}
          itemsPerPage={10}
        />
      )}
    </div>
  );
};

export default LabTest;
