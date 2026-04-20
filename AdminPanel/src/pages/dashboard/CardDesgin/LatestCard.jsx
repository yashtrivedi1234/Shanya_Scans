import { useEffect, useState } from "react";
import { useGetAllLatestQuery } from "@/Rtk/orderApi";
import { FaClipboardList, FaChevronDown } from "react-icons/fa";
import io from "socket.io-client";

const LatestOrders = () => {
  const { data, isLoading, refetch } = useGetAllLatestQuery();
  const [visibleCount, setVisibleCount] = useState(10);

  const orders = data?.slice(0, visibleCount) || [];

  useEffect(() => {
    const socket = io("https://db.shanyascans.com");

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });

    socket.on("orderPlaced", () => {
      refetch();
    });

    return () => {
      socket.off("orderPlaced");
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 text-sm">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-50 rounded-md">
          <FaClipboardList className="text-blue-600 text-sm" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Latest Orders Today</h2>
        {data?.length > 0 && (
          <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {data.length} total
          </span>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-3 bg-gray-50 rounded-full w-fit mx-auto mb-3">
              <FaClipboardList className="text-gray-400 text-xl" />
            </div>
            <p className="text-gray-500 text-sm">No orders found today</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
                <FaClipboardList className="text-green-600 text-sm" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-gray-800 text-sm font-medium truncate">
                  {order.orderName}
                </p>
                 <p className="text-gray-500 text-xs">
                  {new Date(order.bookingDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    {order.orderType}
                  </span>
                  <span className="text-gray-600 text-xs font-medium">
                    ₹{order.orderPrice}
                  </span>
                </div>
               
              </div>

              {/* Status indicator */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {data?.length > visibleCount && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => setVisibleCount(visibleCount + 10)}
            className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 hover:bg-blue-50 rounded-md transition-all duration-200"
          >
            <span>Load More Orders</span>
            <FaChevronDown className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestOrders;