import React from "react";

type Props = {
  title: string;
  description: string;
  bgColor?: string; // Add a prop for background color
};

const StyledContentCard: React.FC<Props> = ({ title, description, bgColor }) => {
  return (
    <div className="p-4 rounded-lg">
      {/* Title */}
      <div
        className="inline-block px-3 py-2 rounded-[6px] text-white text-xl md:text-xl font-medium"
        style={{ backgroundColor: bgColor }}
      >
        {title}
      </div>

      {/* Description */}
      <p className="mt-4 text-md md:text-lg text-textprimary leading-relaxed">{description}</p>
    </div>
  );
};

export default StyledContentCard;
