import { useGetLatestHomeCollectionOrderQuery } from "@/Rtk/orderApi";
import React from "react";

const orders = [
  {
    patient: "Amit Sharma",
    test: "Blood Test",
    rate: "$50",
    status: "Pending",
  },
  {
    patient: "Rohit Verma",
    test: "Covid Test",
    rate: "$30",
    status: "Completed",
  },
  {
    patient: "Sneha Gupta",
    test: "Thyroid Test",
    rate: "$40",
    status: "Cancelled",
  },
  {
    patient: "Priya Singh",
    test: "Diabetes Test",
    rate: "$60",
    status: "Pending",
  },
];

const statusColors = {
  Pending: "text-yellow-500 bg-yellow-100",
  confirmed: "text-green-500 bg-green-100",
  Cancelled: "text-red-500 bg-red-100",
};

const HomeCollectionOrders = () => {
   
  const {data,isLoading,error}=useGetLatestHomeCollectionOrderQuery()


  

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-800">Recent Home Collection Orders </h2>
      <p className="text-sm text-gray-500 mb-4">Recent orders</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-4">Patient Name</th>
              <th className="py-2 px-4">Test Name</th>
              <th className="py-2 px-4">Rate</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length>0 ?  
            data.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{order.patientName}</td>
                <td className="py-2 px-4">{order.orderName}</td>
                <td className="py-2 px-4">{order.orderPrice}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.bookingStatus}
                  </span>
                </td>
              </tr>
            ))  : <p className="text-center w-full mt-2">No Order Found</p>

          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeCollectionOrders;