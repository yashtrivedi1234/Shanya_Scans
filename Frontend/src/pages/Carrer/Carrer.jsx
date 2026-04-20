import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import BreadCrumbs from "../../component/BreadCums";

const contents = [
  {
    title: "Lab Technician",
    details: "Looking for experienced lab technicians to handle diagnostic equipment and tests.",
    duration: "Full Time",
    location: "Lucknow, India",
  },
  {
    title: "Radiologist",
    details: "Seeking a certified radiologist to operate imaging equipment and analyze reports.",
    duration: "Part Time",
    location: "Lucknow, India",
  },
  {
    title: "Front Desk Executive",
    details: "Join our team to manage patient queries and ensure smooth operations at the reception.",
    duration: "Full Time",
    location: "Lucknow, India",
  },
  {
    title: "Phlebotomist",
    details: "We need skilled phlebotomists to perform blood draws and manage sample collection.",
    duration: "Full Time",
    location: "Lucknow, India",
  },
];

const CareerCard = ({ content, index, onApplyClick }) => {
  const { title, duration, details, location } = content;

  return (
    <>
      {index < contents.length && (
        <hr className="my-10 mx-2 dark:border-gray-700" />
      )}
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-7">
          <div>
            <h3 className="text-3xl font-medium mb-2">{title}</h3>
            <h5 className="text-xl font-medium my-4 pb-4">{details}</h5>
            <p className="border-2 border-black dark:border-white font-medium min-w-[100px] inline py-2 px-4 rounded-full mb-0 mr-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              {location}
            </p>
            <p className="border-2 border-black dark:border-white font-medium min-w-[100px] inline py-2 px-4 rounded-full mb-0">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              {duration}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 mt-6 md:mt-0">
          <div className="flex md:justify-end">
            <button
              onClick={() => onApplyClick(title)}
              className="text-2xl font-medium group"
            >
              Apply{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-1 -rotate-45 group-hover:rotate-0 transition"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CareerCard.propTypes = {
  content: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onApplyClick: PropTypes.func.isRequired,
};

const Career = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [showGeneralForm, setShowGeneralForm] = useState(false);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Career" },
  ];

  const handleApplyClick = (title) => {
    setJobTitle(title);
    setShowForm(true);
  };

  const handleGeneralFormClick = () => {
    setShowGeneralForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowGeneralForm(false);
    setJobTitle("");
  };

  return (
    <div>
      <BreadCrumbs headText={"Career"} items={breadcrumbItems} />
      
      <section className="py-14 border border-red-500 md:py-24 bg-white text-zinc-900 dark:text-black">
        <div className="max-w-7xl px-4 mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-10 lg:col-span-7 xl:col-span-6">
              <div>
                <p className="border-2 border-black dark:border-white font-medium min-w-[100px] inline py-2 rounded-full">
                  We're Hiring
                </p>
                <h1 className="text-[32px] font-bold capitalize lg:text-6xl mt-6 mb-4">
                  Be part of our mission
                </h1>
                <p className="text-lg font-medium leading-normal lg:text-xl">
                  We are looking for passionate people to join us on our mission
                  to deliver the highest standards of diagnostics. If your
                  skills match our openings or you're interested in working with
                  us, we welcome your resume!
                </p>
                <button
                  onClick={handleGeneralFormClick}
                  className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-lg"
                >
                  Send Resume
                </button>
              </div>
            </div>

            {contents.map((content, i) => (
              <div className="col-span-12 mt-12" key={i}>
                <CareerCard content={content} index={i} onApplyClick={handleApplyClick} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="">Apply for {jobTitle}</h3>
            <form>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Upload CV</label>
                <input
                  type="file"
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg text-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="ml-4 px-6 py-3 bg-gray-300 rounded-lg text-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* General Resume Submission Form */}
      {showGeneralForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Send Your Resume</h2>
            <form>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Upload CV</label>
                <input
                  type="file"
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg text-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="ml-4 px-6 py-3 bg-gray-300 rounded-lg text-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default Career;
