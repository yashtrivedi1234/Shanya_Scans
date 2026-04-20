import {
    useAddPackageTagMutation,
    useDeletePackageTagMutation,
    useEditPackageTagMutation,
    useGetAllPackageQuery,
    useGetAllPackageTagQuery,
} from "@/Rtk/packageApi";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableComponent from "../helper/TableComponent";
import { useDispatch } from "react-redux";
import Spinner from "../Loading/SpinLoading";
import Swal from "sweetalert2";

const PackageConcern = () => {
    const { data, isLoading } = useGetAllPackageTagQuery();
    const { data: allPackage, isLoading: isPackage } = useGetAllPackageQuery();
    const [addPackageTag] = useAddPackageTagMutation();
    const [deletePackageTag] = useDeletePackageTagMutation();
    const [editPackageTag] = useEditPackageTagMutation();

    const [currentTag, setCurrentTag] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [text, setText] = useState("");
    const [pathologyId, setPathologyId] = useState("");
    const [photo, setPhoto] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const columns = [
        { header: "Tag Name", accessor: "tag" },
        { header: "Photo", accessor: "photo" },
        { header: "Action", accessor: "action", type: "action" },
    ];

    const filteredData = data?.filter((item) =>
        item.packageTagName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableData =
        filteredData?.map((test) => ({
            tag: test?.packageTagName || "N/A",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        setSpinLoading(true);
        formData.append("packageTagName", text);
        formData.append("icon", photo);
        formData.append("slug", pathologyId);

        let response;

        if (currentTag) {
            response = await editPackageTag({ formData, id: currentTag._id }).unwrap();
        } else {
            response = await addPackageTag({ formData, pathologyId }).unwrap();
        }

        if (response?.success) {
            setCurrentTag(null);
            setText("");
            setPhoto("");
            setPathologyId("");
            setIsModalOpen(false);
        }

        setSpinLoading(false);
    };

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
                const response = await deletePackageTag(id).unwrap();

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
    };

    const handleEditTag = (data) => {
        setCurrentTag(data);
        setText(data?.packageTagName);
        setPhoto(data?.icon?.secure_url);
        setPathologyId(data?.packageSlugName);
        setIsModalOpen(true);
    };

    const handleCancelTag = () => {
        setCurrentTag(null);
        setText("");
        setPhoto("");
        setPathologyId("");
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pt-4 gap-2">
                <h2 className="text-2xl font-semibold text-black">Health-Package Tag</h2>
                <div className="flex flex-col sm:flex-row items-center gap-2">

                    <button
                        className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Add Health Concern
                    </button>
                </div>




            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Package Tag Name..."
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TableComponent
                    title="Package List"
                    columns={columns}
                    data={tableData}
                    itemsPerPage={10}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {currentTag ? "Edit Health Tag" : "Add Health Tag"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Enter Health Concern Tag Name
                                </label>
                                <input
                                    type="text"
                                    value={text}
                                    className="w-full py-1 rounded border border-gray-700"
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Photo
                                </label>
                                <input
                                    type="file"
                                    onChange={handlePhotoChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Package
                                </label>
                                <select
                                    value={pathologyId}
                                    onChange={(e) => setPathologyId(e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md border-gray-700"
                                >
                                    <option value="">Select Package</option>
                                    {allPackage?.map((item) => (
                                        <option key={item._id} value={item.slug}>
                                            {item.packageName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={handleCancelTag}
                                >
                                    Cancel
                                </button>
                                {spinLoading ? (
                                    <Spinner />
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        {currentTag ? "Edit Save" : "Save Changes"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageConcern;
