import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../Redux/slice/teamSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogItem = ({ blog, blogs }) => {
  const truncateHTML = (htmlContent, limit) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.length > limit
      ? textContent.substring(0, limit) + '...'
      : textContent;
  };

  const truncatedContent = truncateHTML(blog?.blogDetail || '', 100);
  const truncatedTitle = truncateHTML(blog?.blogName || '', 30);

  return (
    <article className="rounded-lg overflow-hidden shadow-lg bg-[#1E2735] pb-3 flex flex-col">
      <div className="relative h-56">
        <img src={blog?.blogPhoto?.secure_url} alt={blog?.blogName} className="h-full w-full object-cover" />
      </div>
      <div className="p-3 md:p-6 flex-grow">
        <p className="text-sm mb-3">
          <a href="#!" className="text-white font-light hover:text-opacity-90">Sanya Global</a>
        </p>
        <Link to={`/blog/${encodeURIComponent(blog?.blogName)}/detail`} state={{ data: blog, allBlog: blogs }} className="text-red-500">
          <h4 className="font-medium text-2xl leading-7 mb-4 text-white ease-in-out duration-500 hover:text-red-600">{truncatedTitle}</h4>
        </Link>
        <div className="text-white mb-4">{truncatedContent}</div>
        <Link to={`/blog/${encodeURIComponent(blog?.blogName)}/detail`} state={{ data: blog, allBlog: blogs }} className="bg-transparent hover:bg-blue-600 border border-main ease-in-out duration-500 text-white py-2 px-5 rounded transition">
          Read More
        </Link>
      </div>
    </article>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

const SkeletonLoader = () => (
  <div className="cursor-pointer animate-pulse w-full h-auto">
    <div className="bg-gray-300 h-80 w-full mx-auto"></div>
    <div className="px-6 py-[1.5rem] xl:px-8 border bg-[#F7F7F7]">
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-5"></div>
      <div className="h-7 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogData, loading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchBlogData());
  }, [dispatch]);

  return (
    <section className="py-4 sm:py-6 md:py-10 text-stone-800 bg-gray-200 overflow-hidden -z-10">
      <div className="max-w-7xl px-6 lg:px-10 lg:mx-auto">
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 lg:col-end-11 text-center">
            <h3 className="text-start md:text-center text-main lg:text-3xl sm:text-2xl text-xl font-semibold">Our Blogs Related to Health Care</h3>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mt-6 mt-2 mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
            {blogData.map((blog, i) => (
              <BlogItem key={i} blog={blog} blogs={blogData} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
