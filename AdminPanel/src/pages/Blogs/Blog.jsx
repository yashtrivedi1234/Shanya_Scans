import { useDeleteBlogMutation, useGetAllBlogQuery } from '@/Rtk/blogApi'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Blog = () => {

    const { data, isLoading } = useGetAllBlogQuery()
    const [deleteBlog] = useDeleteBlogMutation()
    const [spinLoading, setSpinLoading] = useState(false)
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");

    const columns = [
        { header: "Blog Name", accessor: "name" },
        { header: "photo", accessor: "photo" },

        { header: "Action", accessor: "action", type: "action" }
    ];

    const handleEdit = (data) => {
        navigate("/dashboard/add/blog", { state: data })
    }

    const handleAdd = () => {
        navigate("/dashboard/add/blog")
    }

    const filteredData = data?.filter((item) =>
        item.blogName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableData = filteredData?.map((test) => ({
        name: test?.blogName
            || "N/A",
        // url: test.url || "N/A",
        photo: test.blogPhoto ? (
            <img
                src={test?.blogPhoto?.secure_url}
                alt={test?.blogName}
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),

        action: (
            <div className="flex gap-3">
                <button
                    onClick={() => handleEdit(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDelete(test?._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];


    const handleDelete = async (id) => {
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
                const response = await deleteBlog(id)


                if (response?.success) {
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
        }

    }



    return (
        <div>
            <div className="flex items-center justify-between mb-4 pt-4">
                <h2 className="text-2xl font-semibold text-black">{"Blog"}</h2>
                <button
                    className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    // onClick={() => setIsModalOpen(true)}
                    onClick={() => navigate("/dashboard/add/blog")}
                >
                    + Add Blog
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Blog Name..."
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? <p>Loading...</p> : <TableComponent title="Blog List" columns={columns} data={tableData} itemsPerPage={10} />}


        </div>
    )
}

export default Blog