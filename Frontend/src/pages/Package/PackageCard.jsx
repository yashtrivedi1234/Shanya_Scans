import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchPackageData, fetchPackageTag } from "../../Redux/slice/package.slice";
import HomePackageCard from "./HomePackageCard";
import pattern from '../../assets/home/microshape.png';

const SampleNextArrow = (props) => {
	const { className, onClick } = props;
	return (
		<div className={`${className} arrow-next text-black bg-black rounded-full`} onClick={onClick} style={{ display: 'block' }}>
			&#8250;
		</div>
	);
};

const SamplePrevArrow = (props) => {
	const { className, onClick } = props;
	return (
		<div className={`${className} arrow-prev text-black bg-black rounded-full`} onClick={onClick} style={{ display: 'block' }}>
			&#8249;
		</div>
	);
};

const Blog14 = () => {
	const dispatch = useDispatch();
	const { packageData, packageTag } = useSelector((state) => state.package);
	const [selectedTag, setSelectedTag] = useState('all'); // Default to 'all'
	const [slugName, setSlugName] = useState('all')

	// Fetch data for packages and tags
	const fetchData = async () => {
		await dispatch(fetchPackageData());
		await dispatch(fetchPackageTag());
	};


	const handleClick = (val) => {
		setSlugName(val.packageSlugName)
		setSelectedTag(val.packageTagName)
	}

	useEffect(() => {
		fetchData();
	}, []);

	// Filtered packageData based on the selected tag
	const filteredData = slugName === 'all'
		? packageData
		: packageData.filter((pkg) => pkg.slug === slugName);

	// Slider settings
	const slidesToShow = filteredData.length < 3 ? filteredData.length : 3; // Adjust based on filtered data

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow, // Show fewer slides if there is less data
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,

		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: slidesToShow,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {

					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};




	return (
		<section className="py-6 sm:py-8 md:py-10 lg:py-12 text-stone-800 bg-white overflow-hidden relative ">
			{/* <div
				className="absolute inset-0 -z-10"
				style={{
					backgroundImage: `url(${pattern})`,
					backgroundSize: 'contain',
					backgroundPosition: 'left',
					opacity: 2,
					width: '40%',
					left: '0',
				}}
			></div> */}
			<div className="max-w-7xl px-4 sm:px-6 md:px-8 mx-auto">
				<div className="grid grid-cols-1">
					<div className="flex flex-col max-w-xl justify-center md:items-center md:text-center mx-auto  relative z-10">
						<h3 className="mb-2 text-main">Our Diagnostic Packages</h3>
						<p className="opacity-80 mb-6 lg:mb-0">
							Discover budget-friendly health checkup packages in Lucknow, offering reliable tests to help you take care of your health
						</p>
					</div>

					{/* Package Tags (Tabs) */}
					<div className="md:flex flex-wrap gap-2 hidden  justify-center mb-10 pt-4 border-b border-gray-300 pb-2 ">
						<button
							className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${selectedTag === 'all' ? 'bg-blue-600 text-white shadow-md scale-95' : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'
								}`}
							onClick={() => { setSelectedTag('all'), setSlugName('all'); }}

						>
							All
						</button>

						{packageTag.map((tag) => (
							<button
								key={tag.packageTagName}
								className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${selectedTag === tag.packageTagName ? 'bg-blue-600 text-white shadow-md scale-95' : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'
									}`}
								onClick={() => handleClick(tag)}
							>
								{tag.packageTagName}
							</button>
						))}
					</div>

					<div className="flex md:hidden gap-2 mb-6 border-b border-gray-300 pb-3  overflow-x-auto md:justify-center px-2 md:px-0 no-scrollbar">
						<button
							className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 
                                  ${selectedTag === 'all' ? 'bg-blue-600 text-white shadow-lg scale-95' : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`}
							onClick={() => {
								setSelectedTag('all');
								setSlugName('all');
							}}
						>
							All
						</button>

						{packageTag.map((tag) => (
							<button
								key={tag.packageTagName}
								className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 whitespace-nowrap 
                                  ${selectedTag === tag.packageTagName ? 'bg-blue-600 text-white shadow-lg scale-95' : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`}
								onClick={() => handleClick(tag)}
							>
								{tag.packageTagName}
							</button>
						))}
					</div>


					{filteredData.length <= 2 ? <HomePackageCard item={filteredData[0]} /> : <Slider Slider
						{...settings}

					>
						{filteredData.map((item, i) => (
							<div className="col-span-6 md:col-span-3 lg:col-span-1 px-2   bg-white" key={i}>
								<HomePackageCard item={item} />
							</div>
						))}

					</Slider>}

					{/* Slider */}





				</div>
			</div>
		</section >
	);
};

export default Blog14;
