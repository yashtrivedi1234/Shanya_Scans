import { useAddGalleryMutation, useDeleteGalleryMutation, useEditGalleryMutation, useGetAllGalleryQuery } from '@/Rtk/galleryApi';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import Swal from 'sweetalert2';
import Spinner from '../Loading/SpinLoading';

const Gallery = () => {
    const { data, isLoading } = useGetAllGalleryQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [selectedUrl, setSelectedUrl] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [spinLoading, setSpinLoading] = useState(false);
    const [photo, setPhoto] = useState(null)
    const [addGallery] = useAddGalleryMutation()
    const [deleteGallery] = useDeleteGalleryMutation()
    const [editGallery]=useEditGalleryMutation()
    const [editId,setEditId]=useState(null)

    const handleEdit = (item) => {
        setEditId(item?._id)
        setIsModalOpen(true)
        setPhotoPreview(item?.photo?.secure_url)
        setPhoto(item?.photo?.secure_url)
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
                await deleteGallery(id)
          

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


    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinLoading(true);
        let response
        // Submit logic here
        const formData = new FormData()
        formData.append("photo", photo)
        if(editId){
            response = await editGallery({formData,id:editId})
        }else{
            response = await addGallery(formData)
        }
        setIsModalOpen(false)
        setSpinLoading(false)
    };



    const columns = [
        { header: 'Photo', accessor: 'photo' },
        { header: 'Action', accessor: 'action', type: 'action' },
    ];

    const tableData = data?.map((item) => ({
        photo: (
            <img
                src={item.photo.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300 cursor-pointer"
                onClick={() => setPhotoPreview(item.photo.secure_url)}
            />
        ),
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
                <h2 className="text-2xl font-semibold text-gray-700">Gallery</h2>
                <button
                    className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Image
                </button>
            </div>

            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent
                    title="Image List"
                    columns={columns}
                    data={tableData}
                    itemsPerPage={10}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {currentBanner ? 'Edit Image' : 'Add Image'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">


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

                            {photoPreview && (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-md mt-2"
                                />
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                {spinLoading ? (
                                   <Spinner/>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        {currentBanner ? 'Edit Save' : 'Save Changes'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {photoPreview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setPhotoPreview(null)}
                >
                    <img src={photoPreview} alt="Preview" className="max-w-full max-h-full rounded-md" />
                </div>
            )}
        </div>
    );
};

export default Gallery;