import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../component/BreadCums";
import { useLocation } from "react-router-dom";
import img3 from '../../assets/Blog/blog3.jpg'

const blogs = [
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_4.png",
		title: "Understanding Mosquito-Borne Diseases",
		date: "Jun 29",
		link: "#",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_3.png",
		title: "Effective Ways to Control Mosquito Breeding",
		date: "Aug 15",
		link: "#",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_5.png",
		title: "Best Practices for Community Health Safety",
		date: "Sep 17",
		link: "#",
	},
];

const comments = [
	{
		author: "Dr. Smith",
		title: "Understanding Early Dengue Symptoms",
		link: "#",
	},
	{
		author: "Health Advocate",
		title: "Preventive Measures That Work",
		link: "#",
	},
	{
		author: "Sanya Global",
		title: "Community Efforts to Control Dengue",
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
			src={img3}
			alt="Dengue Fever Awareness"
			className="max-h-[600px] w-full rounded-md object-cover"
		/>
		<p className="opacity-75 leading-relaxed text-justify mt-12">
			<span className="text-4xl leading-none text-blue-600">D</span> engue fever is a
			mosquito-borne viral infection caused by the dengue virus. It is transmitted
			primarily by the *Aedes aegypti* mosquito. The infection manifests as a sudden
			onset of fever, severe headaches, muscle and joint pain, skin rash, and other flu-like
			symptoms. Severe dengue, also known as dengue hemorrhagic fever, can lead to
			serious complications such as bleeding, low platelet count, and organ damage.
		</p>
		<p className="opacity-75 leading-relaxed text-justify mt-4">
			Preventing dengue fever starts with controlling mosquito populations and reducing
			exposure to bites. This includes eliminating standing water where mosquitoes breed,
			using insect repellents, and ensuring proper sanitation. Communities play a vital
			role by organizing awareness campaigns and taking collective actions to mitigate
			the spread.
		</p>
		<p className="opacity-75 leading-relaxed text-justify mt-4">
			Symptoms of dengue can escalate quickly, so it is crucial to seek medical attention
			if fever persists for more than two days or if severe symptoms like abdominal pain
			or difficulty breathing occur. While there is no specific treatment for dengue, early
			detection and supportive care significantly improve outcomes.
		</p>
	</div>
);

const SideBar = () => (
	<div>
		<div>
			<h4 className="text-2xl font-medium mb-2">ABOUT US</h4>
			<p className="opacity-75">
				Sanya Global is dedicated to promoting health awareness and providing actionable
				information on public health issues. Our mission is to empower individuals and
				communities to lead healthier lives through knowledge and preventative care.
			</p>
		</div>
		<BlogItems />
	</div>
);

const BlogDetail1 = () => {
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Dengue Fever: Symptoms, Prevention and Control" },
	];
	const location = useLocation();

	// Scroll to top on component mount
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
			<BreadCrumbs headText={"Dengue Fever: Symptoms, Prevention and Control"} items={breadcrumbItems} />
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

export default BlogDetail1;
