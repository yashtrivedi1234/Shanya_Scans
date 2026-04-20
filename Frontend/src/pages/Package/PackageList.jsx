import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import img1 from '../../assets/Package/package1.jpg'
import img2 from '../../assets/Package/Package2.png'
import img3 from '../../assets/Package/Package3.png'
import pattern from '../../assets/home/microshape.png'
import BreadCrumbs from "../../component/BreadCums";
import { Link, useLocation, useParams } from "react-router-dom";
import PackageCard from "./PackagesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageData } from "../../Redux/slice/package.slice";

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
	{
		bannerImg: img1,
		authorImg: "https://cdn.easyfrontend.com/pictures/users/user1.jpg",
		title: "Whole Body Health Checkup",
		date: "August 10th, 2022",
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
		name: "Full Body Checkup - Advanced",
		type: "Checkup",
		originalPrice: 9080,
		discountedPrice: 2499,
		discount: "72% Off",
		parameters: 101,
		reportTime: "10 hours",
		image: img3
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
		name: "Full Body Checkup - Advanced",
		type: "Checkup",
		originalPrice: 9080,
		discountedPrice: 2499,
		discount: "72% Off",
		parameters: 101,
		reportTime: "10 hours",
		image: img3
	},
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
];

const BlogItem = ({ item }) => (
	<div className="mt-6 md:mt-12 bg-gray-100 dark:bg-[#1E2735] rounded-xl overflow-hidden">
		<div className="relative">
			<img src={item?.packagePhoto?.secure_url} alt="" className="w-full" />
			{/* <img
				className="absolute -bottom-6 left-6 w-12 h-12 rounded-full"
				src={item.authorImg}
				alt=""
			/> */}
		</div>
		<div className="p-6 ">
			<a href="#!" className="hover:text-blue-600">
				<h2 className="text-white">
					{item.title}
				</h2>
			</a>
			{/* <p className="text-[17px] leading-none opacity-80 mb-5 text-white">{item.date}</p> */}
			<p className="opacity-80 mb-6 text-white">{item.text}</p>
			<div className="flex justify-between items-center">
				<Link

					className="bg-transparent z-10 hover:bg-blue-600 border border-blue-600 hover:text-white rounded transition text-sm py-2.5 px-6 mb-2"
				>
					Book Now
				</Link>
				<Link
					to={`/package/${item.title}`}
					className="bg-transparent z-10 hover:bg-blue-600 border border-blue-600 hover:text-white rounded transition text-sm py-2.5 px-6 mb-2"
				>
					View More
				</Link>
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

const PackageList = () => {
	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		// { label: 'About ASTITVA CLINIC ' },
		{ label: 'Health Package' },

	];

	const { packageData, loading, error } = useSelector((state) => state.package)
	const { packageName } = useParams();
	const dispatch = useDispatch()
	const location = useLocation()
	const data = location.state;


	const fetchPackageData = async () => {
		const response = await dispatch(fetchPackageData())
	}


	useEffect(() => {
		fetchPackageData()
	}, [dispatch, data, packageName])


	// Scroll to top on component mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (location.pathname.startsWith('/package')) {
			window.scrollTo(0, 0);
		}
	}, [location]);


	return (
		<div>
			<BreadCrumbs headText={"Our Best Health Package"} items={breadcrumbItems} />
			<section className="py-6 sm:py-10 lg:py-2  text-stone-800 bg-white  dark:text-white overflow-hidden  relative">

				<div className=" mx-auto container px-4 ">
					<div className="grid grid-cols-1 ">

						<div className="col-span-1 mx-auto md:pt-10  ">
							<div className="grid grid-cols-6 gap-x-0 ">
								{packageData.length > 0 ? (
									packageData.slice().reverse().map((item, index) => (
										<div className="col-span-6 sm:col-span-3 lg:col-span-2 xl:col-span-2 md:mb-6 mr-4 " key={index + 1}>
											<PackageCard item={item} />
										</div>
									))
								) : (
									<div className="col-span-6 text-center text-gray-600">
										<p>No data found</p>
									</div>
								)}
							</div>

						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PackageList
