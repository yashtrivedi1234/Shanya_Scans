import { useEffect, useState } from "react";
import { FaUser, FaRegSave } from "react-icons/fa";
import { BsCalendarCheck, BsFileText } from "react-icons/bs";
import { isVerifyLogin, order, orderDetails } from "../../Redux/slice/razorSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLogin, setLogin] = useState(false)
  const [userData, setUserData] = useState({})
  const [allOrder, setAllOrder] = useState([])
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 2
  const totalPages = Math.ceil(allOrder?.length / itemPerPage);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItem = allOrder?.slice(indexOfFirstItem, indexOfLastItem)




  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(orderDetails());
        console.log(response);

        if (response?.payload?.success) {
          setLogin(true)
          setUserData(response?.payload?.data?.user)
          // setOrderDetails(response?.payload?.data?.orderDetails)
          setAllOrder(response?.payload?.data?.orders)
        }
      } catch (error) {
        console.error('Error verifying login:', error);
      }
    };
    fetchData()
  }, []);



  const openImageInNewTab = (imageUrl) => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    } else {
      alert("No image available");
    }
  };




  return (
    <section className="bg-gray-100 flex items-center justify-center py-20">
      <div className="flex md:flex-row flex-col max-w-7xl w-full mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">

        {/* Sidebar */}
        <aside className="md:w-72 bg-white bg-opacity-75 backdrop-blur-lg p-6 border-r border-gray-200">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700 shadow-lg">
              {userData?.name}
            </div>
            {/* <h2 className="mt-4 text-xl font-semibold text-gray-800">{userData?.name}</h2> */}
            <p className="text-gray-500 text-sm">{userData?.email}</p>
            <p className="text-gray-500 text-sm">+91 {userData?.phone}</p>
            <button
              className="mt-4 bg-prime hover:bg-orange-600 transition duration-300 text-white px-5 py-2 rounded-full shadow-md"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Info"}
            </button>
          </div>
          <nav className="mt-8">
            <ul className="space-y-3">
              <li>
                <button
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition ${activeTab === "profile" ? "bg-prime text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <FaUser className="w-5 h-5" />
                  My Profile
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition ${activeTab === "bookings" ? "bg-prime text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setActiveTab("bookings")}
                >
                  <BsCalendarCheck className="w-5 h-5" />
                  My Bookings
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition ${activeTab === "reports" ? "bg-prime text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setActiveTab("reports")}
                >
                  <BsFileText className="w-5 h-5" />
                  My Reports
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:px-10 bg-gray-300">
          {activeTab === "profile" && (
            <section className="bg-white shadow-lg p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-800">Hi, {userData?.name}</h2>
              <p className="text-gray-500">{userData?.email}</p>

              <div className="mt-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData?.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded-md ${isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"}`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData?.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded-md ${isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"}`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={userData?.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded-md ${isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"}`}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 font-medium">Gender</label>
                  <select
                    name="gender"
                    value={userData?.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded-md ${isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"}`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-gray-700 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={userData?.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-2 border rounded-md ${isEditing ? "border-gray-300" : "bg-gray-100 cursor-not-allowed"}`}
                  />
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <button
                  className="mt-5 bg-green-500 hover:bg-green-600 transition duration-300 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2"
                  onClick={() => setIsEditing(false)}
                >
                  <FaRegSave />
                  Save Changes
                </button>
              )}
            </section>
          )}

          {activeTab === "bookings" && (
            <section className="bg-white shadow-lg p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-800">My Bookings</h2>

              {currentItem?.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {currentItem.map((order, index) => (
                    <div key={order._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-800">{order.name}</h3>
                      <p className="text-sm text-gray-600"><strong>Order Name:</strong> {order.orderName}</p>
                      <p className="text-sm text-gray-600"><strong>Patient Name:</strong> {order.patientName}</p>
                      <p className="text-sm text-gray-600"><strong>Patient Gender:</strong> {order.patientGender}</p>
                      <p className="text-sm text-gray-600"><strong>Alt Phone:</strong> {order.altPhone}</p>
                      <p className="text-sm text-gray-600"><strong>Price:</strong> ₹{order.orderPrice}</p>
                      <p className="text-sm text-gray-600"><strong>Booking Date:</strong> {order.bod}</p>
                      <p className="text-sm text-gray-600"><strong>Booking Status:</strong> {order.bookingStatus}</p>
                      <p className="text-sm text-gray-600"><strong>Report Status:</strong> {order.reportStatus}</p>
                      <p className="text-sm text-gray-600"><strong>View Report</strong>           {order?.reportStatus?.trim().toLowerCase() != "not ready" ? <button onClick={() => openImageInNewTab(order?.report?.secure_url)}>View Report</button> : <button>No Report Yet</button>}</p>
                      <p className="text-sm text-gray-500 text-right">Booked on: {new Date(order.createdAt).toLocaleString()}</p>


                    </div>


                  ))}

                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                      Previous
                    </button>

                    <span className="text-lg font-semibold">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-gray-500">No Bookings Found..!!</p>
              )}
            </section>
          )}


        </main>
      </div>
    </section>
  );
};

export default Dashboard;
