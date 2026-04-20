import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addContact } from "../../Redux/slice/package.slice";
import { data } from "autoprefixer";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [spinLoading,setSpinLoading]=useState(false)

  const dispatch=useDispatch()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 
        setSpinLoading(true)
        const response=await dispatch(addContact({data:formData}))
        setSpinLoading(false)
        if(response?.payload?.data){
            alert("Message sent successfully.")
            setFormData({
                firstName: "",
                lastName: "",
                subject: "",
                email: "",
                message: "",})
        }

        
    } catch (error) {
      alert("Error sending message. Please try again.");
    }
  };


  return (
    <div className="bg-white flex items-center justify-center md:py-10 lg:py-6">
      <div className="flex flex-col md:flex-row w-full lg:max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section: Address */}
        <div className="bg-gray-100 lg:p-8 p-4 md:w-[40%] lg:py-10">
          <h3 className="font-bold lg:text-3xl sm:text-2xl text-xl lg:mb-6 mb-4 text-black">
          Still, have any problems or need assistance?
          </h3>

          {/* Head Office Address */}
          <div className="lg:mb-6 mb-4 flex items-start gap-4">
            <a
              href="https://www.google.com/maps?ll=26.871852,80.99835&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=4661358628032490054"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="text-yellow text-6xl cursor-pointer px-4 py-4 rounded-full bg-white" />
            </a>
            <div>
              <h2 className="text-xl font-bold text-main">Head Office Address:</h2>
              <a
                href="https://www.google.com/maps?ll=26.871852,80.99835&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=4661358628032490054"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm mt-1 text-black hover:underline"
              >
                Plot no TC-49-V-VIII, Opposite Lohia Hospital Adhar Building, Vibhuti Khand,
                Gomti Nagar, Lucknow, Uttar Pradesh 226010
              </a>
            </div>
          </div>

          {/* Call for Help */}
          <div className="lg:mb-6 mb-4 flex items-start gap-4">
            <a href="tel:18001234187">
              <FaPhoneAlt className="text-yellow text-6xl cursor-pointer px-4 py-4 rounded-full bg-white" />
            </a>
            <div>
              <h2 className="text-xl font-bold text-main">Call for help:</h2>
              <a
                href="tel:18001234187"
                className="text-sm mt-1 text-black hover:underline"
              >
                     Toll Free No: 18001234187
              </a>
              <br />
              <a
                href="tel:7233000133"
                className="text-sm mt-1 text-black hover:underline"
              >
              Mobile Number: 7233000133
              </a>
            </div>
          </div>

          {/* Mail for Information */}
          <div className="flex items-start gap-4">
            <a href="mailto:shanyaglobal.lko@gmail.com">
              <FaEnvelope className="text-yellow text-6xl cursor-pointer px-4 py-4 rounded-full bg-white" />
            </a>
            <div>
              <h2 className="text-xl font-bold  text-main">Mail for information:</h2>
              <a
                href="mailto:shanyaglobal.lko@gmail.com"
                className="text-sm mt-1 text-black hover:underline"
              >
                shanyaglobal.lko@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="lg:p-8 p-4 md:w-[60%] bg-white border">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Type your first name"
                className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Type your last name"
                className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
              />
            </div>

            {/* Select Subject */}
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium">
                Select a subject to get help*
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
              >
                <option>Select a subject</option>
                <option>General Inquiry</option>
                <option>Book Appointment</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Your Mail Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type mail address"
                className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type message..."
                rows="4"
                className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-start">
              <button
                type="submit"
                className="bg-yellow text-gray-800 w-full py-2 px-6 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
              >{spinLoading? <div className="w-full h-full border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div> : "Submit Now"}
          
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
