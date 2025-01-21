"use client";

import React, { useState } from "react";
import { useGetJobQuery } from "@/app/redux/service/job";
import { useRouter } from "next/navigation";
import { JobDetailsProps } from "@/types/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

const JobDetailsComponent = ({ uuid }: JobDetailsProps) => {
  const [currentPage,] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const router = useRouter();

  // Fetch job data
  const { data, isLoading } = useGetJobQuery({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 mx-10 animate-pulse">
      {/* Top Section */}
      <div className="flex justify-between items-start gap-8 mt-8">
        <Skeleton className="h-32 w-40 rounded-xl" /> {/* Placeholder for Image */}
        <div className="flex flex-col space-y-3 w-full">
          <Skeleton className="h-8 w-3/4 rounded-lg" /> {/* Placeholder for Title */}
          <Skeleton className="h-6 w-1/4 rounded-lg" /> {/* Placeholder for Subtitle */}
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" /> {/* Placeholder for Button */}
      </div>
    
      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Skeleton className="h-8 w-44" /> {/* Placeholder for Job Industry */}
        <Skeleton className="h-8 w-44" /> {/* Placeholder for Salary */}
        <Skeleton className="h-8 w-44" /> {/* Placeholder for Job Type */}
        <Skeleton className="h-8 w-44" /> {/* Placeholder for Schedule */}
      </div>
    
      {/* Bottom Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3 rounded-lg" /> {/* Placeholder for Section Title */}
        <Skeleton className="h-20 w-full rounded-lg" /> {/* Placeholder for Description */}
      </div>
    </div>
    
    );
  }

  // Find the job with the matching UUID
  const job = data?.payload?.items.find((item) => item?.uuid === uuid);
  console.log("uuid: ", uuid);

  if (!job) {
    return <div className="p-6 text-center text-red-500">Job not found.</div>;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white">
      {/* Back Button */}
      <div className="mb-6 flex justify-end mx-4">
        <button
          onClick={() => router.back()}
          className="text-secondary font-medium hover:underline text-md"
        >
          &larr; Back
        </button>
      </div>

      {/* Job Header */}
      <div className="flex gap-6 items-center mb-4 mx-4" key={job.uuid}>
        <Avatar className="rounded-md w-32 h-32">
          <AvatarImage
            src={
              job.logo
                ? job.logo.startsWith("http")
                  ? job.logo
                  : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${job.logo}`
                : "/assets/placeholder.jpg"

            }
            alt={job.title || "Job Logo"}
            className="object-cover rounded-md w-full h-full"
          />
          <AvatarFallback className="rounded-md">
            {job.title[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-semibold text-primary">
            {job.title || "N/A"}
          </h1>
          <p className="text-gray-500 font-medium">{job.company_name || "N/A"}</p>
        </div>
        <div className="ml-auto">
          <Link
            href={job.website ? job.website : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-green-600 inline-block"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700 mb-6 mt-12 mx-8">
        <div>
          <p className="font-medium text-secondary">Job Industry</p>
          <p>{job.category || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-secondary">Salary</p>
          <p>{ "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-secondary">Job Type</p>
          <p>{job.job_type || "N/A"}</p>
        </div>
        {/* <div>
          <p className="font-medium text-secondary">Schedule</p>
          <p>{job. || "N/A"}</p>
        </div> */}
      </div>

      {/* Job Description */}
      <div className="bg-[#ECFFFA]/80 rounded-md p-4 mb-6 mt-12 mx-4 relative">
        <h2 className="absolute top-[-20px] left-4 bg-primary text-white px-6 py-2 rounded-md font-medium">
          Job Description
        </h2>
        <p className="mt-4 leading-relaxed text-textprimary">
          {job.description || "No description available."}
        </p>
      </div>

      {/* Job Responsibilities */}
      <div className="bg-[#ffdede]/40 rounded-md p-4 mb-12 mt-12 mx-4 relative">
        <h2 className="absolute top-[-20px] left-4 bg-accent text-white px-6 py-2 rounded-md font-medium">Job Responsibility</h2>
        <ul className="list-disc pl-5 space-y-2 text-textprimary mt-5">
          {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
            job.responsibilities?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No responsibilities listed.</li>
          )}
        </ul>
      </div>
      {/* Job requriement */}
      <div className="bg-yellow-100/30 rounded-md p-4 mb-12 mt-12 mx-4 relative">
        <h2 className="absolute top-[-20px] left-4 bg-yellow-400 text-white px-6 py-2 rounded-md font-medium">Job Requirments</h2>
        <ul className="list-disc pl-5 space-y-2 text-textprimary mt-5">
          {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
            job.requirements?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No requirments listed.</li>
          )}
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-orange-200/20 rounded-md p-4 mb-6 mx-4 relative">
        <h2 className="absolute top-[-20px] left-4 bg-secondary text-white px-6 py-2 rounded-md font-medium">
          Contact Information
        </h2>
        <p className="mt-6">
          <span className="font-medium text-textprimary">Location: </span>
          {job.location || "N/A"}
        </p>
        <div className="space-y-2 text-gray-700 flex gap-44 ">
          <div className="">

            <p>
              <span className="font-medium text-textprimary">Website: </span>
              <Link
                // href={`https://${job.website}` || "#"}
                href={job.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {job.website || "No Website"}
              </Link>


            </p>
            <p>
              <span className="font-medium text-textprimary">Facebook: </span>
              <Link
                href={job.facebook_url ? job.facebook_url : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {job.facebook_url || "N/A"}
              </Link>
            </p>
          </div>
          <div className="">
            <p>
              <span className="font-medium text-textprimary">Email: </span>
              <Link
                href={job.email ? `mailto:${job.email}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {job.email || "N/A"}
              </Link>
            </p>
            <p>
              <span className="font-medium text-textprimary">Phone Number: </span>
              <Link
                href={job.phone ? `tel:${job.phone}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {job.phone || "N/A"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsComponent;
