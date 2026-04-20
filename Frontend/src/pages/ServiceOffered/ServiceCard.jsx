import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import img1 from '../../assets/Package/package1.jpg'
import img2 from '../../assets/Package/Package2.png'
import img3 from '../../assets/Package/Package3.png'
import pattern from '../../assets/home/microshape.png'

import { useDispatch, useSelector } from "react-redux";
import { fetchPackageData } from "../../Redux/slice/package.slice";
import HomePackageCard from "../Package/HomePackageCard";

const blogs = [
	{
		bannerImg: img1,
		authorImg: "https://cdn.easyfrontend.com/pictures/users/user1.jpg",
		title: "Whole Body Health Checkup",
		date: "August 10th, 2022",
		text: "Includes 48 parameters",
	},
	{
		bannerImg: img2,
		authorImg: "https://cdn.easyfrontend.com/pictures/users/user25.jpg",
		title: "Basic Body Health Checkup",
		date: "August 10th, 2022",
		text: "Includes 48 parameters",
	},
	{
		bannerImg: img3,
		authorImg: "https://cdn.easyfrontend.com/pictures/users/user7.jpg",
		title: "Diabetic Check Up At Home",
		date: "February 15th, 2022",
		text: "Includes 48 parameters",
	},
];

const packagesData = [
	{
		id: 1,
		name: "Full Body Checkup - Essential",
		type: "Checkup",
		originalPrice: 6063,
		discountedPrice: 1599,
		discount: "74% Off",
		parameters: 91,
		reportTime: "7 hours",
		image: img1
	},
	{
		id: 2,
		name: "Full Body Checkup - Basic",
		type: "Checkup",
		originalPrice: 14263,
		discountedPrice: 3599,
		discount: "75% Off",
		parameters: 110,
		reportTime: "12 hours",
		image: img2
	},
	{
		id: 3,
		name: "Full Body Checkup -Advanced",
		type: "Checkup",
		originalPrice: 9080,
		discountedPrice: 2499,
		discount: "72% Off",
		parameters: 101,
		reportTime: "10 hours",
		image: img3
	},

];


const BlogItem = ({ item }) => (
	<div className="mt-6 md:mt-12 bg-gray-100 dark:bg-[#1E2735] rounded-xl overflow-hidden ">
		<div className="relative">
			<img src={item.bannerImg} alt="" className="w-full" />
			{/* <img
				className="absolute -bottom-6 left-6 w-12 h-12 rounded-full"
				src={item.authorImg}
				alt=""
			/> */}
		</div>
		<div className="p-6 pb-8">
			<a href="#!" className="hover:text-blue-600 z-10">
				<h2 className="text-white">
					{item.title}
				</h2>
			</a>
			{/* <p className="text-[17px] leading-none opacity-80 mb-5 text-white">{item.date}</p> */}
			<p className="opacity-80 mb-6 text-white">{item.text}</p>
			<div className="flex justify-between items-center">
				<a
					href="#!"
					className="bg-transparent hover:bg-blue-600 z-10 border border-blue-600 hover:text-white rounded transition text-sm py-2.5 px-6 mb-2"
				>
					Book Now
				</a>
				{/* <a href="#!" className="text-xl hover:text-blue-600 transition-colors">
					<FontAwesomeIcon icon={faBookmark} />
				</a> */}
			</div>
		</div>
	</div>
);

BlogItem.propTypes = {
	item: PropTypes.object.isRequired,
};

const ServiceCard = () => {

	const dispatch = useDispatch()
	const { packageData, loading, error } = useSelector((state) => state.package)

	const fetchData = async () => {
		const response = await dispatch(fetchPackageData())
	}

	useEffect(() => {
		fetchData()
	}, [])


	return (
		<section className="ezy__blog14 light py-2  text-stone-800 bg-white  dark:text-white overflow-hidden  relative">
			<div
				className="absolute inset-0 hidden lg:block z-0"
				style={{
					backgroundImage: `url(${pattern})`,
					backgroundSize: 'contain',
					backgroundPosition: 'left',
					opacity: 0.4,
					width: '40%',
					left: '0',

				}}
			></div>
			<div className="container px-4 md:px-24 mx-auto">
				<div className="grid grid-cols-1">
					<div className="flex flex-col max-w-xl  justify-center md:items-center md:text-center mx-auto lg:py-10 relative z-10">
						<h3 className="mb-2">
							Related Procedures
						</h3>


					</div>

					<div className="col-span-1 mx-auto pt-10">
						<div className="grid grid-cols-6 gap-x-6">
							{packageData.map((item, i) => (
								<div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
									<HomePackageCard item={item} />
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServiceCard
