import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../component/BreadCums";
import { Link, useLocation } from "react-router-dom";
import img1 from '../../assets/Blog/blog1.jpg'
import { fetchBlogData } from "../../Redux/slice/teamSlice";
import { useDispatch, useSelector } from "react-redux";

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

const BlogItems = ({ allBlog }) => {
	return (
	  <div className="border border-gray-200 p-4 rounded-lg shadow-lg bg-[#1E2735]">
		<h4 className="text-lg font-semibold mb-3 text-white uppercase tracking-wide border-b border-gray-300 pb-2">
		  Related Blogs
		</h4>
  
		{allBlog.map((blog, i) => (
		  <div
			className="flex items-start mb-3 last:mb-0 bg-gray-100 hover:bg-gray-400 group rounded-md p-2 transition duration-300"
			key={i}
		  >
			{/* Blog Image */}
			<img
			  src={blog?.blogPhoto?.secure_url}
			  alt={blog?.blogName}
			  className="w-14 h-14 object-cover rounded-md shadow mr-3"
			/>
  
			{/* Blog Details */}
			<div>
			  <Link
				className="text-sm font-medium text-black hover:text-blue-500 group-hover:text-black transition duration-200"
				to={`/blog/${encodeURIComponent(blog?.blogName)}/detail`}
				state={{ data: blog, allBlog }}
			  >
				{blog?.blogName}
			  </Link>
			  <p className="text-xs text-gray-500 mt-1">
				{blog?.description?.slice(0, 60)}...
			  </p>
			</div>
		  </div>
		))}
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

const Contents = ({data}) => (
	<div className="ezy__blogdetails4-contents">
		<img
			src={data?.blogPhoto?.secure_url}
			alt=""
			className="max-h-[300px] w-full rounded-md object-cover"
		/>
		 <div  className="opacity-75 leading-relaxed text-justify mt-12"   dangerouslySetInnerHTML={{ __html: data?.blogDetail }}/>
	
		{/* <Avatar /> */}
	</div>
);

const SideBar = ({data}) => (
	<div>
		<BlogItems allBlog={data} />
	</div>
);

const Avatar = () => (
	<div className="bg-blue-600 bg-opacity-10 flex items-start p-6 md:p-12 mt-6 md:mt-12">
		<img
			src="https://cdn.easyfrontend.com/pictures/users/user11.jpg"
			alt=""
			className="max-w-full h-auto rounded-full"
			width="70"
		/>
		<div className="ml-4">
			<h5 className="font-medium text-xl mb-1">George Codex</h5>
			<p className="opacity-75 mb-2">15 Jan 2022 in Design, Develop, Wordpress</p>
			<p className="opacity-75">
				In et volutpat risus. Vestibulum at elementum nibh, at laoreet mauris. Ut
				eget mi in nisl rhoncus suscipit. Donec sed elementum dui. Sed tempus sagittis
				gravida. Etiam sit amet aliquam mauris, non sodales sapien. Curabitur non arcu
				dignissim, consectetur mi ut.
			</p>
		</div>
	</div>
);

const BlogDetail = () => {

	const {blogData,loading,error}=useSelector((state)=>state.team)
	const location = useLocation();
	const dispatch=useDispatch

	const {state}=location

	const {data,allBlog}=state

	const fetchData=async()=>{
		  const response=await dispatch(fetchBlogData())
		  console.log(response);
		  
	}


	useEffect(()=>{
          fetchData()
	},[])
	

	// Scroll to top on component mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (location.pathname === "/blog/:name") {
			window.scrollTo(0, 0);
		}
	}, [location]);

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog " ,href:'/blog'},
		{ label: `${data?.blogName}` },

	];

	return (
		<div>
			<BreadCrumbs headText={data?.blogName} items={breadcrumbItems} />
			<section className="ezy__blogdetails4 light py-14 md:py-24 bg-white text-zinc-900 dark:text-black">
  <div className="max-w-7xl px-4 mx-auto">
    <div className="grid grid-cols-12 gap-5 md:gap-6 lg:gap-10">
      {/* Contents: Positioned on the left */}
      <div className="col-span-12 md:col-span-8 lg:col-span-9 order-1">
        <Contents data={data} />
      </div>

      {/* Sidebar: Positioned on the right */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3 order-2">
        <SideBar data={allBlog} />
      </div>
    </div>
  </div>
</section>


		</div>
	);
};

export default BlogDetail;
