import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const progressBardetails = [
	{ value: "1", active: true },
	{ value: "2", active: true },
	{ value: "3", active: true },
];

const ProgressBar = () => {
	return (
		<div className="col-span-12 border border-red-500">
			<div className="flex items-center justify-between relative mb-12 ">
				<div className="absolute top-5 right-0 left-0 border-t-2 border-dashed border-blue-600"></div>
				{progressBardetails.map((item, i) => (
					<span
						className={`relative w-10 h-10 shadow flex justify-center items-center text-lg z-20 cursor-pointer rounded-full border ${
							item.active
								? "bg-blue-600 text-white  border-blue-600"
								: "bg-gray-100 dark:bg-slate-700 dark:border-slate-600"
						} `}
						key={i}
					>
						{item.value}
					</span>
				))}
			</div>
		</div>
	);
};

const CheckOutSuccess = () => {
	return (
		<section className="  text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="container p-4 mx-auto">
				<div className="grid grid-cols-12">
					{/* progress bar */}
					{/* <ProgressBar /> */}

					<div className="col-span-12">
						<div className=" text-center flex flex-col justify-center items-center  px-6 md:px-10 py-10 md:py-16 rounded-md">
							<div className="text-blue-600 text-2xl border border-blue-600 inline-flex justify-center items-center p-4 rounded-full">
								<FontAwesomeIcon icon={faCheck} />
							</div>
							<h1 className="text-3xl md:text-[44px] leading-tight font-medium mt-4 mb-2">
								Your Order is Successful Placed
							</h1>
							<p className="">
								We Will Reach You Soon
							</p>
					
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CheckOutSuccess
