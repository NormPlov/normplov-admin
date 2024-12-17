// "use client ";

// import React from "react";
// import UpdateJobForm from "@/app/Components/forms/job/UpdateJobs";
// import { useParams } from "next/navigation";

// const Page= () => {
//   const params = useParams(); // Retrieve parameters from the route
//   const { uuid } = params || {}; // Extract 'uuid' safely

//   // Ensure uuid is a string
//   const validUuid = Array.isArray(uuid) ? uuid[0] : uuid;

//   if (!validUuid) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Error: Job ID not provided or invalid.
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* <h2 className="text-3xl font-normal mb-6 mx-6 text-secondary">View Job Details</h2> */}
//       <UpdateJobForm uuid={validUuid} /> {/* Pass uuid as a prop */}
//     </div>
//   );
// };

// export default Page;
import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
