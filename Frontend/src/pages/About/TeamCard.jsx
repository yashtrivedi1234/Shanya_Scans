import { memo } from "react";
import { Link } from "react-router-dom";

const TeamMemberCard = memo(({ member }) => {
  const { imageUrl, name, specialty, degree } = member || {};

  return (
    <div className="group border-b-4 border-gray-800 hover:border-blue-500 transition-all duration-300 flex md:flex-row items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="flex-1 w-36 h-44 overflow-hidden rounded-lg shadow-md">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={name || "Team member"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 text-left">
        <div className="text-base font-semibold text-white">{name || "Unknown"}</div>
        <p className="text-sm font-medium text-gray-400">
          <span className="font-semibold text-gray-300">Head</span> - Department of {specialty || "N/A"}
        </p>
        <p className="text-sm text-gray-400 mt-2">{degree || "N/A"}</p>
        <Link to="/appointment" className="mt-4 block px-4 py-2 text-xs text-white bg-blue-600 hover:bg-blue-500 rounded-full cursor-pointer">
          Request Appointment
        </Link>
      </div>
    </div>
  );
});

export default TeamMemberCard;
