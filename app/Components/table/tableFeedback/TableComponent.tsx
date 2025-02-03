"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useGetUserFeedbackQuery, usePromoteFeedbackMutation } from "@/app/redux/service/user";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function TableUserFeedback() {

  const { toast } = useToast()

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const [promote] = usePromoteFeedbackMutation();

  // Fetch feedback data
  const { data, isLoading } = useGetUserFeedbackQuery({
    page: currentPage,
    pageSize: itemsPerPage,
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
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-8 w-[900px] rounded-md" />
          </div>
        </div>
      </div>
    )
  }
  // Pagination metadata
  const totalPages = data?.payload?.feedbacks.metadata?.total_pages || 0;
  const totalItems = data?.payload?.feedbacks.metadata?.total_items || 0;

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


  // Filter logic
  const filteredUsers =
    data?.payload?.feedbacks.items?.filter((item) => {
      const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();

      const matchesSearch =
        item.username.toLowerCase().includes(normalizeString(search)) ||
        item.email.toLowerCase().includes(normalizeString(search));
      const matchesFilter =
        filter === "all" ||
        (filter === "promoted" && item.is_promoted) ||
        (filter === "not-promoted" && !item.is_promoted);
      return matchesSearch && matchesFilter;
    }) || [];


  // Handle promote feedback
  const handlePromote = async (uuid: string) => {
    console.log("uuid feedback", uuid);

    try {
      await promote({ uuid }).unwrap();
      toast({
        description:"Promote feedback successfully",
        variant: "default"
      });
    } catch (error) {
      console.error("Error promoting feedback:", error);
      toast({
        description: "Failed to promote feedback.", 
        variant: "destructive"
      });
    }
  };


  return (
    <div className="h-screen p-6 rounded-md">
      <div className="space-y-5 w-full h-full bg-white rounded-md p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-secondary">User Feedback</div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <IoIosSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-800 rounded-md" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-8 focus:border-primary"
              />
            </div>
            {/* Filter */}
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="promoted">Promoted</SelectItem>
                <SelectItem value="not-promoted">Not Promoted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-200 rounded-md">
         
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((item) => (
                  <TableRow key={item.feedback_uuid}>
                    {/* Avatar */}
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${item.avatar}`}
                          alt={item?.username || "User"}
                        />
                        <AvatarFallback className="text-gray-700">
                          {item.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    {/* Username */}
                    <div className="grid ">
                      <TableCell className="font-medium text-md text-textprimary">{item.username || "User"}</TableCell>
                      <TableCell className="font-normal text-gray-500">{item.email || "N/A"}</TableCell>

                    </div>
                    {/* Feedback */}
                    <TableCell className="text-gray-700 font-medium">{item.feedback || "No Feedback"}</TableCell>

                    {/* Promote Status */}
                    <TableCell>
                      <button>
                        {item.is_promoted ? (
                          <span className="px-4 py-1 text-xs font-medium text-green-800 bg-green-100 border-green-700 rounded-full">
                            Yes
                          </span>
                        ) : (
                          <span className="px-4 py-1 text-xs font-medium text-red-800 bg-red-100 border-red-300 rounded-full">
                            No
                          </span>
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handlePromote(item?.feedback_uuid)} className="bg-primary hover:bg-green-700 rounded-md py-1">Promote</Button>
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
            Showing data {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>

          <div className="flex gap-4">
            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
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

      </div>
    </div>
  );
}

