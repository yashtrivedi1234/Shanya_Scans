import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../Redux/slice/teamSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
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
    <article className="rounded-lg overflow-hidden shadow-lg bg-[#1E2735] pb-3 flex flex-col min-h-[450px]">
      <div className="relative h-56">
        <img src={blog?.blogPhoto?.secure_url} alt={blog?.blogName} className="h-full w-full object-cover" />
      </div>
      <div className="p-3 md:p-6 flex-grow">
        <p className="text-sm mb-3">
          <a href="#!" className="text-white font-light hover:text-opacity-90">Sanya Global</a>
        </p>
        <Link to={`/blog/${encodeURIComponent(blog?.blogName)}/detail`} state={{ data: blog, allBlog: blogs }} className="text-red-500">
          <h4 className="font-medium text-lg leading-6 mb-3 text-white ease-in-out duration-500 hover:text-red-600 line-clamp-2">{truncatedTitle}</h4>
        </Link>
        <div className="text-white mb-4 line-clamp-3 text-sm">{truncatedContent}</div>
        <Link to={`/blog/${encodeURIComponent(blog?.blogName)}/detail`} state={{ data: blog, allBlog: blogs }} className="bg-transparent hover:bg-yellow border border-yellow ease-in-out duration-500 text-white py-2 px-5 rounded transition">
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
  <div className="cursor-pointer animate-pulse">
    <div className="bg-gray-300 h-64 w-full mx-auto"></div>
    <div className="px-4 py-[1rem] xl:px-6 border bg-[#F7F7F7]">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Blog = () => {
  const dispatch = useDispatch();
  const { blogData, loading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchBlogData());
  }, [dispatch]);

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 text-stone-800 bg-gray-200 overflow-hidden -z-10">
      <div className="max-w-7xl px-4 lg:px-8 lg:mx-auto">
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 lg:col-end-11 text-center">
            <h3 className="text-start md:text-center text-main">Our Blogs Related to Health Care</h3>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-12 mt-4 md:mt-6 gap-6 mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="col-span-12 md:col-span-6 lg:col-span-4" key={i}>
                <SkeletonLoader />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-6 md:mt-8 z-0"
        >
            {blogData.map((blog, i) => (
              <SwiperSlide key={i}>
                <BlogItem blog={blog} blogs={blogData} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Blog;