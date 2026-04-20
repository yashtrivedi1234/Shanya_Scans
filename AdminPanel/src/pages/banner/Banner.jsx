import { useState } from 'react';
import { useAddBannerMutation, useDeleteBannerMutation, useEditBannerMutation, useGetAllBannerQuery } from '@/Rtk/bannerApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useDeleteScanMutation } from '@/Rtk/scanApi';
import Spinner from '../Loading/SpinLoading';
import Swal from 'sweetalert2';

const Banner = () => {
    const { data, isLoading } = useGetAllBannerQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [selectedType, setSelectedType] = useState("banner1");
    const [selectedUrl, setSelectedUrl] = useState("/pathology"); // Default selection
    const [photo, setPhoto] = useState(null);
    const [addBanner, { isLoading: isAddLoading, isError, isSuccess }] = useAddBannerMutation();
    const [deleteBanner, { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeleteBannerMutation();
    const [editBanner, { isLoading: isEditLoading, isError: isEditError, isSuccess: isEditSuccess }] = useEditBannerMutation();
    const [spinLoading, setSpinLoading] = useState(false)


    // URL Mapping for Selection
    const urlOptions = [
        { label: "Pathology", value: "/pathology", index: 2 },
        { label: "Scan", value: "/scan", index: 3 },
        { label: "Package", value: "/package", index: 4 },
        { label: "Contact", value: "/contact", index: 5 }
    ];

    // Open Modal with selected banner details
    const handleEdit = (banner) => {
        setCurrentBanner(banner);
        setSelectedType(banner.types==="banner1" ? "banner1" :"banner2");
        setSelectedUrl(banner.url || "/pathology"); // Set URL if available
        setIsModalOpen(true);
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
                const response = await deleteBanner(id);
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
        } catch (error) {
            console.error("Error deleting:", error);
        } finally {
            setSpinLoading(false); // ✅ Always stop loading
        }
    };
    

    // Handle File Upload
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinLoading(true)
        const selectedUrlIndex = urlOptions.find(option => option.value === selectedUrl)?.index || 2;
        const formData = new FormData()

        formData.append("name", "banner")
        formData.append("types", selectedType)
        formData.append("url", selectedUrlIndex)
        formData.append("index", selectedUrlIndex)
        formData.append("photo", photo)


        let response
        
        if(currentBanner){
           response = await editBanner({formData,id:currentBanner._id}) 
        }else{
            response = await addBanner(formData) 
        }
       

        if (response?.data) {
            setCurrentBanner(null)
            setSelectedUrl("/pathology")
            setSelectedType("banner1")
            setCurrentBanner(null)
        }
        setSpinLoading(false)
        // Send updated banner data to the API (implement API call here)
        setIsModalOpen(false);
    };



    const columns = [
        { header: "Type", accessor: "type" },
        // { header: "URL", accessor: "url" },
        { header: "Photo", accessor: "photo" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        type: test.types === "banner2" ? "Slider-Banner" : "Home-Banner" || "N/A",
        // url: test.url || "N/A",
        photo: test.photo ? (
            <img
                src={test.photo.secure_url}
                alt="Banner"
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
                    onClick={() => handleDelete(test._id)}
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
                <h2 className="text-2xl font-semibold text-gray-700">{"Banner"}</h2>
                <button
                    className="bg-yellow text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Banner
                </button>
            </div>

            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Banner List" columns={columns} data={tableData} itemsPerPage={10} />
            )}

            {/* Modal for Adding/Editing Banner */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{currentBanner ? "Edit Banner" : "Add Banner"}</h2>

                        {/* Edit Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Dropdown for Banner Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Banner Type</label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="banner1">Banner (Type 1)</option>
                                    <option value="banner2">Slider (Type 2)</option>
                                </select>
                            </div>

                            {/* Dropdown for URL Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select URL</label>
                                <select
                                    value={selectedUrl}
                                    onChange={(e) => setSelectedUrl(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    {urlOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                                <input type="file" onChange={handlePhotoChange} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Submit & Cancel Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                {spinLoading ? <Spinner /> : <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                    {currentBanner ? "Edit Save" :
                                    "Save Changes"}
                                </button>}

                            </div>
                        </form>
                    </div>
                </div>
            )}


            
        </div>
    );
};

export default Banner;
