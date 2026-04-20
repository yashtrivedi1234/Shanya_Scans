import React, { useEffect, useState } from "react";
import {
  Card,
} from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useGetAllOrderQuery, useGetAllTotalOrderQuery } from "@/Rtk/orderApi";
import io from "socket.io-client";
import LatestOrders from "./CardDesgin/LatestCard";
import BookingCharts from "./CardDesgin/BookingChart";
import HomeCollectionOrders from "./CardDesgin/HomeCollectionOrder";
import { BarChart2, FileText, FlaskRound,House } from "lucide-react";
import Footer from "./Footer";

// const socket = io("https://db.shanyascans.com"); 

const DataCard = ({ title, count, ind }) => {
  // color classes based on index
  const colors = [
    {  border: "border-b-blue-600", text: "text-blue-600", bg: "bg-blue-100", Icon: BarChart2 },
    {   border: "border-b-green-600", text: "text-green-600", bg: "bg-green-100", Icon: House },
    {   border: "border-b-gray-900", text: "text-yellow-600", bg: "bg-gray-200", Icon: FileText },
    {    border: "border-b-purple-600", text: "text-purple-600", bg: "bg-purple-100", Icon: FlaskRound },
  ];

  const { border,   text, bg, Icon } = colors[ind] || colors[0];

  return (
    <div className={` border-b-4 ${border} bg-white  p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${text}`}>
            {count || 0}
          </p>
        </div>
        <div className={`p-3 rounded-full ${bg}`}>
          <Icon className={`w-6 h-6 ${text}`} />
        </div>
      </div>
    </div>
  );
};




export function Home() {


  const { data: initialData, isLoading,refetch } = useGetAllTotalOrderQuery();
  const [orders, setOrders] = useState(initialData || []);
 const socket = io("https://db.shanyascans.com");
 
 const handleTotalOrderQuery = async () => {

  await refetch();
};

  useEffect(() => {
    // Load initial orders
    setOrders(initialData);

    // ✅ Debugging socket connection
    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });

    socket.on("orderPlaced", () => { 
      handleTotalOrderQuery()
    });


    return () => {
      socket.off("orderPlaced");
    };
  }, [initialData]);







  return (

    <div className=" space-y-4">
      <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {orders &&
          Array.isArray(orders) &&
          orders.map((data, index) => (
            <DataCard ind={index} title={data?._id} count={data?.count}  />
          ))}
      </div>


      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3 border border-red-500">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}

      
      <BookingCharts/>



      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ">
        <Card className="overflow-hidden xl:col-span-2 border border-gray-200 shadow-sm">
        
         <HomeCollectionOrders/>
        </Card>
           <LatestOrders/>
      </div>
    </div>
  );
}

export default Home;
