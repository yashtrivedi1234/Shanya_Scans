import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../component/BreadCums";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from '../../assets/Blog/blog1.jpg'
import img2 from '../../assets/Blog/blog2.jpg'
import img3 from '../../assets/Blog/blog3.jpg'
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../Redux/slice/teamSlice";
import Blog from "./Blogs";
import BlogPage from "./BlogPage";

const blogs = [
	{
		title: "Why Regular Screning is important?",
		description:
			"A screening test is done to detect potential health disorders or diseases in people who do not have any symptoms of disease. The goal is early detection",
		author: "Alex Hales",
		date: "2024-10-17 18:01:34",
		image: img1,
     	url:"blog/whywe"
	},
	{
		title: "Dengue Fever : Symptoms, Prevention and Control",
		description:
			"Dengue (pronounced DENgee) fever is a painful, debilitating mosquito-borne disease caused by any one of four closely related dengue viruses.",
		author: "Mitwa Dadkan",
		date: "2024-10-26 18:01:34",
		image: img2,
    url:"blog/dengue/fever"
	},
	{
		title: "Understanding Thyroid Problems – Causes, Symptoms & Treatment",
		description:
			"The thyroid is a small, butterfly-shaped gland at the base of the front of the neck and produces triiodothyronine (T3) /",
		author: "Mahws Georgia",
		date: "2024-11-16 18:01:34",
		image: img3,
    url:"blog/thyroid"
	},
];


const BlogItem = ({ blog, index }) => {
  const { title, description, author, date, image } = blog;
  const navigate=useNavigate()

  

  return (
    <article
      className="flex flex-col shadow-lg bg-[#1E2735] cursor-pointer dark:shadow-none rounded-lg overflow-hidden pb-2 h-full"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <img src={image} alt={title} className="h-auto w-full" />
      <div className="flex flex-col justify-between grow p-3 pb-8 lg:p-6">
        <div>
          <h2 className="font-medium text-2xl mb-1 text-white hover:text-red-600 ease-in-out duration-500">{title}</h2>
          <p className="opacity-80 mb-2 mt-4 lg:mt-0">
            <span className="mr-2 text-white">
              By{" "}
              <a href="#!" className="text-blue-600">
                {author}
              </a>
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} className="ml-1 text-white" />{" "}
              <span className="text-white">{date}</span>
            </span>
          </p>
          <p className="opacity-60 mt-3 lg:mt-0  text-white lg:hidden xl:block">{description}</p>
        </div>
        <div>
          <button
        
            className="bg-transparent hover:bg-blue-600 border border-blue-600 text-white ease-in-out duration-500 py-2  px-5 rounded transition"
            onClick={()=>navigate(`/${blog?.url}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};




BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const FeaturedBlogItem = () => (
  <article data-aos="zoom-in" data-aos-delay="300">
    <div className="grid grid-cols-12 items-center gap-6">
      <div className="col-span-12 lg:col-span-7 lg:order-2">
        <img src={img3} alt="" className="max-w-full h-auto rounded" />
      </div>
      <div className="col-span-12 lg:col-span-5 lg:order-1">
        <div className="mt-6 lg:mt-0 lg:pl-6">
          <h4 className="font-medium text-2xl md:text-[40px] md:leading-[50px] mb-2">
          Why Regular Screning is important?
          </h4>
          <p className="md:text-lg opacity-60 mt-3 mb-6  ">
          A screening test is done to detect potential health disorders or diseases in people who do not have any symptoms of disease. The goal is early detection.
          </p>
          <div className="text-base leading-5 flex items-center">
            <div className="mr-2">
              <img
                src="https://cdn.easyfrontend.com/pictures/users/user18.jpg"
                alt=""
                className="h-auto max-w-full rounded-full border border-border"
                width="47"
              />
            </div>
            {/* <div className="opacity-80">
              <p>
                By<b> Alan Bell</b>
              </p>
              <p className="text-sm opacity-75">August 10th, 2020</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </article>
);

const BlogList = () => {

      const location=useLocation()
      const dispatch=useDispatch()
      const {blogData,loading,error}=useSelector((state)=>state.test)
    
 
      
       

      const fetchData=async()=>{
         const response=await  dispatch(fetchBlogData())
         console.log("blog page is",response);
         
      }
      
      useEffect(()=>{
        if(!blogData && !loading){
          fetchData()
        }
    
      },[dispatch,blogData,loading])


  
         // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  
      useEffect(() => {
        if (location.pathname === '/blog') {
          window.scrollTo(0, 0);
        }
      }, [location]);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog" },
  ];

  return (
    <div>
      <BreadCrumbs headText={"Our Blogs"} items={breadcrumbItems} />
      <section className="">
         <BlogPage/>
      </section>
    </div>
  );
};

export default BlogList;
