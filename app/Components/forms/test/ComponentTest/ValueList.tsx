import React from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2";

type Props = {
  title: string;
  points: { text: string; iconColor: string }[]; // Array of points with text and icon color
  bgColor?: string; // Background color for the container
};

const StyledContentList: React.FC<Props> = ({ title, points, bgColor }) => {
  return (
    <div className="p-4 rounded-lg" >
      {/* Title */}
      <div
        className="inline-block px-3 py-2 rounded-[6px] text-white text-xl md:text-xl font-medium"
        style={{ backgroundColor: bgColor }} // Green background for the title
      >
        {title}
      </div>


      {/* List of Points */}
      <ul className="mt-4 space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex md:items-center text-center gap-2 md:space-x-2">
            {/* Icon */}
            <HiOutlineCheckBadge
              className="w-5 h-5 md:w-6 md:h-6"
              style={{ color: point.iconColor }} // Dynamically set icon color
            />
            {/* Text */}
            <p className=" text-left text-md md:text-lg text-textprimary leading-relaxed">
              {point.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StyledContentList;
