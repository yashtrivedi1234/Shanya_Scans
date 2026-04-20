import React from "react";
import BreadCrumbs from "../../component/BreadCums";
import { FaQuoteLeft } from "react-icons/fa";
import admin from '../../assets/adminpng.jpg';

import parul from '../../assets/management/Parul.png';
import gautam from '../../assets/management/gautam.png';
import vinay from '../../assets/management/vinay.jpg';

const managementTeam = [
    {
        name: "Dr. Parul Atreya",
        title: "Director Operations",
        photo: parul,
        quote: "Seamless Patient Care",
        message:
            "As the Director of Operations at Shanya Scan and Theranostics, I ensure smooth healthcare management, efficiency, and quality. My focus is on strategic planning, workflow optimization, and compliance. By fostering collaboration across departments, we enhance service delivery and patient experience. Technology-driven innovation plays a crucial role in maintaining high operational standards. Our goal is to create a streamlined system that prioritizes patient care while improving internal processes. From resource allocation to infrastructure development, we continuously strive for excellence. At Shanya, we believe in a patient-first approach, ensuring safety, comfort, and effective treatment. By integrating innovation with strong leadership, we create a seamless healthcare environment. Our commitment is to provide top-tier medical services and foster a culture of teamwork and growth. Every day, we work to refine processes, enhance patient care, and uphold our mission of delivering world-class healthcare solutions."
    },
    {
        name: "Dr. Nilesh Shankar",
        title: "Director Medical Service & RSO",
        photo: admin,
        quote: "Care With Excellence",
        message:
            "As the Director of Medical Services, my primary focus is ensuring high-quality, patient-centered care at Shanya Scans and Theranostics. Our mission is to enhance medical services, improve accessibility, and maintain professional integrity. We strive for continuous innovation to achieve better patient outcomes. By integrating advanced medical technologies and best practices, we provide accurate and efficient diagnostics. Patient safety, comfort, and well-being are our top priorities. Collaboration among our healthcare professionals ensures that our treatments meet the highest standards. Through ongoing training and research, we stay at the forefront of medical advancements. Our commitment extends beyond treatment—we aim to create a supportive, compassionate healthcare environment where patients feel valued. At Shanya, we uphold excellence in every aspect of medical care, from diagnostics to patient support, ensuring that every individual receives world-class service tailored to their needs."
    },
    {
        name: "Gautam Mishra",
        title: "HR Manager",
        photo: gautam,
        quote: "Talent Drives Success",
        message:
            "At Shanya Scan and Theranostics, we believe that a strong workforce is the foundation of quality healthcare. As the HR Manager, my role is to recruit, develop, and retain skilled professionals who align with our mission. We emphasize talent acquisition, employee engagement, and compliance with industry standards. Our HR strategies ensure a positive work environment that fosters teamwork and professional growth. Training and continuous learning are key priorities to equip our staff with the latest medical advancements. By promoting a culture of inclusivity and motivation, we enhance overall efficiency and patient care. Our workforce is our greatest asset, and we invest in their well-being to create a dynamic healthcare environment. At Shanya, we believe that happy, well-supported professionals deliver the best patient care, ensuring trust, efficiency, and excellence in all our services."
    },
    {
        name: "Vinay Patel",
        title: "Marketing Head",
        photo: vinay,
        quote: "Trust Through Branding",
        message:
            "As the Marketing Head at Shanya Scan and Theranostics, my goal is to ensure our healthcare services are accessible and trusted. We focus on strategic branding, patient education, and community engagement to create awareness about our advanced medical solutions. Marketing in healthcare is about more than promotions—it’s about building trust and ensuring patients understand the value of our services. By leveraging digital platforms, targeted campaigns, and outreach programs, we connect with individuals who need our care. Transparency and patient-centric communication are at the core of our strategy. Our approach combines technology, innovation, and compassionate messaging to establish Shanya as a leader in diagnostics and therapeutic services. Through effective marketing, we bridge the gap between patients and high-quality healthcare solutions, ensuring that people receive the right medical support at the right time."
    },
];



const OurManagement = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Management" },
    ];

    return (
        <div className="container mx-auto px-6">
            <BreadCrumbs headText={"Our Management"} items={breadcrumbItems} />

            <div className="flex flex-col items-center space-y-12 py-10">
                {managementTeam.map((member, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start lg:items-start lg:gap-12 md:gap-10 gap-8 w-full max-w-7xl">

                        {/* Left: Image Section */}
                        <div className="relative w-full max-w-[20rem] text-center lg:text-left flex-grow-0">
                            <div className="border-4 border-main rounded-lg overflow-hidden shadow-lg">
                                <img src={member.photo} alt={member.name} className="w-full h-auto object-cover" />
                            </div>

                            <div className="mt-4">
                                <div className="mt-4 flex flex-col items-center justify-center">
                                    <p className="text-xl font-bold text-center text-yellow tracking-wide uppercase">
                                        {member.name}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1 px-3 py-1 rounded-md text-center bg-gray-100 border border-main inline-block shadow-md italic">
                                        <span className="text-main font-medium">{member.title}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Director's Message */}
                        <div className="w-full lg:max-w-4xl border-l-4 border-main lg:pl-6 pl-2 text-justify flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                                <FaQuoteLeft className="text-main text-xl" />
                                <h2 className="text-3xl font-bold text-main mb-1 flex items-center gap-2">
                                    {member.quote}
                                </h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-600">{member.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurManagement;
