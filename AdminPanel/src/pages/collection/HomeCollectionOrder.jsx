import React, { useState, useEffect } from "react";
import { useGetAllHomeCollectionQuery } from "@/Rtk/orderApi";
import { IoMdEye, IoMdRefresh } from "react-icons/io";
import { FiFilter, FiCalendar, FiUser, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const HomeCollectionOrder = () => {
    const { data, isLoading, refetch } = useGetAllHomeCollectionQuery();
    const socket = io("https://db.shanyascans.com");

    const [selectedStatus, setSelectedStatus] = useState("");
    const [filterDays, setFilterDays] = useState(1);
    const [reportFilter, setReportFilter] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const itemsPerPage = 10;
    
    const [summary, setSummary] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0,
        ongoing: 0,
        completed: 0,
        reportReady: 0,
        notReady: 0,
    });

    const handleFetchData = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    useEffect(() => {
        if (!data) return;

        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today

        // Filter orders based on criteria
        let orders = data.filter(order => {
            const orderDate = new Date(order.bookingDate);
            const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

            const statusMatch = order.bookingStatus === selectedStatus || selectedStatus === "";
            const daysMatch = daysDiff <= filterDays; // Changed to <= for inclusive filtering
            const reportMatch = reportFilter ? order.reportStatus === reportFilter : true;

            return statusMatch && daysMatch && reportMatch;
        });

        // Sort by booking date/time (latest first)
        orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFilteredOrders(orders);
        setCurrentPage(1);

        // Calculate summary with all statuses
        const summaryData = {
            total: data.length,
            pending: data.filter(o => o.bookingStatus === "pending").length,
            confirmed: data.filter(o => o.bookingStatus === "confirmed").length,
            cancelled: data.filter(o => o.bookingStatus === "cancelled").length,
            ongoing: data.filter(o => o.bookingStatus === "ongoing").length,
            completed: data.filter(o => o.bookingStatus === "completed").length,
            reportReady: data.filter(o => o.reportStatus === "ready").length,
            notReady: data.filter(o => o.reportStatus === "not ready").length,
        };

        setSummary(summaryData);
    }, [data, selectedStatus, filterDays, reportFilter]);

    useEffect(() => {
        socket.on("orderPlaced", () => {
            handleFetchData();
        });
        
        return () => {
            socket.off("orderPlaced");
        };
    }, []);

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            confirmed: "bg-blue-100 text-blue-800 border-blue-200",
            cancelled: "bg-red-100 text-red-800 border-red-200",
            ongoing: "bg-purple-100 text-purple-800 border-purple-200",
            completed: "bg-green-100 text-green-800 border-green-200",
            ready: "bg-green-100 text-green-800 border-green-200",
            "not ready": "bg-red-100 text-red-800 border-red-200"
        };
        return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f509a]"></div>
                <p className="ml-3 text-lg text-gray-600">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="p-4  bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1f509a] mb-2">
                            Home Collection Orders
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Manage and track all home collection bookings
                        </p>
                    </div>
                    <button
                        onClick={handleFetchData}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1f509a] text-white rounded-lg hover:bg-[#1a1245] transition-colors disabled:opacity-50"
                    >
                        <IoMdRefresh className={`${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-4 mb-4">
                {[
                    { label: "Total", value: summary.total, bg: "bg-gradient-to-r from-blue-500 to-blue-600", icon: FiFileText },
                    { label: "Pending", value: summary.pending, bg: "bg-gradient-to-r from-amber-500 to-amber-600", icon: FiCalendar },
                    { label: "Confirmed", value: summary.confirmed, bg: "bg-gradient-to-r from-blue-600 to-blue-700", icon: FiUser },
                    { label: "Cancelled", value: summary.cancelled, bg: "bg-gradient-to-r from-red-500 to-red-600", icon: FiFileText },
                    { label: "Ongoing", value: summary.ongoing, bg: "bg-gradient-to-r from-purple-500 to-purple-600", icon: FiCalendar },
                    { label: "Completed", value: summary.completed, bg: "bg-gradient-to-r from-green-500 to-green-600", icon: FiUser },
                    { label: "Report Ready", value: summary.reportReady, bg: "bg-gradient-to-r from-indigo-500 to-indigo-600", icon: FiFileText },
                    { label: "Not Ready", value: summary.notReady, bg: "bg-gradient-to-r from-gray-500 to-gray-600", icon: FiCalendar },
                ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className={`${item.bg} text-white p-4 rounded-xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}>
                            <div className="flex justify-center mb-2">
                                <IconComponent className="text-xl" />
                            </div>
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className="text-sm opacity-90">{item.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                {/* <div className="flex items-center gap-2 mb-4">
                    <FiFilter className="text-[#1f509a]" />
                    <h3 className="text-lg font-semibold text-[#1f509a]">Filters</h3>
                </div> */}
                
                <div className="flex flex-wrap gap-4 items-end">
                    {/* Status Filter */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Booking Status</label>
                        <select 
                            value={selectedStatus} 
                            onChange={(e) => setSelectedStatus(e.target.value)} 
                            className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-[#1f509a] focus:border-transparent transition-all"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Days Filter */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Time Period</label>
                        <div className="flex items-center bg-white shadow-sm border border-gray-300 rounded-lg p-[0.4rem]">
                            <span className="text-gray-700 text-sm mr-2">Last</span>
                            <input 
                                type="number" 
                                min="1" 
                                max="365"
                                value={filterDays} 
                                onChange={(e) => setFilterDays(Number(e.target.value))}
                                className="border-0 p-0 w-16 text-center focus:ring-0 focus:outline-none" 
                            />
                            <span className="text-gray-700 text-sm ml-2">days</span>
                        </div>
                    </div>

                    {/* Report Status Filter */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Report Status</label>
                        <select 
                            value={reportFilter} 
                            onChange={(e) => setReportFilter(e.target.value)} 
                            className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-[#1f509a] focus:border-transparent transition-all"
                        >
                            <option value="">All Reports</option>
                            <option value="ready">Ready</option>
                            <option value="not ready">Not Ready</option>
                        </select>
                    </div>

                    {/* Results Count */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Results</label>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                            <span className="font-semibold text-[#1f509a]">{filteredOrders.length}</span>
                            <span className="text-gray-600 text-sm ml-1">orders</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-2 bg-[#1f509a] text-white flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Order List</h3>
                    <p className="text-xs opacity-90">Page {currentPage} of {totalPages}</p>
                </div>

                {currentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Booking Time</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Order Details</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Patient</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Report</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Price</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <td className="p-2">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-900">
                                                    {new Date(order.bookingTime).toLocaleDateString()}
                                                </div>
                                                <div className="text-gray-500">
                                                    {new Date(order.bookingTime).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-900">{order.orderName}</div>
                                                {order.orderId && (
                                                    <div className="text-gray-500">ID: {order.orderId}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="font-medium text-gray-900">{order.patientName}</div>
                                        </td>
                                        <td className="p-2">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.bookingStatus)}`}>
                                                {order.bookingStatus.charAt(0).toUpperCase() + order.bookingStatus.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-2">
                                            {console.log(order.reportStatus)}
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.reportStatus)}`}>
                                                {order.reportStatus === "ready" ? "Ready" : "Not Ready"}
                                            </span>
                                        </td>
                                        <td className="p-2">
                                            <span className="font-semibold text-green-600">₹{order.orderPrice}</span>
                                        </td>
                                        <td className="p-2">
                                            <Link 
                                                to={"/dashboard/home-collection/detail"} 
                                                state={{ ...order }}
                                                className="inline-flex items-center justify-center w-8 h-8 bg-[#1f509a] text-white rounded-lg hover:bg-[#1a1245] transition-colors"
                                            >
                                                <IoMdEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📋</div>
                        <p className="text-xl text-gray-500 mb-2">No orders found</p>
                        <p className="text-gray-400">Try adjusting your filters to see more results</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i + 1));
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                        currentPage === pageNum
                                            ? 'bg-[#1f509a] text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomeCollectionOrder;















// import React, { useState, useEffect } from "react";
// import { useGetAllHomeCollectionQuery } from "@/Rtk/orderApi";
// import { IoMdEye } from "react-icons/io";
// import { Link } from "react-router-dom";
// import io from "socket.io-client";

// const HomeCollectionOrder = () => {
//     const { data, isLoading,refetch } = useGetAllHomeCollectionQuery();

//      const socket = io("https://db.shanyascans.com");


//     const [selectedStatus, setSelectedStatus] = useState("confirmed");
//     const [filterDays, setFilterDays] = useState(1);
//     const [reportFilter, setReportFilter] = useState("");
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;
//     const [summary, setSummary] = useState({
//         total: 0,
//         pending: 0,
//         cancelled: 0,
//         ongoing: 0,
//         completed: 0,
//         reportReady: 0,
//         notReady: 0,
//     });

//     const handleFetchData=async()=>{
//         await refetch();
//     }

//     useEffect(() => {
//         if (!data) return;

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         // let orders=data

//         let orders = data.filter(order => {
//             const orderDate = new Date(order.bookingDate);
//             orderDate.setHours(0, 0, 0, 0);
//             const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

//             return (
//                 order.bookingStatus === selectedStatus &&
//                 daysDiff < filterDays &&
//                 (reportFilter ? order.reportStatus === reportFilter : true)
//             );
//         });

//         orders.reverse(); // Latest order first
          
//         const reversedOrders = [...orders].reverse(); 

        
//         // orders.reverse()

//         setFilteredOrders(reversedOrders);
//         setCurrentPage(1);

//         let summaryData = {
//             total: data.length,
//             pending: data.filter(o => o.bookingStatus === "pending").length,
//             cancelled: data.filter(o => o.bookingStatus === "cancelled").length,
//             ongoing: data.filter(o => o.bookingStatus === "ongoing").length,
//             completed: data.filter(o => o.bookingStatus === "completed").length,
//             reportReady: data.filter(o => o.reportStatus === "ready").length,
//             notReady: data.filter(o => o.reportStatus === "not ready").length,
//         };

//         setSummary(summaryData);
//     }, [data, selectedStatus, filterDays, reportFilter]);

//       useEffect(() => {
//         socket.on("orderPlaced", () => { 
//             handleFetchData()
//         });
        
//         return () => {
//           socket.off("orderPlaced");
//         };
//       }, []);

//     const indexOfLastOrder = currentPage * itemsPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//     const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//     const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//     if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;


//     console.log(currentOrders);
//     console.log(data);
    
    

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h2 className="text-3xl font-bold mb-6 text-center text-[#1f509a]">Home Collection Orders</h2>

//             {/* Summary Stats */}
//             <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
//                 {[
//                     { label: "Total", value: summary.total, bg: "bg-blue-500" },
//                     { label: "Pending", value: summary.pending, bg: "bg-yellow" },
//                     { label: "Cancelled", value: summary.cancelled, bg: "bg-red-500" },
//                     { label: "Ongoing", value: summary.ongoing, bg: "bg-purple-500" },
//                     { label: "Completed", value: summary.completed, bg: "bg-green-500" },
//                     { label: "Report Ready", value: summary.reportReady, bg: "bg-indigo-500" },
//                     { label: "Not Ready", value: summary.notReady, bg: "bg-gray-500" },
//                 ].map((item, index) => (
//                     <div key={index} className={`${item.bg} text-white p-4 rounded-lg text-center shadow-lg`}>
//                         <p className="text-lg font-bold">{item.value}</p>
//                         <p className="text-sm">{item.label}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Filters */}
//             <div className="flex flex-wrap gap-4 mb-6 justify-center">
//                 <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border p-2 rounded-md bg-white shadow-md">
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="cancelled">Cancelled</option>
//                     <option value="completed">Completed</option>
//                 </select>

//                 <div className="flex items-center bg-white shadow-md p-2 rounded-lg">
//                     <label className="font-semibold text-gray-700">Show last</label>
//                     <input type="number" min="1" value={filterDays} onChange={(e) => setFilterDays(Number(e.target.value))}
//                         className="border border-gray-300 p-2 rounded w-16 text-center mx-2" />
//                     <span className="text-gray-700">days</span>
//                 </div>

//                 <select value={reportFilter} onChange={(e) => setReportFilter(e.target.value)} className="border p-2 rounded-md bg-white shadow-md">
//                     <option value="">All Reports</option>
//                     <option value="ready">Ready</option>
//                     <option value="not ready">Not Ready</option>
//                 </select>
//             </div>

//             {/* Orders Table */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 {currentOrders.length > 0 ? (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-[#1f509a] text-white text-center">
//                                 <th className="p-2 border">Booking Time</th>
//                                 <th className="p-2 border">Order Name</th>
//                                 <th className="p-2 border">Patient Name</th>
//                                 <th className="p-2 border">Status</th>
//                                 <th className="p-2 border">Report Status</th>
//                                 <th className="p-2 border">Price</th>
//                                 <th className="p-2 border">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentOrders.map((order, i) => (
//                                 <tr key={i} className="text-center bg-gray-50 hover:bg-gray-100 transition">
//                                     <td className="p-2 border">{new Date(order.bookingTime).toLocaleTimeString()}</td>
//                                     <td className="p-2 border">{order.orderName}</td>
//                                     <td className="p-2 border">{order.patientName}</td>
//                                     <td className={`p-2 border font-semibold ${order.bookingStatus === "pending" ? "text-red-500" : "text-green-500"}`}>
//                                         {order.bookingStatus}
//                                     </td>
//                                     <td className={`p-2 border font-semibold ${order.reportStatus === "not ready" ? "text-red-500" : "text-green-500"}`}>
//                                         {order.reportStatus}
//                                     </td>
//                                     <td className="p-2 border">₹{order.orderPrice}</td>
//                                     <td className="p-2 border">
//                                         <Link to={"/dashboard/home-collection/detail"} state={{ ...order }}>
//                                             <IoMdEye />
//                                         </Link>


//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : <p className="text-center text-gray-500">No bookings found.</p>}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-2 mt-4">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>

//                 <span className="text-lg font-semibold">{currentPage}</span>

//                 <button
//                     onClick={() => setCurrentPage(prev => (prev * itemsPerPage < filteredOrders.length ? prev + 1 : prev))}
//                     className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
//                     disabled={currentPage * itemsPerPage >= filteredOrders.length}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default HomeCollectionOrder;
