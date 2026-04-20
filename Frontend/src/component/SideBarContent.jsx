import React from "react";
import { FaWhatsapp, FaPhone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { MdContactPage, MdInfo } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFlask, FaXRay, FaBox } from "react-icons/fa6"; // Import icons

import { FaSquareXTwitter } from "react-icons/fa6";

const SidebarContent = () => {
    const socialLinks = [
        {
            icon: <FaFacebookF />,
            url: "https://www.facebook.com/people/Shanya-Scans-Theranostics/pfbid02DSakVhR3FhDHeUDVnhACMu1vpHETUqPm9wKVqcx6jDxCMyqJ4oorGdJxbPKv74aYl/",
            color: "bg-blue-600", // Facebook blue
        },
        {
            icon: <FaInstagram />,
            url: "https://www.instagram.com/shanyascans",
            color: "bg-gradient-to-r from-pink-500 to-yellow-500", // Instagram gradient
        },
        {
            icon: <FaYoutube />,
            url: "https://www.youtube.com/@shanyascans",
            color: "bg-red-600", // YouTube red
        },
        {
            icon: <FaWhatsapp />,
            url: `https://wa.me/917233000133?text=${encodeURIComponent("Hello, I need help!")}`, // Replace with your WhatsApp number
            color: "bg-green-500", // WhatsApp green
        },
    ];

    return (
        <div className="z-[999]">
            {/* Right Side Social Media Icons */}
            {/* Left Side Social Media Icons (Moved to Top) */}
            <div className="fixed right-0 top-[30%] flex flex-col space-y-2 z-[999]">
                <a href="https://www.facebook.com/people/Shanya-Scans-Theranostics/pfbid02DSakVhR3FhDHeUDVnhACMu1vpHETUqPm9wKVqcx6jDxCMyqJ4oorGdJxbPKv74aYl/"
                    className="bg-blue-600 text-white p-2 rounded-full" target="_blank">
                    <FaFacebook size={24} />
                </a>
                {/* <a href="https://twitter.com/" target="_blank" className="bg-blue-400 rounded-full text-white p-2 rounded-l-lg">
                    <FaSquareXTwitter size={24} />
                </a> */}
                <a href="https://www.linkedin.com/company/shanya-scans-theranostics/" target="_blank" className="bg-blue-700 rounded-full text-white p-2">
                    <FaLinkedin size={24} />
                </a>
                <a href="https://www.instagram.com/shanyascans" target="_blank" className="bg-gradient-to-r rounded-full from-pink-500 to-yellow-500 text-white p-2 ">
                    <FaInstagram size={24} />
                </a>
                <a href="https://www.youtube.com/@shanyascans" target="_blank" className="bg-red-600 rounded-full text-white p-2 ">
                    <FaYoutube size={24} />
                </a>
            </div>

            {/* Left Side Request Info Button */}
            {/* <div className="fixed right-[-2rem] top-[60%] flex flex-col space-y-2 z-60 rotate-90">
                <Link to={"/contact"}>   <button className="px-6 rounded-md  py-2  bg-orange-600 text-white">Request Info</button></Link>
         
            </div> */}
            {/* Bottom Right WhatsApp & Call Icons */}
            <div className="fixed bottom-[5rem] right-4 flex flex-col space-y-2 z-[999]">
                <a href="tel:18001234187" className="bg-green-500 text-white p-3 rounded-full shadow-lg">
                    <FaWhatsapp size={24} />
                </a>
                <a href="tel:917233000133" className="bg-main text-white p-3 rounded-full shadow-lg">
                    <FaPhone size={24} />
                </a>
            </div>

            {/* Bottom Fixed Labs, Scans & Package Section */}
            {/* Bottom Fixed Labs, Scans & Package Section */}
            <div className="fixed bottom-0 left-0 w-full bg-gray-100 border shadow-lg py-3 z-[999] block md:hidden">
                <div className="flex justify-around text-center text-gray-700 font-semibold">
                    <Link to="/pathology" className="flex flex-col items-center hover:text-blue-500">
                        <FaFlask size={20} className="text-main" />
                        <span>Labs</span>
                    </Link>
                    <Link to="/scan" className="flex flex-col items-center hover:text-blue-500">
                        <FaXRay size={20} className="text-main" />
                        <span>Scans</span>
                    </Link>
                    <Link to="/package" className="flex flex-col items-center hover:text-blue-500">
                        <FaBox size={20} className="text-main" />
                        <span>Packages</span>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default SidebarContent;
