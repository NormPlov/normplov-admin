
"use client"

import React, { useEffect, useState } from "react";
import UpdateJobForm from "@/app/Components/forms/job/UpdateJobs";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams(); // Retrieve parameters from the route
  const { uuid } = params || {}; // Extract 'uuid' safely

  // Ensure uuid is a string
  const validUuid = Array.isArray(uuid) ? uuid[0] : uuid;

  const [isUuidValid, setIsUuidValid] = useState<boolean>(!!validUuid);

  useEffect(() => {
    if (!validUuid) {
      console.error("Error: Job ID not provided or invalid.");
      setIsUuidValid(false);
    } else {
      setIsUuidValid(true);
      // Example: Fetch job details using the uuid
      console.log(`Fetching job details for UUID: ${validUuid}`);
      // You can call an API here or trigger other side effects
    }
  }, [validUuid]);

  if (!isUuidValid) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: Job ID not provided or invalid.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-normal my-6 mx-10 text-secondary">View Job Details</h2>
      <UpdateJobForm uuid={validUuid} /> 
    </div>
  );
};

export default Page;
