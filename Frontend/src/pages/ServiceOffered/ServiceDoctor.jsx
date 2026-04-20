import React, { useEffect } from "react";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamData } from "../../Redux/slice/teamSlice";
import doctor from '../../assets/home/doctor2.jpg';

const TeamMemberItem = ({ member }) => (
  <div className="cursor-pointer max-w-[20rem]">
    <img
      src={member?.doctorPhoto?.secure_url}
      alt={member?.doctorName}
      className=" h-auto w-full mx-auto"
    />
  	<div className="px-4 py-2 xl:px-6  border bg-[#F7F7F7] ">
      <h3 className="text-2xl font-medium mb-2">{member?.doctorName}</h3>
      <h6 className="font-medium">{member?.doctorDesination}</h6>
    </div>
  </div>
);

TeamMemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

const ServiceDoctor = ({data}) => {
  const dispatch = useDispatch();
  const { teamData, loading, error } = useSelector((state) => state.team);

  const fetchData = async () => {
    await dispatch(fetchTeamData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<section className="py-10 bg-white text-zinc-900 dark:text-black  ">
  <div className="max-w-5xl px-4 mx-auto flex items-center justify-center">
    <div
      className="flex flex-wrap items-center justify-center"
    >
      {data.slice(0, 3).map((member, i) => (
        <div className="flex flex-wrap items-center justify-center mx-auto" key={i}>
          <TeamMemberItem member={member} />
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default ServiceDoctor;
