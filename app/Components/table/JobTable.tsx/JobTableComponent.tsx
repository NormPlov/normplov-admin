"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import DropdownPopup from "../../popup/ModalAction";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useGetJobQuery, useDeleteJobMutation } from "@/app/redux/service/job";
import { GetAllJobType } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FiAlertCircle } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function JobListTableComponent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<GetAllJobType | null>(null)
  const {toast} = useToast()

  const router = useRouter();

  const [deleteJob] = useDeleteJobMutation();

  // Fetch job data
  const { data, isLoading } = useGetJobQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        {/* <Skeleton className="h-10 w-56 rounded-lg mx-10 mt-8" />  */}
        <div className="flex justify-between items-center mt-8">
          <Skeleton className="h-10 w-44 rounded-lg mx-10 mt-8" />
          <Skeleton className="h-10 w-64 rounded-lg mr-10" />
        </div>
        {/* Table Section */}
        <div className="space-y-2 mx-10 bg-gray-100 rounded-md p-4">
          {/* Table Header */}
          <div className="grid grid-cols-5 py-2 ">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Table Rows */}

          <div className="grid grid-cols-5 items-center py-4 border-b ">
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-8 w-[900px] rounded-md" />
          </div>
        </div>
      </div>

    )
  }
  // Data handling
  const jobs = data?.payload?.items || [];
  const totalPages = data?.payload?.metadata?.total_pages || 0;
  const totalItems = data?.payload?.metadata?.total_items || 0;
  console.log("job table :", jobs)
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filteredJobs =
    jobs.filter((job) => {
      const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();

      const matchesJobs =
        job.company_name.toLowerCase().includes(normalizeString(search)) ||
        job.title.toLowerCase().includes(normalizeString(search));

      return matchesJobs;
    }) || [];

  // const filteredJobs = data.payload.items || [];

  // Actions
  const handleView = (uuid: string) => {
    router.push(`/jobs/viewJob/${uuid}`);
  };

  const handleEdit = (uuid: string) => {
    router.push(`/jobs/updateJob/${uuid}`);
  };

  const handleDeleteClick = (job: GetAllJobType) => {
    setJobToDelete(job);
    setDeleteModalOpen(true); // Open modal before API call
  };

  const handleDeleteConfirm = async () => {
    if (jobToDelete) {
      console.log("delete", jobToDelete)
      await deleteJob({ uuid: jobToDelete.uuid }); // Perform API call
      setDeleteModalOpen(false); // Close modal
      setJobToDelete(null); // Reset jobToDelete
      toast({
        description: "Job deleted successfully",
        variant: "default",
      })
    } else {
      toast({
        description: "No job selected for deletion",
        variant: "destructive",
      })
    }
  };


  return (
    <div className="h-screen p-6 rounded-md">
      <div className="space-y-5 w-full h-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="text-3xl font-semibold text-secondary">Jobs</div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-10 py-2 border rounded-md focus:border-primary/60 focus:primary/60"
              />
            </div>

            <Button
              onClick={() => router.push("/jobs/addJob")}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1"
            >
              Add <span className="text-xl">+</span>
            </Button>
          </div>
        </div>

        {/* Table */}
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-4 text-red-500 text-md">
                    No jobs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job: GetAllJobType) => (
                  <TableRow key={job.uuid} className="hover:bg-gray-50">
                    {/* Logo */}
                    <TableCell>
                      <Avatar className="rounded-md w-16 h-16">
                        <AvatarImage
                          src={
                            job.logo
                              ? job.logo.startsWith("https") // Check if the URL starts with 'http' or 'https'
                                ? job.logo // Use the original full URL
                                : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${job.logo}` // Prepend base URL if 'http' is missing
                              : "/assets/placeholder.png" // Fallback to placeholder if no logo
                          }
                          alt={job.title || "Job Logo"}
                          className="object-cover rounded-md w-full h-full"
                        />
                        <AvatarFallback className="rounded-md">
                          {job.company_name[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    {/* Company */}
                    <TableCell className="text-gray-700 font-medium">{job?.company_name || "Unknow Company"}</TableCell>
                    {/* Category */}
                    <TableCell className="text-gray-700">{job?.category || "Unknow Category"}</TableCell>
                    {/* Position */}
                    <TableCell className="text-gray-700">{job?.title || "Unknow Position"}</TableCell>
                    {/* Closing Date */}
                    <TableCell className="text-gray-700">
                      {new Date(job.closing_date || "N/A").toLocaleDateString()}
                    </TableCell>
                    {/* Actions */}
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
       {/* Pagination Section */}
       <div className="flex justify-between items-center mt-4">
          {/* Showing data */}
          <div className="text-sm font-medium text-gray-500">
            Showing data{" "}
            {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </div>

          <div className="flex gap-4">
            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                Rows per page:
              </span>
              <Select
                value={`${itemsPerPage}`}
                onValueChange={handleItemsPerPageChange}
              >
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
            <div className="flex items-center gap-4">
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

              <span className="text-sm font-medium text-gray-900">
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
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] text-center relative">
              {/* Close Button */}
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>

              {/* Alert Icon */}
              <div className="flex justify-center mb-4">
                <FiAlertCircle className="text-red-500 text-5xl" />
              </div>

              {/* Confirmation Message */}
              <p className="text-gray-700 text-lg mb-6">
                Are you sure delete this job?
              </p>

              {/* Action Buttons */}
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
    </div>
  );
}
