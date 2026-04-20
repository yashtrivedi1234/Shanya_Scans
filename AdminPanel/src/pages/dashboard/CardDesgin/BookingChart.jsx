// import { useGetMonthlyOrdersQuery, useGetTotalOrdersQuery, useGetWeeklyOrdersQuery } from "@/Rtk/orderApi";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// const BookingChart = () => {
//   const {data:weeklyData} = useGetWeeklyOrdersQuery();
//   const {data:monthlyData} = useGetMonthlyOrdersQuery();
//   const {data} = useGetTotalOrdersQuery();
//   console.log(data);

//   // const monthlyData = [
//   //   { name: "Jan", pathology: 200, scan: 150 },
//   //   { name: "Feb", pathology: 300, scan: 220 },
//   //   { name: "Mar", pathology: 250, scan: 180 },
//   //   { name: "Apr", pathology: 400, scan: 300 },
//   //   { name: "May", pathology: 350, scan: 250 },
//   //   { name: "Jun", pathology: 500, scan: 400 },
//   //   { name: "Jul", pathology: 450, scan: 350 },
//   //   { name: "Aug", pathology: 600, scan: 500 },
//   //   { name: "Sep", pathology: 480, scan: 390 },
//   //   { name: "Oct", pathology: 420, scan: 350 },
//   //   { name: "Nov", pathology: 550, scan: 470 },
//   //   { name: "Dec", pathology: 600, scan: 520 },
//   // ];

//   // const weeklyData = [
//   //   { name: "Mon", pathology: 40, scan: 30 },
//   //   { name: "Tue", pathology: 20, scan: 15 },
//   //   { name: "Wed", pathology: 30, scan: 25 },
//   //   { name: "Thu", pathology: 50, scan: 40 },
//   //   { name: "Fri", pathology: 60, scan: 50 },
//   //   { name: "Sat", pathology: 45, scan: 35 },
//   //   { name: "Sun", pathology: 50, scan: 40 },
//   // ];

//   // Dummy values, replace with real data
//   const totalBookings = 3500;
//   const totalConfirmed = 2800;
//   const totalOngoing = 400;
//   const totalCancelled = 200;
//   const totalCompleted = 2700;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
//       {/* Weekly Booking Chart */}
//       <div className="bg-white p-6 shadow-lg rounded-2xl">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Bookings</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={weeklyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="pathology" fill="#1F509A" name="Pathology" />
//             <Bar dataKey="scan" fill="#f9e666" name="Scan" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Monthly Booking Chart */}
//       <div className="bg-white p-6 shadow-lg rounded-2xl">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Bookings</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="pathology" stroke="#1F509A" name="Pathology" strokeWidth={3} />
//             <Line type="monotone" dataKey="scan" stroke="#f9e666" name="Scan" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Total Bookings + Status */}
//       <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col items-center justify-center">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Summary</h2>
//         <p className="text-3xl font-bold text-blue-600 mb-2">{data?.totalBookings}+</p>
//         <p className="text-gray-500 text-lg mb-4">(Total Bookings)</p>

//         <div className="w-full grid grid-cols-2 gap-4">
//           <div className="bg-green-100 p-4 rounded-lg text-center">
//             <p className="text-green-600 text-lg font-bold">{data?.totalConfirmed}+</p>
//             <p className="text-gray-600 text-sm">Confirmed</p>
//           </div>
//           <div className="bg-yellow-100 p-4 rounded-lg text-center">
//             <p className="text-yellow-600 text-lg font-bold">{data?.totalOngoing}+</p>
//             <p className="text-gray-600 text-sm">Ongoing</p>
//           </div>
//           <div className="bg-red-100 p-4 rounded-lg text-center">
//             <p className="text-red-600 text-lg font-bold">{data?.totalCancelled}+</p>
//             <p className="text-gray-600 text-sm">Cancelled</p>
//           </div>
//           <div className="bg-blue-100 p-4 rounded-lg text-center">
//             <p className="text-blue-600 text-lg font-bold">{data?.totalCompleted}+</p>
//             <p className="text-gray-600 text-sm">Completed</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingChart;


import { useGetMonthlyOrdersQuery, useGetTotalOrdersQuery, useGetWeeklyOrdersQuery } from "@/Rtk/orderApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const BookingChart = () => {
  const {data:weeklyData} = useGetWeeklyOrdersQuery();
  const {data:monthlyData} = useGetMonthlyOrdersQuery();
  const {data} = useGetTotalOrdersQuery();
  console.log(data);

  return (
    <div className="space-y-4">
      {/* Header */}
     

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className="bg-white p-4 border-b-4 border-b-blue-600 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Bookings</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{data?.totalBookings || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border-b-4 border-b-green-500 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Confirmed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{data?.totalConfirmed || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border-b-4 border-b-gray-900 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Ongoing</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{data?.totalOngoing || 0}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border-b-4 border-b-purple-500  rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{data?.totalCompleted || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Weekly Booking Chart */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="flex items-center p-4 justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Weekly Bookings</h2>
              <p className="text-gray-600 mt-1 text-sm">Last 7 days performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Pathology</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Scan</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="pathology" fill="#2563eb" name="Pathology" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scan" fill="#eab308" name="Scan" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Booking Chart */}
        <div className="bg-white  shadow-lg rounded-xl border border-gray-100">
          <div className="flex p-4 items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Monthly Trend</h2>
              <p className="text-gray-600 mt-1 text-sm">12 months overview</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Pathology</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Scan</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData} margin={{ top: 20, right: 10, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="pathology" 
                stroke="#2563eb" 
                name="Pathology" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563eb' }}
              />
              <Line 
                type="monotone" 
                dataKey="scan" 
                stroke="#eab308" 
                name="Scan" 
                strokeWidth={3}
                dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#eab308' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats Row */}
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">
                {data?.totalConfirmed && data?.totalBookings 
                  ? Math.round((data.totalConfirmed / data.totalBookings) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cancellation Rate</span>
              <span className="font-semibold text-red-600">
                {data?.totalCancelled && data?.totalBookings 
                  ? Math.round((data.totalCancelled / data.totalBookings) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-semibold text-blue-600">
                {data?.totalCompleted && data?.totalBookings 
                  ? Math.round((data.totalCompleted / data.totalBookings) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{
                    width: data?.totalConfirmed && data?.totalBookings 
                      ? `${(data.totalConfirmed / data.totalBookings) * 100}%` 
                      : '0%'
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">Confirmed ({data?.totalCancelled || 0})</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{
                    width: data?.totalCancelled && data?.totalBookings 
                      ? `${(data.totalCancelled / data.totalBookings) * 100}%` 
                      : '0%'
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">Cancelled ({data?.totalCancelled || 0})</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BookingChart;