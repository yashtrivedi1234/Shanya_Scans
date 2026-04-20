
import { useAddLabTestTagMutation, useDeleteLabTagMutation, useEditLabTagMutation, useGetAllLabTestQuery, useGetAllLabTestTagQuery } from '@/Rtk/labTestTag';
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import Spinner from '../Loading/SpinLoading';
import Swal from 'sweetalert2';

const LabTestTag = () => {
    const { data, isLoading } = useGetAllLabTestTagQuery()
    const { data: pathology, isLoading: isPathology } = useGetAllLabTestQuery()
    const [addLabTestTag, { isLoading: isAddLoading, isError, isSuccess }] = useAddLabTestTagMutation();
    const [deleteLabTestTag, { isLoading: isDeleteLoading, isError: isDelete, isSuccess: isDeleteSuccess }] = useDeleteLabTagMutation();
    const [editLabTestTag] = useEditLabTagMutation();
    const [currentTag, setCurrentTag] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false)
    const [text, setText] = useState("")
    const [pathologyId, setPathologyId] = useState("")
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");

    const columns = [
        { header: "name", accessor: "type" },
        { header: "Photo", accessor: "photo" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        setSpinLoading(true)
        formData.append("labTagName", text)
        formData.append("icon", photo)
        formData.append("slug", pathologyId)
        let response

        if (currentTag) {
            response = await editLabTestTag({ formData, pathologyId: currentTag._id }).unwrap()
        } else {
            response = await addLabTestTag({ formData, pathologyId }).unwrap(); // unwrap()
        }


        console.log(response);




        if (response?.success) {

            setCurrentTag(null)
            setText("")
            setPhoto("")
            setPathologyId("")
            setIsModalOpen(false)
        }
        setSpinLoading(false)

    }


    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleDeleteTag = async (id) => {
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
                const response = await deleteLabTestTag(id).unwrap(); // Await the mutation


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

    const handleEditTag = (data) => {
        setCurrentTag(data)
        setText(data?.labTagName)
        setPhoto(data?.icon?.secure_url)
        setPathologyId(data?.labSlugName)
        setIsModalOpen(true)

    }

    const handleCancelTag = () => {
        setCurrentTag(null)
        setText("")
        setPhoto("")
        setPathologyId("")
        setIsModalOpen(false)
    }


    const filteredData = data?.filter((item) =>
        item.labTagName?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const tableData = filteredData?.map((test) => ({
        type: test?.labTagName || "N/A",
        // url: test.url || "N/A",
        photo: test.icon ? (
            <img
                src={test.icon.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
        action: (
            <div className="flex gap-3">
                <button
                    onClick={() => handleEditTag(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDeleteTag(test._id)}
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
                <h2 className="text-2xl font-semibold text-gray-700">{"Pathology Lab Tag"}</h2>
                <button
                    className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Tag
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Tag Name..."
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Lab Test Tag" columns={columns} data={tableData} itemsPerPage={10} />
            )}


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{currentTag ? "Edit Lab Tag" : "Add Lab Tag"}</h2>

                        {/* Edit Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Dropdown for Banner Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Enter Tag Name</label>
                                <input type="text" value={text} className='w-full py-1 rounded  border border-gray-700' onChange={(e) => setText(e.target.value)} />
                            </div>



                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                                <input type="file" onChange={handlePhotoChange} className="w-full p-2 border rounded-md" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Pathology</label>
                                <select
                                    value={pathologyId}
                                    onChange={(e) => setPathologyId(e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md border-gray-700"
                                >
                                    <option value="">Select Pathology</option>
                                    {pathology?.map((item) => (
                                        <option key={item._id} value={item.slug}>
                                            {item.testDetailName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit & Cancel Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => handleCancelTag()}


                                >
                                    Cancel
                                </button>
                                {spinLoading ? <Spinner /> : <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                    {currentTag ? "Edit Save" :
                                        "Save Changes"}
                                </button>}

                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default LabTestTag