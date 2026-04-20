import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const items = [
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_1.png",
		title: "Toys",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
		title: "Kids",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png",
		title: "Bags",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png",
		title: "Babies",
	},
    {
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_1.png",
		title: "Toys",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
		title: "Kids",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png",
		title: "Bags",
	},
	{
		imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png",
		title: "Babies",
	},
];

const Item = () => {
	return items.map((item, index) => (
		<div className="col-span-12 sm:col-span-6 md:col-span-3 my-6  max-w-[12rem] " key={index}>
			<a
				href="#!"
				className="bg-white  shadow-xl relative flex items-end justify-center min-h-[100px] rounded-t-[30px] rounded-b-[15px] border dark:border-slate-700"
			>
				<div className="absolute -top-[50px] left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow dark:border-slate-700 rounded-full flex justify-center items-center h-20 w-20">
					<img src={item.imageUrl} alt="" className="w-10" />
				</div>
				<h4 className="text-2xl font-medium mb-6 text-black">{item.title}</h4>
			</a>
		</div>
	));
};

const ListTest = () => {
	return (
		<section className=" py-6 bg-gray-100  text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="absolute top-0 right-0">
				<img
					src="https://cdn.easyfrontend.com/pictures/ecommerce/grid_10_shape1.png"
					alt=""
				/>
			</div>

			<div className="max-w-7xl  px-4 lg:px-8 mx-auto relative">
				{/* <h2 className="text-[32px] md:text-5xl leading-tight font-bold text-center mb-12">
					Top Category
				</h2> */}

                <div className="flex flex-col max-w-xl justify-center  px-4 md:items-center md:text-center text-start mx-auto lg:py-10 relative z-10">
        <h3 className="text-start">
          Our Best Service
        </h3>
        <p className="text-lg opacity-80">
          We provide the best service of pathology in Lucknow.
        </p>
      </div>

				<div className="relative">
					<div className="grid grid-cols-12 gap-6">
						<Item />
					</div>
					{/* <div className="flex items-center">
						<button className="absolute top-1/2 left-0 md:-left-7 -translate-y-1/2 bg-white bg-opacity-50 shadow-xl text-pink-500 text-xl font-bold flex justify-center items-center rounded-full px-5 py-4 mr-4">
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>

						<button className="absolute top-1/2 right-0 md:-right-7 -translate-y-1/2 bg-white bg-opacity-50 shadow-xl text-pink-500 text-xl font-bold flex justify-center items-center rounded-full px-5 py-4">
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div> */}
				</div>
			</div>
		</section>
	);
};


export default ListTest