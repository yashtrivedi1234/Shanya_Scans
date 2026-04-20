import { useDeleteInquriryMutation, useGetAllInquiryQuery } from '@/Rtk/inquiryApi'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import Swal from 'sweetalert2';

const Inquiry = () => {

    const { data, error, isLoading } = useGetAllInquiryQuery();

    const [deleteInquiry] = useDeleteInquriryMutation()

    const columns = [
        { header: "email", accessor: "email" },
        { header: "firstName", accessor: "firstName" },
        { header: "lastName", accessor: "lastName" },
        { header: "message", accessor: "message" },
        { header: "subject", accessor: "subject" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        email: test.email || "N/A",
        // url: test.url || "N/A",
        firstName: test.firstName || "N/A",
        lastName: test.lastName || "N/A",
        message: test.message || "N/A",
        subject: test.subject || "N/A",
        action: (
            <div className="flex gap-3">

                <button
                    onClick={() => handleDelete(test._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];


    const handleDelete = async (id) => {

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
            const response = await deleteInquiry(id)
            console.log(response);

            if (response) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
      

    }


    return (
        <div>
            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Inquiry List" columns={columns} data={tableData} itemsPerPage={10} />
            )}

        </div>
    )
}

export default Inquiry