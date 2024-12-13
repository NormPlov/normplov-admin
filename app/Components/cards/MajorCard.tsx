import React from "react";
import { FaBook } from "react-icons/fa";

const MajorCard = () => {
  return (
    <div className="h-[100px] w-[300px] border border-grey-50 rounded-lg p-[15px] flex items-center gap-4">
      <FaBook className="text-5xl text-textprimary" />
      <div className="w-full">
        <h1 className="font-bold text-textprimary w-full">
          វិទ្យាសាស្រ្តកុំព្យូទ័រ
        </h1>
        <div className="flex items-center justify-between">
          <div className=" text-textprimary">$400 - $1,200</div>
          <div className="text-primary font-bold">បរិញ្ញាបត្រ</div>
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
