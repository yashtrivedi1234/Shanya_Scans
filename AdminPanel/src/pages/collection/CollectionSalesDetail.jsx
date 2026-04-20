import { useGetHomeCollectionSalesDetailQuery } from '@/Rtk/collectionApi';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CollectionSalesDetail = () => {
    const location = useLocation();
    const { state } = location;
    const { data, isLoading } = useGetHomeCollectionSalesDetailQuery(state?._id);

    const [currentStep, setCurrentStep] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentActionPage, setCurrentActionPage] = useState(1);
    const itemsPerPage = 5;

    if (isLoading) return <div className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</div>;
    if (!data) return <div className="text-center mt-10 text-lg font-semibold text-red-600">No Data Found!</div>;

    const { name, email, active, orderDetails } = data;

    // Pagination Logic
    const totalPages = Math.ceil(orderDetails.length / itemsPerPage);
    const displayedOrders = orderDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const displayedActions = orderDetails.slice((currentActionPage - 1) * itemsPerPage, currentActionPage * itemsPerPage);

    // Summary Counts
    const totalBookings = orderDetails.length;
    const completedBookings = orderDetails.filter(order => order.bookingStatus === "completed").length;
    const cancelledBookings = orderDetails.filter(order => order.bookingStatus === "cancelled").length;
    const pendingBookings = orderDetails.filter(order => order.bookingStatus === "pending").length;

      // Filtering Today's Bookings
      const today = new Date().toISOString().split('T')[0];
  const todayOrders = orderDetails.filter(order => order.createdAt.split('T')[0] === today);
  const todayTotalBookings = todayOrders.length;
  const todayCompleted = todayOrders.filter(order => order.bookingStatus === "completed").length;
  const todayCancelled = todayOrders.filter(order => order.bookingStatus === "cancelled").length;
  const todayPending = todayOrders.filter(order => order.bookingStatus === "pending").length;



    return (
        <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
            {/* Step Navigation */}
            <div className="flex space-x-4 mb-6">
                {["Sales Details", "Orders", "Summary", "Actions"].map((step, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentStep(index + 1)}
                        className={`px-5 py-2 text-lg font-semibold rounded-md transition-all duration-200 
              ${currentStep === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        {step}
                    </button>
                ))}
            </div>

            {/* Step 1: Sales Executive Details */}
            {currentStep === 1 && (
                <div className="p-6 border border-gray-300 rounded-md shadow-sm">
                    <h2 className="text-xl font-bold text-gray-700">Sales Executive Details</h2>
                    <p className="mt-3 text-lg"><strong>Name:</strong> {name}</p>
                    <p className="text-lg"><strong>Email:</strong> {email}</p>
                    <p className="text-lg">
                        <strong>Status:</strong> <span className={`font-semibold ${active ? "text-green-600" : "text-red-600"}`}>{active ? "Active" : "Inactive"}</span>
                    </p>

                    {/* Today's Summary Section */}
                    <div className="mt-5 p-5 bg-gray-100 rounded-md">
                        <h2 className="text-xl font-bold">Today's Booking Summary</h2>
                        <div className="flex justify-between mt-3 text-lg font-semibold">
                            <p>Total: {todayTotalBookings}</p>
                            <p className="text-green-600">Completed: {todayCompleted}</p>
                            <p className="text-red-600">Cancelled: {todayCancelled}</p>
                            <p className="text-yellow-500">Pending: {todayPending}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Orders Table with Pagination */}
            {currentStep === 2 && (
                <div className="mt-5">
                    <h2 className="text-xl font-bold mb-4">Orders List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="py-3 px-4 border">#</th>
                                    <th className="py-3 px-4 border">Patient</th>
                                    <th className="py-3 px-4 border">Category</th>
                                    <th className="py-3 px-4 border">Price</th>
                                    <th className="py-3 px-4 border">Status</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {displayedOrders.map((order, index) => (
                                    <tr key={order._id} className="text-center border-t hover:bg-gray-100">
                                        <td className="py-3 px-4 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="py-3 px-4 border">{order.patientName}</td>
                                        <td className="py-3 px-4 border">{order.category}</td>
                                        <td className="py-3 px-4 border font-semibold">₹{order.orderPrice}</td>
                                        <td className={`py-3 px-4 border font-semibold ${order.bookingStatus === "pending" ? "text-yellow-500" : order.bookingStatus === "completed" ? "text-green-600" : "text-red-600"}`}>
                                            {order.bookingStatus}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4 space-x-3">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-5 py-2 bg-gray-300 rounded-md">Prev</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-5 py-2 bg-gray-300 rounded-md">Next</button>
                    </div>
                </div>
            )}

            {/* Step 3: Booking Summary */}
            {currentStep === 3 && (
                <div className="mt-5 p-5 bg-gray-100 rounded-md">
                    <h2 className="text-xl font-bold">Booking Summary</h2>
                    <div className="flex justify-between mt-3 text-lg font-semibold">
                        <p>Total: {totalBookings}</p>
                        <p className="text-green-600">Completed: {completedBookings}</p>
                        <p className="text-red-600">Cancelled: {cancelledBookings}</p>
                        <p className="text-blue-500">Pending: {pendingBookings}</p>
                    </div>
                </div>
            )}

            {/* Step 4: Action Buttons with Pagination */}
            {currentStep === 4 && (
                <div className="mt-5">
                    <h2 className="text-xl font-bold">Manage Orders</h2>
                    {displayedActions.map((order) => (
                        <div key={order._id} className="mt-3 p-4 border rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-lg font-bold">{order.patientName}</h3>
                            <p><strong>Category:</strong> {order.category}</p>
                            <p><strong>Price:</strong> ₹{order.orderPrice}</p>
                            <p><strong>Status:</strong> {order.bookingStatus}</p>

                            <div className="mt-3 flex space-x-2">
                                {order.bookingStatus === "pending" && (
                                    <>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Confirm</button>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-md">Cancel</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center mt-4 space-x-3">
                        <button disabled={currentActionPage === 1} onClick={() => setCurrentActionPage(prev => prev - 1)} className="px-5 py-2 bg-gray-300 rounded-md">Prev</button>
                        <span>Page {currentActionPage} of {totalPages}</span>
                        <button disabled={currentActionPage === totalPages} onClick={() => setCurrentActionPage(prev => prev + 1)} className="px-5 py-2 bg-gray-300 rounded-md">Next</button>
                    </div>
                </div>
            )}


            
        </div>
    );
};

export default CollectionSalesDetail;
