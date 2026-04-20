import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../component/BreadCums";
import { useLocation } from "react-router-dom";
import img2 from '../../assets/Blog/blog2.jpg'


const blogs = [
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_4.png",
		title: "Decide what type of teacher you want to be",
		date: "Jun 29",
		link: "#",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_3.png",
		title: "How I’m Styling Everyday Black Outfits",
		date: "Aug 15",
		link: "#",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_5.png",
		title: "Long lasting fall scent for women sale offer",
		date: "Sep 17",
		link: "#",
	},
];

const comments = [
	{
		author: "George Codex",
		title: "Blue Seduction",
		link: "#",
	},
	{
		author: "Kontramax",
		title: "Sticky Post With Left Sidebar",
		link: "#",
	},
	{
		author: "Yann Yong",
		title: "Early stage disruptive",
		link: "#",
	},
];

const BlogItems = () => {
	return (
		<div className="mt-12">
			<h4 className="text-2xl font-medium mb-6">RELATED POSTS</h4>
			{blogs.map((blog, i) => {
				const { img, title, link, date } = blog;
				return (
					<div className="mt-4" key={i}>
						<div className="flex items-start">
							<img
								src={img}
								alt={title}
								width="50"
								className="max-w-full h-auto mr-3"
							/>
							<div>
								<a href={link} className="font-semibold hover:text-blue-600">
									<h6>{title}</h6>
								</a>
								<p className="opacity-75">{date}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const Comment = () => {
	return (
		<div className="mt-12">
			<h4 className="text-2xl font-medium mb-6">RECENT COMMENTS</h4>
			<div className="border dark:border-gray-600 rounded-md p-8">
				<ul className="flex flex-col">
					{comments.map((item, i) => {
						const { author, link, title } = item;
						return (
							<li className="border-b dark:border-b-gray-600 py-2" key={i}>
								<FontAwesomeIcon icon={faComment} className="mr-2" />
								{author} on
								<a
									href={link}
									className="font-semibold hover:text-blue-600 transition"
								>
									{title}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

const Contents = () => (
	<div className="ezy__blogdetails4-contents">
		<img
			src="https://cdn.easyfrontend.com/pictures/contact/contact13.jpg"
			alt="Understanding Thyroid Problems"
			className="max-h-[600px] w-full rounded-md object-cover"
		/>
		<p className="opacity-75 leading-relaxed text-justify mt-12">
			<span className="text-4xl leading-none text-blue-600">T</span> hyroid disorders are
			common medical conditions that affect millions of individuals globally. These
			conditions stem from an imbalance in the production of thyroid hormones, either too
			much (hyperthyroidism) or too little (hypothyroidism).
		</p>
		<p className="opacity-75 leading-relaxed text-justify mt-4">
			The thyroid gland, located at the base of your neck, plays a crucial role in
			regulating metabolism, energy levels, and overall growth. When it malfunctions,
			individuals may experience symptoms such as fatigue, weight fluctuations, mood
			changes, and sensitivity to temperature. Understanding the root causes, which can
			include autoimmune diseases, iodine deficiency, or genetic predisposition, is
			critical for effective treatment.
		</p>
		<p className="opacity-75 leading-relaxed text-justify mt-4">
			Diagnosis typically involves blood tests to measure thyroid hormone levels (TSH,
			T3, T4) and imaging tests in some cases. Treatment options vary based on the
			specific disorder and severity, ranging from medication and dietary adjustments to
			surgery in severe cases. Early diagnosis and management are vital to prevent
			complications and ensure a healthy, balanced life.
		</p>
	</div>
);

const SideBar = () => (
	<div>
		<div>
			<h4 className="text-2xl font-medium mb-2">ABOUT US</h4>
			<p className="opacity-75">
				Holistically re-engineer long-term high-impact convergence via emerging
				bandwidth. Distinctively repurpose real-time opportunities without long-term
				high-impact potentialities. Interactively monetize corporate outsourcing before
				unique core competencies.
			</p>
		</div>
		<BlogItems />
	</div>
);

const BlogDetail2 = () => {
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog Detail" },
	];
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (location.pathname === "/blog/:name") {
			window.scrollTo(0, 0);
		}
	}, [location]);

	return (
		<div>
			<BreadCrumbs headText={"Blog Details"} items={breadcrumbItems} />
			<section className="ezy__blogdetails4 light py-14 md:py-24 bg-white  text-zinc-900 dark:text-black">
				<div className="max-w-7xl px-4 mx-auto">
					<div className="grid grid-cols-12 gap-5 md:gap-6 lg:gap-10">
						<div className="col-span-12 md:col-span-4 lg:col-span-3 order-2 md:order-1">
							<SideBar />
						</div>

						<div className="col-span-12 md:col-span-8 lg:col-span-9 order-1 md:order-2">
							<Contents />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default BlogDetail2;
