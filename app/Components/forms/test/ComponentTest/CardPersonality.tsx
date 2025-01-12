import React from "react";
import { BsClipboardCheck } from "react-icons/bs";

interface CardPersonalityProps {
  titleForCard: string; // The main title of the card
  name: string; // Personality name (e.g., ENTJ)
  title: string; // Personality type description (e.g., The Commander)
  description: string; // Long description of the personality
}

const CardPersonality = ({
  titleForCard,
  name,
  title,
  description,
}: CardPersonalityProps) => {
  return (
    <div className="pt-4 md:pt-8">
      {/* Title */}
      <div className="ml-4 lg:ml-0 p-2 flex items-center space-x-3 mb-4 border w-fit rounded-[8px] border-slate-100">
        <span className="bg-secondary p-2 rounded-[8px] text-white text-md md:text-xl">
          <BsClipboardCheck />
        </span>
        <h2 className="text-textprimary text-md md:text-xl">{titleForCard}</h2>
      </div>

      {/* Personality Name */}
      <div className="mx-4 lg:mx-0">
        <div className="flex space-x-10 items-center">
          <h1 className="text-3xl md:text-3xl lg:text-5xl text-primary font-extrabold">{name}</h1>
          <div className="border border-slate-100 rounded-[8px] p-2">
            <span className="text-secondary  text-xl md:text-3xl font-semibold">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mx-4 lg:mx-0 border border-slate-100 rounded-[8px] p-5 mt-5 md:mt-14">
        <h3 className="bg-primary text-white inline-block px-4 py-2 rounded-xl text-lg md:text-2xl font-medium mb-4">
          ការពិពណ៌នាពីបុគ្គលិកលក្ខណៈ
        </h3>
        <p className="text-textprimary font-extralight text-sm md:text-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardPersonality;
