// "use client";

// import React, { useState } from "react";
// import { IoIosSearch } from "react-icons/io";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { AvatarFallback } from "@radix-ui/react-avatar";
// import DropdownPopup from "../../popup/ModalAction";
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { JobScrapeType, JobType } from "@/types/types";
// import { FiAlertCircle } from "react-icons/fi";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useScrapeMutation,
//   useGetScrapeQuery
//  } from "@/app/redux/service/scrape";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

// export default function JobPreviewPage() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [, setJobToDelete] = useState<JobScrapeType | null>(null)
//   const [url, setUrl] = useState("");

//   const router = useRouter();

//   // scrape job 
//   const [scrapeJob,{isError}] = useScrapeMutation()
//   if(isError){
//     return <div>Error...</div>
//   }
  

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!url) {
//       toast.warning("Please enter a valid URL!");
//       return;
//     }

//     try {
//       const result = await scrapeJob({ url }).unwrap();
//       console.log("Scraping successful:", result);
//       toast.success("Job scraped successfully!");
//     } catch (error) {
//       console.error("Error scraping job:", error);
//       toast.error("Failed to scrape the job. Please try again.");
//     }
//   };

 
//   // Fetch job data
//   const { data, isFetching,isLoading } = useGetScrapeQuery();
//   if (isFetching) {
//     return <div>Loading...</div>;
//   }

//   // Data handling
//   const scrape = data?.payload?.jobs || [];
//   const totalPages = data?.payload?.meta?.total_pages || 0;
//   const totalItems = data?.payload?.meta?.total_items || 0;

//   console.log("data: ", scrape)
  

//   const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();
  
//   const filteredJobs =
//     scrape.filter((item) => {
//       const matchesSearch =
//         item.company.toLowerCase().includes(normalizeString(search)) ||
//         item.title.toLowerCase().includes(normalizeString(search));


//       return matchesSearch ;
//     }) || [];

//   // Pagination handlers
//   const handleItemsPerPageChange = (value: string) => {
//     setItemsPerPage(Number(value));
//     setCurrentPage(1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   // Actions
//   const handleView = (uuid: string) => {
//     router.push(`/jobs/viewJob/${uuid}`);
//   };

//   const handleEdit = (uuid: string) => {
//     router.push(`/jobs/updateJob/${uuid}`);
//   };

//   const handleDeleteClick = (
//     job: JobScrapeType
//   ) => {
//     setJobToDelete(job);
//     setDeleteModalOpen(true); // Open modal before API call
//   };

//   const handleDeleteConfirm = async () => {
//     setDeleteModalOpen(false);
//     setJobToDelete(null);
//   };

//   return (
//     <div className="h-screen p-6 text-textprimary rounded-md mx-6">
//       <h2 className="text-2xl font-normal text-secondary mb-6">Scrape Job</h2>
//       <ToastContainer/>
//       {/* Scraping Input */}
//       <div className="flex items-center gap-4 mb-6">
//       <Input
//         type="text"
//         placeholder="https://example.com"
//         className="w-full border rounded-md px-8 py-2 focus:ring-2 focus:ring-blue-400"
//         value={url}
//         onChange={handleInputChange}
//       />
//         <Button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600">
//           Scrape
//         </Button>
//       </div>

//       {/* Table Header */}
//       <div className="flex justify-between items-center mb-4 mt-10">
//         <h2 className="text-2xl font-normal text-secondary">Preview Job</h2>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <button onClick={() => { router.push("/jobs/addJob") }} className="bg-primary text-white px-5 py-2 rounded-md hover:bg-green-600">
//             Add +
//           </button>
//         </div>
//       </div>
//  {/* Table */}
//  <div className="rounded-md border border-gray-200">
//           <Table>
//             <TableHeader>
//               <TableRow className="text-gray-600 text-sm font-semibold border-b">
//                 <TableHead>Logo</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Position</TableHead>
//                 <TableHead>Closing Date</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={6}>
//                     <Skeleton className="h-8 w-full" />
//                   </TableCell>
//                 </TableRow>
//               ) : filteredJobs.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center p-4 text-red-500 text-md">
//                     No jobs found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredJobs.map((job: JobScrapeType) => (
//                   <TableRow key={job.uuid} className="hover:bg-gray-50">
//                     {/* Logo */}
//                     <TableCell>
//                       <Avatar className="rounded-md w-16 h-16">
//                         <AvatarImage
//                           src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${job.logo}`}
//                           alt={job.title || "Job Logo"}
//                           className="object-cover rounded-md w-full h-full"
//                         />
//                         <AvatarFallback className="rounded-md">
//                           {job.company[0]?.toUpperCase() || "?"}
//                         </AvatarFallback>
//                       </Avatar>
//                     </TableCell>
//                     {/* Company */}
//                     <TableCell className="text-gray-700 font-medium">{job?.company || "N/A"}</TableCell>
//                     {/* Category */}
//                     <TableCell className="text-gray-700">{job?.category || "N/A"}</TableCell>
//                     {/* Position */}
//                     <TableCell className="text-gray-700">{job?.title || "N/A"}</TableCell>
//                     {/* Closing Date */}
//                     <TableCell className="text-gray-700">
//                       {new Date(job.closing_date || "N/A").toLocaleDateString()}
//                     </TableCell>
//                     {/* Actions */}
//                     <TableCell className="text-gray-700">
//                       <DropdownPopup
//                         onView={() => handleView(job?.uuid)}
//                         onEdit={() => handleEdit(job?.uuid)}
//                         onDelete={() => handleDeleteClick(job)}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         {/* Pagination Section */}
//         <div className="flex justify-between items-center mt-4">
//           {/* Showing data */}
//           <div className="text-sm font-medium mb-10 text-gray-500">
//             Showing data {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>

//           <div className="flex gap-4">
//             {/* Rows Per Page */}
//             <div className="flex items-center gap-2 mb-10">
//               <span className="text-sm font-medium">Rows per page:</span>
//               <Select value={`${itemsPerPage}`} onValueChange={handleItemsPerPageChange}>
//                 <SelectTrigger className="h-8 w-[70px]">
//                   <SelectValue placeholder={itemsPerPage} />
//                 </SelectTrigger>
//                 <SelectContent side="top">
//                   {ITEMS_PER_PAGE_OPTIONS.map((size) => (
//                     <SelectItem key={size} value={`${size}`}>
//                       {size}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex items-center gap-4 mb-10">
//               <Button
//                 variant="secondary"
//                 onClick={() => setCurrentPage(1)}
//                 disabled={currentPage <= 1}
//               >
//                 <ChevronsLeft className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant="secondary"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage <= 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>

//               <span className="text-sm font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <Button
//                 variant="secondary"
//                 onClick={handleNextPage}
//                 disabled={currentPage >= totalPages}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>

//               <Button
//                 variant="secondary"
//                 onClick={() => setCurrentPage(totalPages)}
//                 disabled={currentPage >= totalPages}
//               >
//                 <ChevronsRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//         {/* Delete Confirmation Modal */}
//         {isDeleteModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] text-center relative">
//               {/* Close Button */}
//               <button
//                 onClick={() => setDeleteModalOpen(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>

//               {/* Alert Icon */}
//               <div className="flex justify-center mb-4">
//                 <FiAlertCircle className="text-red-500 text-5xl" />
//               </div>

//               {/* Confirmation Message */}
//               <p className="text-gray-700 text-lg mb-6">
//                 Are you sure delete this job?
//               </p>

//               {/* Action Buttons */}
//               <div className="flex justify-center gap-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => setDeleteModalOpen(false)}
//                   className="border-gray-300 text-gray-700 hover:bg-gray-100"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleDeleteConfirm}
//                   className="bg-red-500 text-white hover:bg-red-600 px-6"
//                 >
//                   Yes
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      

//   );
// }

"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import DropdownPopup from "../../popup/ModalAction";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobScrapeType } from "@/types/types";
import { FiAlertCircle } from "react-icons/fi";
// import { Skeleton } from "@/components/ui/skeleton";
import { useScrapeMutation, useGetScrapeQuery } from "@/app/redux/service/scrape";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function JobPreviewPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [, setJobToDelete] = useState<JobScrapeType | null>(null);
  const [url, setUrl] = useState("");

  const router = useRouter();

  // Scrape job
  const [scrapeJob, { isError }] = useScrapeMutation();
  const { data, isFetching, isLoading, error } = useGetScrapeQuery({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) {
      toast.warning("Please enter a valid URL!");
      return;
    }

    try {
      const result = await scrapeJob({ url }).unwrap();
      console.log("Scraping successful:", result);
      toast.success("Job scraped successfully!");
    } catch (error) {
      console.error("Error scraping job:", error);
      toast.error("Failed to scrape the job. Please try again.");
    }
  };

  if (isFetching || isLoading) {
    return <div>Loading...</div>;
  }

  if (error || isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  // Data handling
  const scrape = data?.payload?.jobs || [];
  const totalPages = data?.payload?.meta?.total_pages || 0;
  const totalItems = data?.payload?.meta?.total_items || 0;
  console.log("data", scrape)

  const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();

  const filteredJobs =
    scrape.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(normalizeString(search)) ||
        item.title.toLowerCase().includes(normalizeString(search));
      return matchesSearch;
    }) || [];
console.log("fillterjob", filteredJobs)
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleView = (uuid: string) => {
    router.push(`/jobs/viewJob/${uuid}`);
  };

  const handleEdit = (uuid: string) => {
    router.push(`/jobs/updateJob/${uuid}`);
  };

  const handleDeleteClick = (job: JobScrapeType) => {
    setJobToDelete(job);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteModalOpen(false);
    setJobToDelete(null);
  };

  return (
    <div className="h-screen p-6 text-textprimary rounded-md mx-6">
      <h2 className="text-2xl font-normal text-secondary mb-6">Scrape Job</h2>
      <ToastContainer />

      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="https://example.com"
          className="w-full border rounded-md px-8 py-2 focus:ring-2 focus:ring-blue-400"
          value={url}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600">
          Scrape
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4 mt-10">
        <h2 className="text-2xl font-normal text-secondary">Preview Job</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-600 text-sm font-semibold border-b">
              <TableHead>Logo</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Closing Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4 text-red-500 text-md">
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job: JobScrapeType) => (
                <TableRow key={job.uuid} className="hover:bg-gray-50">
                  <TableCell>
                    <Avatar className="rounded-md w-16 h-16">
                      <AvatarImage
                        src={job.logo || "https://via.placeholder.com/150"}
                        alt={job.title || "Job Logo"}
                        className="object-cover rounded-md w-full h-full"
                      />
                      <AvatarFallback className="rounded-md">
                        {job.company[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-gray-700 font-medium">{job?.company || "N/A"}</TableCell>
                  <TableCell className="text-gray-700">{job?.category || "N/A"}</TableCell>
                  <TableCell className="text-gray-700">{job?.title || "N/A"}</TableCell>
                  <TableCell className="text-gray-700">
                    {job.closing_date ? new Date(job.closing_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    <DropdownPopup
                      onView={() => handleView(job?.uuid)}
                      onEdit={() => handleEdit(job?.uuid)}
                      onDelete={() => handleDeleteClick(job)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-medium mb-10 text-gray-500">
          Showing data {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-sm font-medium">Rows per page:</span>
            <Select value={`${itemsPerPage}`} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {ITEMS_PER_PAGE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage <= 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="secondary"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage >= totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] text-center relative">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="flex justify-center mb-4">
              <FiAlertCircle className="text-red-500 text-5xl" />
            </div>

            <p className="text-gray-700 text-lg mb-6">
              Are you sure delete this job?
            </p>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white hover:bg-red-600 px-6"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
