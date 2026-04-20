import { Dashboard } from '@/layouts';
import { useDeleteScanTestMutation, useGetAllScanTestQuery } from '@/Rtk/scanTestApi';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TableComponent from '../helper/TableComponent';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ViewModal from '../helper/ViewModel';
import Swal from 'sweetalert2';
import AddScanTest from './AddScanTest';

const ScanTest = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetAllScanTestQuery(slug);
    const [modalData, setModalData] = useState(null); // Modal Data
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
    const [show, setShow] = useState(false);
    const [deleteScanTest, { isLoading: isDeleteLoading, isError, isSuccess }] = useDeleteScanTestMutation();




    // 🟢 View Action: Modal Open or Navigate
    const handleView = (test) => {
        navigate(`/dashboard/test/scan/add/${slug}`);
    };

    // 🟡 Edit Action: Modal Open or Navigate
    const handleEdit = (test) => {
        // Agar modal me edit karna ho toh:
        setModalData(test);
        setIsModalOpen(true);

        // Agar dusre page par navigate karna ho toh:
        navigate(`/dashboard/test/scan/add/${slug}`,{state:test});
    };

    // 🔴 Delete Action: API Call
    const handleDelete = async (test) => {
        try {

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (result?.isConfirmed) {
                const response = await deleteScanTest(test?.slug)
                console.log(response);

                if (response?.data) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                }


            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }


    };

    // Define table columns with View, Edit, Delete buttons
    const columns = [
        // { header: "S.No", accessor: "sno" },
        { header: "Test Name", accessor: "testDetailName" },
        { header: "Category", accessor: "category" },
        { header: "Price (₹)", accessor: "testPrice" },
        {
            header: "Action",
            accessor: "action",
            type: "action"
        },
    ];

    // Ensure `data` exists and map over it with an index for S.No
    const tableData = data?.map((test, index) => ({
        // sno: index + 1,
        testDetailName: test.testDetailName || "N/A",
        category: test.departement || "N/A",
        testPrice: test.testPrice ? `₹${test.testPrice}` : "N/A",
        action: (
            <div className="flex gap-3">
                {/* View Button */}
                {/* <button 
                    onClick={() => handleView(test)} 
                    className="text-green-600 hover:text-green-800"
                >
                    <FaEye size={18} />
                </button> */}

                {/* Edit Button */}
                <button
                    onClick={() => handleEdit(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => handleDelete(test)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];



    return (
        <div>
        {isLoading ? (
            <p className="text-center text-lg font-semibold">Loading...</p>
        ) : show ? (
            <AddScanTest data={testData} />
        ) : (
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Scan Test</h2>
                    <button
                        className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => handleView()}
                    >
                        + Add Scan Test
                    </button>
                </div>
                <TableComponent title="Scan Test List" columns={columns} data={tableData} itemsPerPage={10} />
            </div>
        )}

        {/* View/Edit Modal */}
        {/* {isModalOpen && modalData && (
            <ViewModal data={modalData} closeModal={() => setIsModalOpen(false)} />
        )} */}
    </div>
    );
};

export default ScanTest;
