"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserFeedbackQuery } from "@/app/redux/service/user";

import { Feedback, FeedbackResponse } from "@/types/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function TableUserFeedback() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  // Fetch data
  const { data, isLoading } = useGetUserFeedbackQuery({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // Extract data from API response
  const feedbackResponse = data as FeedbackResponse | undefined;
  const feedbacks = feedbackResponse?.payload[0] || [];
  const metadata = feedbackResponse?.payload[1];
  const totalPages = metadata?.total_pages || 1;

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page changes
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <main className="h-screen p-6 text-textprimary rounded-md">
      <section className="space-y-5 w-full h-full bg-white rounded-md p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-normal text-secondary">User Feedback</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <IoIosSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-800 rounded-md" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-8"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-32 border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <section className="rounded-md border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Promoted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ) : feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((feedback: Feedback) => (
                  <TableRow key={feedback.feedback_uuid}>
                    <TableCell>
                    <Avatar>
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${feedback.avatar}`}
                          alt={feedback?.username || "Profile User"}
                        />
                        <AvatarFallback>
                          {feedback.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="grid ">
                      <span className="text-md">{feedback.username}</span>
                      <span className="text-sm text-gray-400">{feedback.email}</span>
                      </TableCell>
                    <TableCell className="line-camp-2">{feedback.feedback}</TableCell>
                    <TableCell>{feedback.created_at}</TableCell>
                    <TableCell className="flex justify-center items-center mt-1.5">
                      {feedback.is_promoted ? (
                        <span className="px-4 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          Yes
                        </span>
                      ) : (
                        <span className="px-4 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                          No
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>

        {/* Pagination */}
        <section className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${itemsPerPage}`}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {ITEMS_PER_PAGE_OPTIONS.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
