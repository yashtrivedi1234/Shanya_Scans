import { useDeleteCarrerMutation, useGetAllOpeningQuery } from '@/Rtk/carrerApi'
import { useDeleteCarrerOpeningMutation, useGetCarrerOpeningQuery } from '@/Rtk/galleryApi'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Loading/SpinLoading'
import TableComponent from '../helper/TableComponent'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const Opening = () => {

    const { data, isLoading, error } = useGetCarrerOpeningQuery()
    const [spinLoading, setSpinLoading] = useState(false)
    const [deleteOpening] = useDeleteCarrerOpeningMutation()

    const navigate = useNavigate()




    const columns = [
        { header: 'Job Title', accessor: 'title' },
        { header: 'Job Category', accessor: 'category' },
        { header: 'Job Type', accessor: 'type' },

        { header: 'Action', accessor: 'action', type: 'action' },
    ];



    const handleEdit = (item) => {
        navigate("/dashboard/opening/add", { state: item });
    };


    const handleDelete = async (id) => {
        setSpinLoading(true); // ✅ Start Loading
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
                await deleteOpening(id)


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
        } catch (error) {
            console.error("Error deleting:", error);
        } finally {
            setSpinLoading(false); // ✅ Always stop loading
        }
    };








    const tableData = data && Array.isArray(data) && data?.map((item) => ({
        title: item?.jobTitle,
        category: item?.jobCategory,
        type: item?.jobType,
        action: (
            <div className="flex gap-3">
                <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];





    return (
        <div>

            <div className="flex items-center justify-between mb-4 pt-4">
                <h2 className="text-2xl font-semibold text-gray-700">All Opening</h2>
                <div className='flex items-center  gap-6'>
                    <Link to={"/dashboard/carrer"}
                        className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => setOpne()}
                    >
                        Apply List
                    </Link>
                    <Link to={"/dashboard/opening/add"}
                        className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => setOpne()}
                    >
                        + Add Opening
                    </Link>
                </div>

            </div>
            {isLoading ? <div className='flex items-center justify-center h-[100vh]'><Spinner /></div> : <TableComponent title="Image List"
                columns={columns}
                data={tableData}
                itemsPerPage={10} />}

        </div>
    )
}

export default Opening