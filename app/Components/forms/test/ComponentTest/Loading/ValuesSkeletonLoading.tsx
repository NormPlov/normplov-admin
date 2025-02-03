import React from "react";

const ValueSkeletonLoader = () => {
  return (
    <div className="animate-pulse max-w-7xl mx-auto p-4 md:p-10 lg:p-12 bg-white rounded-lg space-y-12">
      {/* Header Skeleton */}
      <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full flex space-y-2  bg-gray-100 h-24 items-center px-4 rounded-xl "
          >
            {/* Circular Progress Skeleton */}
            <div className="relative w-16 h-16 bg-gray-200 rounded-full">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            {/* Title Skeleton */}
            <div className="space-y-3 pl-2">
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                {/* Subtitle Skeleton */}
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
    </div>
      {/* Bar Chart Skeleton */}
     
      <div className="space-y-6">
      <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
      <div className="border border-gray-200 rounded-[8px] p-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart Placeholder */}
          <div className="col-span-2 h-80 bg-gray-200 rounded-md"></div>
          {/* Legend Placeholder */}
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
      
      {/* Value Details Skeleton */}
     <div className="space-y-6">
     <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
     <div className="bg-gray-100 p-8 rounded-[8px]">
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-[8px]">
              <div className="h-6 w-32 bg-gray-300 rounded-[8px] mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded-[8px]"></div>
            </div>
          ))}
      </div>
      </div>
     </div>

      {/* Growth Areas Skeleton */}
    <div className="space-y-6">
    <div className="h-12 w-52 bg-gray-300 rounded-[8px]"></div>
    <div className="bg-gray-100 p-8 rounded-[8px]">
     <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-[8px]">
              <div className="h-6 w-48 bg-gray-300 rounded-[8px] mb-2"></div>
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div key={idx} className="h-4 w-full bg-gray-300 rounded-[8px]"></div>
                  ))}
              </div>
            </div>
          ))}
      </div>
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
     <div>
     <div className="flex items-center justify-end  animate-pulse">
      {/* Page Info Skeleton */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[110px] h-5 bg-gray-300 rounded mx-3 text-gray-500 items-center justify-center"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex items-center space-x-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-8 w-8 bg-gray-300 rounded-[6px]"
          ></div>
        ))}
      </div>
    </div>
     </div>
    </div>
  );
};

export default ValueSkeletonLoader;