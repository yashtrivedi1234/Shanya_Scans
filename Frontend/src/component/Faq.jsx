import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const faqList = [
	{
		isActive: true,
		question: "What types of diagnostic services do Shanya Scans & Theranostics offer?",
		answer:
			"Shanya Scans & Theranostics provide a wide range of services, including Pathology Tests, Imaging Services like Digital PET-CT, Digital Gamma Camera, Digital 3.0 Tesla MRI, 128 Slice CT Scan, Ultrasound(3D/4D/Dopplers/TIFFA), Cardio, Neuro, Digital Mammography, DEXA Scan, ECG and Digital X-rays, along with comprehensive health check-ups, ensuring accurate and timely results for all your health needs",
	},
	{
		isActive: false,
		question: "How can I book an appointment??",
		answer:
			"You can book an appointment online through our website or call our customer support team for assistance.",
	},
	{
		isActive: false,
		question: "What should I bring for my appointment?",
		answer:
			"Please bring a valid ID, any previous medical records, and a doctor’s referral if applicable",
	},
	{
		isActive: false,
		question: "Where is Shanya Scans & Theranostics located?",
		answer:
			"Shanya Scans & Theranostics is located at Plot no TC-49, V-VIII, opposite Lohia Hospital Adhar building, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
	},
	{
		isActive: false,
		question: "Do you offer any preventive health check-up packages?",
		answer:
			"Yes, we offer comprehensive health check-up packages tailored to different age groups and health needs.",
	},
	{
		isActive: false,
		question: "What should I do if I have questions about my results?",
		answer:
			"If you have any questions or concerns about your results, please contact our medical team for clarification and support",
	},
	{
		isActive: false,
		question: "What are your operating hours?",
		answer:
			"We operate 24/7 to accommodate all patients’ needs, including emergencies",
	},
	{
		isActive: false,
		question: "How do you ensure the accuracy of your tests?",
		answer:
			"We follow strict protocols, use advanced technology, and have highly trained staff to maintain high standards of accuracy and reliability",
	},
	{
		isActive: false,
		question: "Are there any specific preparations needed before my tests?",
		answer:
			"Some tests may require fasting or specific preparations. Our team will inform you of any requirements when you schedule your appointment",
	},
	{
		isActive: false,
		question: "Do you offer any packages for health screenings?",
		answer:
			"Yes, we have various health screening packages tailored to different age groups and health needs. Please check our website for details",
	},
	{
		isActive: false,
		question: "How can I provide feedback about my experience?",
		answer:
			"We welcome your feedback! You can share your thoughts through our website, social media, or by contacting our customer service team",
	},
];


const FaqItem = ({ faq }) => {
	const [isOpen, setIsOpen] = useState(faq.isActive);

	const toggleFaq = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`${isOpen && "active"
				}  bg-[#1E2735] rounded-lg mt-6`}
		>
			<a
				href="#!"
				className="btn p-4 lg:px-6 w-full text-start lg:text-[1rem] text-md flex justify-between items-center cursor-pointer text-white"
				onClick={toggleFaq}
			>
				<span>{faq.question}</span>
				<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
			</a>
			<div className={`${isOpen ? "block" : "hidden"} px-4 lg:px-6  pb-2`}>
				<p className=" text-white text-[0.9rem]">{faq.answer}</p>
			</div>
		</div>
	);
};

FaqItem.propTypes = {
	faq: PropTypes.object.isRequired,
};

const Faq = () => {
	return (
		<section className="bg-whit text-black py-4 sm:py-8 md:py-10 lg:py-12">
			<div className="container px-4 md:px-8 lg:px-28 mx-auto">
				<div className="grid grid-cols-12 justify-center md:mb-6">
					<div className="col-span-12 lg:col-span-8 lg:col-start-3 xl:px-12 text-center">
						<h3 className="text-start md:text-center">
							Frequently Asked Questions
						</h3>
						<p className="text-justify md:text-center">
							At Shanya Scans & Theranostics, we prioritize making advanced diagnostics accessible and dependable. Discover our cutting-edge services and allow us to support your path to better health!
						</p>

					</div>
				</div>

				<div className="grid grid-cols-12 gap-0 md:gap-2">
					<div className="col-span-12 md:col-span-6">
						{faqList.slice(0, Math.floor(faqList.length / 2)).map((faq, i) => (
							<FaqItem faq={faq} key={i} />
						))}
					</div>
					<div className="col-span-12 md:col-span-6">
						{faqList
							.slice(Math.floor(faqList.length / 2), faqList.length)
							.map((faq, i) => (
								<FaqItem faq={faq} key={i} />
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq
