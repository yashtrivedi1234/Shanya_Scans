import React, { useEffect, useState } from "react";
import img1 from '../assets/banner/banne1.jpg';
import img2 from '../assets/banner/banner2.jpg';
import img3 from '../assets/banner/banne1.jpg';
import img4 from '../assets/banner/banner2.jpg';

const Shape1 = () => (
  <svg
    className="absolute left-0 top-0 text-blue-600 -z-10"
    width="765"
    height="352"
    viewBox="0 0 765 352"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-233.567 243.494C-233.567 243.494 -192.563 139.13 -133.479 118.445C-84.3687 101.251 -48.7519 155.405 -1.18896 134.314C47.9318 112.533 25.2003 38.0036 76.0346 20.5795C128.975 2.43373 155.956 79.8324 210.867 69.0092C275.621 56.2461 267.911 -15.1528 329.258 -39.4731C391.104 -63.9909 432.024 -44.6718 497.161 -58.2395C581.608 -75.8293 691.003 -208 691.003 -208"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const Shape2 = () => (
  <svg
    className="absolute top-0 bottom-0 left-1/4 lg:left-[45%] text-blue-600"
    width="765"
    height="616"
    viewBox="0 0 765 616"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1413_1802)">
      <path
        d="M2 308C2 138.449 139.449 1 309 1H763V615H309C139.449 615 2 477.551 2 308V308Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

const HeroHeader = () => {
  const [heading, setHeading] = useState("Designing with balance, love and care.");
  const [subheading, setSubheading] = useState(
    "Unique themes and templates for every budget and every project. Take a look and find the right one for you!"
  );
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage current image index

  const headings = [
    "Achieving Excellence in Pathology and Diagnostics.",
    "Precision and Accuracy in Every Test.",
    "State-of-the-Art Technology for Reliable Results.",
    "Trusted Pathology Services Available 24x7."
  ];

  const subheadings = [
    "Shanya Scans & Theranostics: Committed to providing accurate and timely results.",
    "Fully automated and equipped with cutting-edge technology.",
    "Operating 24x7 to ensure you get the results when you need them.",
    "Your partner in healthcare: Excellence, reliability, and quality."
  ];

  const images = [img1, img2, img3, img4]; // Array of images corresponding to the headings and subheadings

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <section className="ezy__header23 light py-14 md:py-20 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <Shape1 />

      <div className="max-w-7xl px-4 lg:px-8 mx-auto relative">
        <div className="grid grid-cols-12 gap-y-6 lg:gap-x-6">
          {/* Left Column: Text */}
          <div className="col-span-12 lg:col-span-6 xl:pr-12 text-center lg:text-start">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl md:text-[55px] lg:text-[65px] md:leading-[70px] lg:leading-[85px] font-bold mb-4 text-white">
                {heading} {/* Dynamic heading */}
              </h2>
              <p className="text-[22px] leading-normal opacity-80 text-white">
                {subheading} {/* Dynamic subheading */}
              </p>
            </div>
          </div>

          {/* Right Column: Search Input with Infinite Text Scroll */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative pb-6">
            <Shape2 />
            <div className="absolute bottom-0 right-0 p-4 w-full lg:w-1/3 bg-opacity-50 bg-blue-600 rounded-md">
              {/* Infinite scrolling text */}
              <div className="overflow-hidden">
                <div className="animate-marquee text-white text-lg">
                  <span>Search for tests, checkups, diagnostics, and more...</span>
                </div>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                className="w-full mt-4 p-3 text-lg rounded-md border-none outline-none"
              />
            </div>

            {/* Infinite Background Image Scroll */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                animation: "scroll-bg 20s linear infinite", // Infinite scrolling effect
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
