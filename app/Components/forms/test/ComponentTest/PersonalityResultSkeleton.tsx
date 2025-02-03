import React from "react";

const PersonalityResultSkeleton = () => {
  return (
    <div className="animate-pulse bg-white mt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-6">
        <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
        </div>

        {/* Card Skeleton */}
        <div className="border border-gray-200 rounded-[8px] p-6 mb-6">
          <div className="h-6 w-48 bg-gray-300 rounded-[8px] mb-4"></div>
          <div className="h-4 w-96 bg-gray-300 rounded-[8px] mb-2"></div>
          <div className="h-4 w-80 bg-gray-300 rounded-[8px]"></div>
        </div>

        {/* Chart Skeleton */}
        <div className="border border-gray-200 rounded-[8px] p-6 mb-6">
          <div className="h-6 w-64 bg-gray-300 rounded-[8px] mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart Placeholder */}
            <div className="col-span-2 h-64 bg-gray-200 rounded-[8px]"></div>
            {/* Legend Placeholder */}
            <div className="space-y-4">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Traits Skeleton */}
        <div className="border border-gray-200 rounded-[8px] p-6 mb-6">
          <div className="h-8 w-64 bg-gray-300 rounded-[8px] mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-16 bg-gray-200 rounded-[8px]"></div>
              ))}
          </div>
        </div>

        {/* Strengths and Weaknesses Skeleton */}
        <div className="border border-gray-200 rounded-[8px] p-6 mb-6">
          <div className="h-6 w-64 bg-gray-300 rounded-[8px] mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-16 bg-gray-200 rounded-[8px]"></div>
              ))}
          </div>
        </div>
        <div className="space-y-6">
     <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
         {/* Recommended Careers Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-[8px]">
              <div className="h-6 w-48 bg-gray-300 rounded-[8px] mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded-[8px] mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded-[8px]"></div>
            </div>
          ))}
      </div>
     </div>

        <div className="mt-6 flex items-center justify-end  animate-pulse">
      {/* Page Info Skeleton */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[110px] h-5 bg-gray-100 rounded mx-3 text-gray-500 items-center justify-center"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex items-center space-x-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-8 w-8 bg-gray-200 rounded-[6px]"
          ></div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default PersonalityResultSkeleton;