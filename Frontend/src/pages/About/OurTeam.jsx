import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamData } from "../../Redux/slice/teamSlice";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SkeletonLoader = () => (
  <div className="animate-pulse bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 border border-gray-200">
    <div className="w-full sm:w-36 h-44 bg-gray-300 rounded-lg"></div>
    <div className="flex-1">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
    </div>
  </div>
);

const TeamMemberCard = ({ member }) => (
  <div className="  transition-all">
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-lg  transition-all duration-300 relative overflow-hidden ">
      <div className="w-full sm:w-40 sm:h-fit rounded-xl overflow-hidden shadow-md relative">
        <img
          src={member?.doctorPhoto?.secure_url}
          alt="Doctor"
          className="w-full h-auto object-contain rounded-t-lg"
        />

      </div>
      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div>
          <h3 className="text-lg font-semibold text-main group-hover:text-main transition-all duration-300">
            {member?.doctorName}
          </h3>
          <p className="text-sm font-medium text-gray-600">{member?.doctorDesination}</p>
          <p className="text-xs text-gray-500 mt-1">{member?.experience}  {member?.degree}</p>
        </div>
        <div className="mt-auto pt-4 block md:hidden lg:block">
          <Link
            to="/contact"
            className="inline-block w-full text-center px-2 xl:px-2   py-2 text-sm font-semibold text-white bg-main rounded-full shadow-md transition-all duration-300 hover:from-main hover:to-blue-600 hover:shadow-lg"
          >
            {member?.isDoctor ? "Request Appointment" : "Inquiry Now"}
          </Link>
        </div>
      </div>
    </div>
    <div className="mt-auto pt-1 hidden md:block lg:hidden">
      <Link
        to="/appointment"
        className="inline-block w-full text-center items-end justify-end px-2 xl:px-2   py-2 text-sm font-semibold text-white bg-main rounded-full shadow-md transition-all duration-300 hover:from-main hover:to-blue-600 hover:shadow-lg"
      >
        {member?.isDoctor ? "Request Appointment" : "Inquiry Now"}
      </Link>
    </div>
  </div>
);

const TeamMemberCard1 = ({ member }) => (
  <div className=" ">
    <div className=" rounded-xl overflow-hidden relative">
      <img
        src={member?.doctorPhoto?.secure_url}
        alt="Doctor"
      />
    </div>

    <div className="flex-1 flex flex-col items-center justify-between h-full w-full">
      <div>
        <h3 className="text-2xl font-bold text-main group-hover:text-main transition-all duration-300 mt-2">
          {member?.doctorName}
        </h3>
        {/* <p className="text-sm font-medium text-gray-600 items-center text-center">{member?.doctorDesination}</p>
        <p className="text-xs text-gray-500 mt-1 items-center text-center">{member?.experience}  {member?.degree}</p> */}
      </div>

    </div>
  </div>
);

const TeamMemberCard3 = ({ member }) => (
  // <div className="  transition-all  border border-green-500">
  <div className="group flex flex-col sm:flex-col items-start sm:items-center gap-4 max-h-[385px] p-4 bg-white rounded-xl shadow-lg  transition-all duration-300 border border-gray-200 relative overflow-hidden ">
    <div className="w-full sm:w-36 sm:h-44 rounded-xl overflow-hidden shadow-md relative">
      <img
        src={member?.doctorPhoto?.secure_url}
        alt="Doctor"
        className="w-full h-auto object-contain rounded-t-lg"
      />

    </div>
    <div className="flex-1 flex flex-col  h-full ">
      <div className="flex items-center flex-col">
        <h3 className="text-lg font-semibold text-main group-hover:text-main transition-all duration-300">
          {member?.doctorName}
        </h3>
        <p className="text-sm font-medium text-gray-600 text-center">{member?.doctorDesination}</p>
        <p className="text-xs text-gray-500 mt-1 text-center">{member?.experience}  {member?.degree}</p>
      </div>
      <div className="mt-auto pt-4 block md:hidden lg:block">
        <Link
          to="/appointment"
          className="inline-block w-full text-center px-2 xl:px-2   py-2 text-sm font-semibold text-white bg-main rounded-full shadow-md transition-all duration-300 hover:from-main hover:to-blue-600 hover:shadow-lg"
        >
          {member?.isDoctor ? "Request Appointment" : "Inquiry Now"}
        </Link>
      </div>
    </div>
  </div>


);

TeamMemberCard.propTypes = {
  member: PropTypes.object.isRequired,
};

const OurTeam = () => {
  const dispatch = useDispatch();
  const { teamData, loading } = useSelector((state) => state.team);

  useEffect(() => {
    if (!teamData.length && !loading) {
      dispatch(fetchTeamData());
    }
  }, [dispatch, teamData, loading]);

  const doctors = teamData.filter((val) => val.isDoctor);
  const otherTeamMembers = teamData.filter((val) => !val.isDoctor);

  return (
    <section className="py-10 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        {/* Doctors Section */}
        <h2 className="text-3xl font-bold text-main mb-6 border-b-2 border-main pb-2">OUR TEAM</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} />) : doctors.map((member, i) => <TeamMemberCard member={member} key={i} />)}
        </div>

        {/* Other Team Members Section */}
        {/* <h2 className="text-3xl font-bold text-main mt-12 mb-6 border-b-2 border-blue-500 pb-2">OUR SPECIALIZED TEAM</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mt-4">
          {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} />) : otherTeamMembers.map((member, i) => <TeamMemberCard1 member={member} key={i} />)}
        </div>


      </div>
    </section>
  );
};

export default OurTeam;