import { useGetOrderDetailQuery, useOrderReportMutation, useOrderStatusMutation } from '@/Rtk/orderApi';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../Loading/SpinLoading';

const OrderDetail = () => {
    const location = useLocation();
    const { state } = location;
    const { data, isLoading, error } = useGetOrderDetailQuery(state?._id);
    const [currentStep, setCurrentStep] = useState(1);
    const [report, setReport] = useState(null);
    const [orderReport] = useOrderReportMutation()
    const [modelOpen, setModelOpen] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [changeStatus]=useOrderStatusMutation()


    const handleReportChange = (e) => {
        setReport(e.target.files[0]);
    };

    const handleReportAdd = async () => {
        const formData = new FormData()
        setSpinLoading(true)
        formData.append("report", report)
        const response = await orderReport({ formData, id: orderId })
        setSpinLoading(false)

    }

    const handleModelOpen = (report) => {
        setModelOpen(true)
        setOrderId(report._id)
    }

    const openImageInNewTab = (imageUrl) => {
        if (imageUrl) {
            window.open(imageUrl, "_blank");
        } else {
            alert("No image available");
        }
    };

    const handleChangeStatus=async(id,status)=>{
          const data={
            newStatus:status
          }

          const response=await changeStatus({data,id})
          console.log(response);
          
    }



    if (isLoading) return <div className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</div>;
    if (!data) return <div className="text-center mt-10 text-lg font-semibold text-red-600">No Data Found!</div>;

    const order = data;
    const ordersList = order.orderDetails;

   
    console.log(ordersList);
    


    return (
        <div className="max-w-5xl min-h-screen mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
            {/* Step Navigation */}
            <div className="flex space-x-4 mb-6">
                {["User Details", "Order Details", "Actions"].map((step, index) => (
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

            {/* Step 1: User Details */}
            {currentStep === 1 && (
                <div className="p-6 border border-gray-300 rounded-md shadow-sm">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">👤 User Details</h2>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p><strong>Name:</strong> {order.userDetails.name}</p>
                        <p><strong>Email:</strong> {order.userDetails.email}</p>
                        <p><strong>Phone:</strong> {order.userDetails.phoneNumber}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                    </div>
                </div>
            )}

            {/* Step 2: Order Details */}
            {currentStep === 2 && (
                <div className="p-6 border border-gray-300 rounded-md shadow-sm">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">📑 Order Details</h2>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr className="text-left">
                                    <th className="p-3 border">Patient Name</th>
                                    <th className="p-3 border">Age</th>
                                    <th className="p-3 border">Gender</th>
                                    <th className="p-3 border">Test Name</th>
                                    <th className="p-3 border">Type</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border">Order Price</th>
                                    <th className="p-3 border">Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((orderItem, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-3 border">{orderItem.patientName}</td>
                                        <td className="p-3 border">{orderItem.patientAge}</td>
                                        <td className="p-3 border capitalize">{orderItem.patientGender}</td>
                                        <td className="p-3 border">{orderItem?.orderName}</td>
                                        <td className="p-3 border">{orderItem?.orderType}</td>
                                        <td className={`py-3 px-4 border font-semibold `}>
                                            {orderItem?.bookingStatus}
                                        </td>
                                        <td className={`py-3 px-4 border font-semibold `}>
                                            {orderItem?.orderPrice}
                                        </td>
                                        <td className="py-3 px-4 border font-semibold">
                                            {orderItem?.reportStatus?.trim().toLowerCase() === "not ready" ? <button onClick={() => handleModelOpen(orderItem)}>Add Report</button> : <button onClick={() => openImageInNewTab(orderItem?.report?.secure_url)}>View Report</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Step 3: Actions */}
            {currentStep === 3 && (
                <div className="p-6 border border-gray-300 rounded-md shadow-sm">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">⚡ Actions</h2>

                    <div className="grid gap-4">
                        {ordersList.map((orderItem, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                                <span className="font-semibold">{orderItem.patientName} - {orderItem.orderName}</span>
                                <div className="space-x-2">
                                    {/* If status is "completed", show nothing */}
                                    {orderItem?.bookingStatus !== "completed" && (
                                        <>
                                            {/* Show Cancel button only if bookingStatus is NOT "ongoing" */}
                                            {orderItem?.bookingStatus != "ongoing" && orderItem?.bookingStatus != "completed" &&  orderItem?.bookingStatus != "cancelled"  &&  (
                                                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={()=>handleChangeStatus(orderItem?._id,"cancelled")}  >
                                                    Cancel
                                                </button>
                                            )}

                                            {/* Show Ongoing button only if bookingStatus is "pending" or "confirmed" */}
                                            {(orderItem?.bookingStatus === "pending" || orderItem?.bookingStatus === "confirmed") && (
                                                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" onClick={()=>handleChangeStatus(orderItem?._id,"ongoing")}>
                                                    Ongoing
                                                </button>
                                            )}

                                            {/* Show Confirm button only if bookingStatus is "pending" */}
                                            {orderItem?.bookingStatus === "pending" && (
                                                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={()=>handleChangeStatus(orderItem?._id,"confirmed")}>
                                                    Confirm
                                                </button>
                                            )}

                                            {/* Show Complete button only if bookingStatus is "ongoing" or "confirmed" */}
                                            {(orderItem?.bookingStatus === "ongoing"  || orderItem?.bookingStatus === "confirmed" &&   orderItem?.bookingStatus != "completed") && (
                                                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={()=>handleChangeStatus(orderItem?._id,"completed")}>
                                                    Complete
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Upload Report */}
                    {/* <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">📂 Upload Report</h3>
                        <input type="file" className="w-full p-2 border rounded-md" onChange={handleReportChange} />
                        <button className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" onClick={handleReportAdd}>Upload Report</button>
                    </div> */}
                </div>
            )
            }


            {
                modelOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">{true ? "Edit Banner" : "Add Banner"}</h2>

                            {/* Edit Form */}

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                                <input type="file" onChange={handleReportChange} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Submit & Cancel Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => setModelOpen(false)}
                                >
                                    Cancel
                                </button>
                                {spinLoading ? <Spinner /> : <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => handleReportAdd(orderId)}>
                                    {true ? "Edit Save" :
                                        "Save Changes"}
                                </button>}

                            </div>

                        </div>
                    </div>
                )
            }




        </div >
    );
};

export default OrderDetail;
