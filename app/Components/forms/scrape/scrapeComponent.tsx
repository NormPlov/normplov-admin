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
import { useGetJobQuery } from "@/app/redux/service/job";
import { JobDetails } from "@/types/types";


const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function JobPreviewPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
   const router = useRouter();
 
   // Fetch job data
   const { data, isLoading } = useGetJobQuery({
     page: currentPage,
     pageSize: itemsPerPage,
   });
 
   // Data handling
   const jobs = data?.payload?.items || [];
   const totalPages = data?.payload?.metadata?.total_pages || 0;
   const totalItems = data?.payload?.metadata?.total_items || 0;
 

 
   // Pagination handlers
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
 
   // Actions
   const handleView = (uuid: string) => {
     router.push(`/jobs/viewJob/${uuid}`);
   };
 
   const handleEdit = (uuid: string) => {
     router.push(`/jobs/updateJob/${uuid}`);
   };
 
   const handleDelete = (uuid: string) => {
     router.push(`/jobs/deleteJob/${uuid}`);
   };
 
 // Filtered Jobs
   const filteredJobs = jobs.filter(
     (job: JobDetails) =>
       job.title.toLowerCase().includes(search.toLowerCase()) ||
       job.company_name.toLowerCase().includes(search.toLowerCase()) 
   );




  return (
    <div className="h-screen p-6 text-textprimary rounded-md mx-6">
      <h2 className="text-2xl font-normal text-secondary mb-6">Scrape Job</h2>
      {/* Scraping Input */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="https://example.com"
          className="w-full border rounded-md px-8 py-2 focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600">
          Scrape
        </button>
      </div>

      {/* Table Header */}
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
          <button onClick={() => { router.push("/jobs/addJob") }} className="bg-primary text-white px-5 py-2 rounded-md hover:bg-green-600">
            Add +
          </button>
        </div>
      </div>
      
        {/* Table */}
        <div className="rounded-md border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-600 text-sm font-semibold border-b">
                <TableHead className="px-10">Logo</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No jobs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job: JobDetails) => (
                  <TableRow key={job.uuid} className="hover:bg-gray-50">
                    {/* Logo */}
                    <TableCell>
                      <Avatar className="rounded-md w-16 h-16  flex justify-center items-center bg-gray-100">
                        <AvatarImage
                          src={job.logo}
                          alt={job.title || "Job Logo"}
                          className="object-cover rounded-md w-full h-full"
                        />
                        <AvatarFallback className="rounded-md">
                          {job.title[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    {/* Company */}
                    <TableCell>{job?.company_name || "N/A"}</TableCell>
                    {/* Category */}
                    <TableCell>{job?.category || "N/A"}</TableCell>
                    {/* Position */}
                    <TableCell>{job?.title || "N/A"}</TableCell>
                    {/* Closing Date */}
                    <TableCell>
                      {new Date(job.closing_date || "N/A").toLocaleDateString()}
                    </TableCell>
                    {/* Actions */}
                    <TableCell>
                      <DropdownPopup
                        onView={() => handleView(job?.uuid)}
                        onEdit={() => handleEdit(job?.uuid)}
                        onDelete={() => handleDelete(job?.uuid)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
          {/* Showing data */}
          <div className="text-sm font-medium mb-8">
            Showing data {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>

          <div className="flex gap-4">
            {/* Rows Per Page */}
            <div className="flex items-center gap-2 mb-8">
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

            {/* Pagination Controls */}
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

              <span className="text-sm">
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
  
      {/* Submit Button */}
      <div className="flex justify-end mb-6">
        <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-green-600 mb-10">
          Submit
        </button>
      </div>
    </div>
    

  );
}
