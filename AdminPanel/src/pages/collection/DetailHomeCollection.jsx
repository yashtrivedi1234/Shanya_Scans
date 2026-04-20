import { 
    useAssignedCollectionSalesMutation, 
    useGetCollectionSalesQuery, 
    useGetHomeCollectionDetailQuery 
} from "@/Rtk/collectionApi";
import { useOrderStatusMutation, useOrderReportMutation } from "@/Rtk/orderApi";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
    FiUser, FiCalendar, FiFileText, FiDollarSign, 
    FiArrowLeft, FiCheck, FiX, FiUpload, FiDownload, FiTag
} from "react-icons/fi";
import { toast } from "react-toastify";

const DetailHomeCollection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const fileInputRef = useRef(null);

    const { data: detail, isLoading: detailLoading, refetch } = useGetHomeCollectionDetailQuery(state?._id);
    const [changeStatus, { isLoading: statusLoading }] = useOrderStatusMutation();
    const [uploadReport, { isLoading: uploadLoading }] = useOrderReportMutation();
    const [assignedCollectionSales, { isLoading: assignLoading }] = useAssignedCollectionSalesMutation();
    const { data: salesData, isLoading: salesLoading } = useGetCollectionSalesQuery();

    const [assignedTo, setAssignedTo] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    if (!state) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                <FiFileText className="text-8xl text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Order Details Available</h2>
                <p className="text-gray-500 mb-6">Please go back to the list of orders.</p>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
                >
                    <div className="flex items-center gap-2">
                        <FiArrowLeft />
                        Go Back
                    </div>
                </button>
            </div>
        );
    }

    if (detailLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="flex items-center gap-4 text-lg text-gray-600">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-500 border-t-transparent"></div>
                    <span>Loading order details...</span>
                </div>
            </div>
        );
    }

    const formatDateTime = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await changeStatus({
                data: { bookingStatus: newStatus },
                id: detail._id
            }).unwrap();
            toast.success(`Order ${newStatus}`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handleAssignment = async () => {
        if (!assignedTo) {
            toast.error("Please select a sales person to assign");
            return;
        }
        try {
            const selectedSales = salesData.find((val) => val.name === assignedTo);
            await assignedCollectionSales({
                salesId: selectedSales._id,
                orderId: detail._id
            }).unwrap();
            toast.success(`Order assigned to ${assignedTo}`);
            setAssignedTo("");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to assign order");
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error("Please select a PDF file");
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error("File size should be less than 10MB");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleReportUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a report file");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('report', selectedFile);
            await uploadReport({
                formData,
                id: detail._id
            }).unwrap();
            toast.success("Report uploaded successfully");
            setSelectedFile(null);
            fileInputRef.current.value = '';
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to upload report");
        }
    };

    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-4 p-3 border-b border-gray-100 last:border-b-0">
            <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-lg">
                <Icon />
            </div>
            <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
                <p className="font-medium text-sm  text-gray-900 leading-tight mt-1">{value || "N/A"}</p>
            </div>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto px-4  ">
                {/* Header */}
                <div className="flex items-center gap-4 rounded-xl mb-4 p-2 px-4 bg-[#1f509a]">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-100 capitalize">{detail?.orderName || "Order Details"}</h1>
                        <p className="text-sm font-medium text-gray-200 mt-1">Order ID: #{detail?._id?.slice(-8)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Patient & Order Details */}
                        <div className="bg-white rounded-xl border shadow-lg overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Patient & Order Information</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem icon={FiUser} label="Patient Name" value={detail?.patientName} />
                                <InfoItem icon={FiTag} label="Patient Age" value={detail?.patientAge} />
                                <InfoItem icon={FiUser} label="Patient Gender" value={detail?.patientGender} />
                                <InfoItem icon={FiDollarSign} label="Price" value={`₹${detail?.orderPrice}`} />
                                <InfoItem icon={FiFileText} label="Type" value={detail?.orderType} />
                                <InfoItem icon={FiTag} label="Category" value={detail?.category} />
                                <InfoItem icon={FiCalendar} label="Booking Date" value={formatDateTime(detail?.bookingDate)} />
                                <InfoItem icon={FiCalendar} label="Booking Time" value={formatDateTime(detail?.bookingTime)} />
                                <InfoItem icon={FiCalendar} label="Created At" value={formatDateTime(detail?.createdAt)} />
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="bg-white rounded-xl border shadow-lg p-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Status</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100">
                                    <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-lg">
                                        <FiFileText />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Order Status</p>
                                        <div className="mt-1">
                                            <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase ${
                                                detail?.bookingStatus === 'completed' ? 'bg-green-100 text-green-800' :
                                                detail?.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                detail?.bookingStatus === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {detail?.bookingStatus?.charAt(0)?.toUpperCase() + detail?.bookingStatus?.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100">
                                    <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-lg">
                                        <FiFileText />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Report Status</p>
                                        <div className="mt-1">
                                            <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase ${
                                                detail?.reportStatus === 'ready' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {detail?.reportStatus === "ready" ? "Ready" : "Not Ready"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {detail?.assignedTo && (
                                <div className="mt-3 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-4 p-2 rounded-lg bg-gray-100">
                                        <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-lg">
                                            <FiUser />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Assigned To</p>
                                            <p className="text-base font-bold text-gray-900 mt-1">{detail?.assignedTo?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl border shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleStatusChange("completed")}
                                    disabled={statusLoading || detail?.bookingStatus === "completed"}
                                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FiCheck className="text-lg" />
                                    Complete Order
                                </button>
                                <button
                                    onClick={() => handleStatusChange("cancelled")}
                                    disabled={statusLoading || detail?.bookingStatus === "cancelled" || detail?.bookingStatus === "completed"}
                                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FiX className="text-lg" />
                                    Cancel Order
                                </button>
                            </div>
                        </div>

                        {/* Report Upload/View */}
                        <div className="bg-white rounded-xl border shadow-lg p-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Report</h3>
                            {detail?.report?.secure_url ? (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">A report has already been uploaded.</p>
                                    <a
                                        href={detail?.report?.secure_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-[#1f509a] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-800 transition-colors"
                                    >
                                        <FiDownload className="text-lg" />
                                        View Report
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors"
                                    >
                                        <FiUpload className="text-lg" />
                                        Select PDF Report
                                    </button>
                                    {selectedFile && (
                                        <>
                                            <p className="text-sm text-gray-600 truncate px-2">Selected: <span className="font-medium">{selectedFile.name}</span></p>
                                            <button
                                                onClick={handleReportUpload}
                                                disabled={uploadLoading}
                                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                            >
                                                {uploadLoading ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                                ) : (
                                                    <FiUpload className="text-lg" />
                                                )}
                                                Upload Report
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Assignment */}
                        {!detail?.assignedTo && (
                            <div className="bg-white rounded-xl border shadow-lg p-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Assign Sales Person</h3>
                                <div className="space-y-3">
                                    <select
                                        value={assignedTo}
                                        onChange={(e) => setAssignedTo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                                        disabled={salesLoading}
                                    >
                                        <option value="">Select Sales Person</option>
                                        {Array.isArray(salesData) && salesData.map((person) => (
                                            <option key={person._id} value={person.name}>
                                                {person.name}
                                            </option>
                                        ))}
                                    </select>
                                    {assignedTo && (
                                        <button
                                            onClick={handleAssignment}
                                            disabled={assignLoading}
                                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                                        >
                                            {assignLoading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                            ) : (
                                                <FiUser className="text-lg" />
                                            )}
                                            Assign Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailHomeCollection;






// import { useAssignedCollectionSalesMutation, useGetCollectionSalesQuery, useGetHomeCollectionDetailQuery } from "@/Rtk/collectionApi";
// import { useOrderStatusMutation } from "@/Rtk/orderApi";
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const DetailHomeCollection = () => {
//     const location = useLocation();
//     const { state } = location;

// const { data: detail, isLoading: detailLoading } = useGetHomeCollectionDetailQuery(state?._id)
// const [changeStatus] = useOrderStatusMutation()

// React.useEffect(() => {
//   if (detail?.bookingStatus) {
//     setSelectedStatus(detail.bookingStatus);
//   }
// }, [detail]);



//     // Local state for editable fields
//     // const [detail, setdetail] = useState(detail || {});
//     const [selectedStatus, setSelectedStatus] = useState(detail?.bookingStatus);
//     const [assignedCollectionSales] = useAssignedCollectionSalesMutation()
//     const { data, isLoading } = useGetCollectionSalesQuery()
//     const [assignedTo, setAssignedTo] = useState("");
//     const [assignedId, setAssignedId] = useState("")

//     if (!state) {
//         return <div className="text-center text-red-500">No order details available</div>;
//     }

//     // Convert Date & Time to Readable Format
//     const formatDateTime = (isoString) => {
//         return new Date(isoString).toLocaleString();
//     };

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setdetail((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // Handle Status Update
//     const handleStatusChange = (status) => {


//     };

//     // Handle Assignment
//     const handleAssign = (e) => {

//         setAssignedTo(e.target.value);
//     };




//     const handleAssigned = async () => {
//         const filterData = data.find((val) => val.name === assignedTo);


//         const data1 = {
//             salesId: filterData._id,
//             orderId: state._id
//         }
//         console.log(data1);

//         const response = await assignedCollectionSales(data1)



//         setAssignedTo("")
//         setAssignedId("")



//     }











//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
//             <div className="flex items-center justify-between pb-4">
//                 <h2 className="text-2xl font-semibold text-gray-800 ">
//                     Order Details - {detail?.orderName}
//                 </h2>
//                 <div className="flex gap-4">
//                     <button
//                         className="bg-red-500 text-white px-4 py-2 rounded mr-2"

//                     >
//                         Cancelled
//                     </button>
//                     <button
//                         className="bg-green-500 text-white px-4 py-2 rounded mr-2"

//                     >
//                         Complete
//                     </button>

//                 </div>
//             </div>


//             {/* Order Details */}
//             <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
//                 <div>
//                     <span className="font-semibold text-gray-700">Patient Name:</span> {detail?.patientName}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <span className="font-semibold text-gray-700">Age:</span> {detail?.patientAge}
//                     </div>
//                     <div>
//                         <span className="font-semibold text-gray-700">Gender:</span> {detail?.patientGender}
//                     </div>
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Order Type:</span> {detail?.orderType}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Category:</span> {detail?.category}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Price (₹):</span> {detail?.orderPrice}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Quantity:</span> {detail?.quantity}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Booking Date:</span> {formatDateTime(detail?.bookingDate)}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Booking Time:</span> {formatDateTime(detail?.bookingTime)}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Created At:</span> {formatDateTime(detail?.createdAt)}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Order Status:</span>
//                     <span
//                         className={`ml-2 px-3 py-1 rounded ${selectedStatus === "pending"
//                             ? "bg-yellow-200 text-yellow-800"
//                             : selectedStatus === "completed"
//                                 ? "bg-green-200 text-green-800"
//                                 : "bg-red-200 text-red-800"
//                             }`}
//                     >
//                         {selectedStatus}
//                     </span>
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Report Status:</span> {detail?.reportStatus}
//                 </div>

//                 <div>
//                     <span className="font-semibold text-gray-700">Assigned To:</span> {detail?.assignedTo?.name || "Not Assigned"}
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-between items-center mt-6">
//                 {/* Left Side - Confirm & Cancel Buttons */}
//                 <div>
//                     {assignedTo &&
//                         <button
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
//                             onClick={() => handleAssigned()}
//                         >
//                             Save Changes
//                         </button>
//                     }

//                 </div>

//                 {/* Right Side - Assign To Dropdown */}
//                 {!detail?.assignedTo &&
//                     <div className="relative">
//                         <select
//                             className="border p-2 rounded"
//                             value={assignedTo}
//                             onChange={handleAssign}
//                         >
//                             <option value="">Assign To</option>
//                             {Array.isArray(data) && data.map((val) => {
//                                 return (<option value={val?.name}>{val?.name}</option>)
//                             })}

//                         </select>
//                     </div>
//                 }
//             </div>
//         </div>
//     );
// };

// export default DetailHomeCollection;
