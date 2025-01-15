import React from "react";
import { FaBook } from "react-icons/fa";

interface MajorCardProps {
  name: string;
  description: string;
  fee_per_year: number;
  duration_years: number;
  degree: string;
}

const MajorCard: React.FC<MajorCardProps> = ({
  name,
  description,
  fee_per_year,
  duration_years,
  degree,
}) => {
  return (
    <div className="h-auto w-full border border-grey-50 rounded-lg p-[15px] flex items-start gap-4">
      <FaBook className="text-5xl text-textprimary flex-shrink-0 mt-1" />
      <div className="w-full">
        <h1 className="font-bold text-textprimary w-full">{name}</h1>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-textprimary">
            ${fee_per_year.toLocaleString()} / year
          </div>
          <div className="text-primary font-bold">{degree}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Duration: {duration_years} years
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
