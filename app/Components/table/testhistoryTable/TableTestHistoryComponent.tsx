"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useGetTestHistoryQuery } from "@/app/redux/service/user";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineQuiz } from "react-icons/md";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

const TestHistoryTable = () => {
    const route = useRouter()
    const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null); // Status filter (null = no filter)

  // Convert status to boolean for API
  const isDraft = status === "Draft" ? true : status === "Done" ? false : undefined;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

    // Fetch data
    const { data, isLoading } = useGetTestHistoryQuery({
        page: currentPage,
        pageSize: itemsPerPage,
        search,
        is_draft: isDraft,
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
    const totalPages = data?.payload?.metadata?.total_pages || 0;
    const totalItems = data?.payload?.metadata?.total_items || 0;

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

    const statusClasses = {
        Done: "text-green-600 bg-green-100",
        Draft: "text-red-600 bg-red-100",
    };

    const filterTest = data?.payload?.tests || [];

    return (
        <div className="h-screen p-6 rounded-md">
            <div className="space-y-5 w-full h-full bg-white rounded-md p-6 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-semibold text-secondary">Test History </div>
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
                        <Select value={status || ""} onValueChange={setStatus}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Done">Done</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border border-gray-200 rounded-md">
                    {/* <ToastContainer /> */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-2">Avatar</TableHead>
                                <TableHead className="px-4 py-2">Username</TableHead>
                                <TableHead className="px-4 py-2">Test</TableHead>
                                <TableHead className="px-4 py-2">Status</TableHead>
                                <TableHead className="px-4 py-2">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Skeleton className="h-8 w-full" />
                                    </TableCell>
                                </TableRow>
                            ) :
                                filterTest.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filterTest.map((test, index) => (
                                        <TableRow key={index} className="border-t">
                                            {/* Avatar */}
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${test?.user_avatar}`}
                                                        alt={test?.user_name || "User"}
                                                    />
                                                    <AvatarFallback >
                                                        {test?.user_name[0]?.toUpperCase() || "?"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            {/* Username */}
                                            <TableCell className="px-4 py-2">
                                                <div>
                                                    <p className="font-medium text-md text-textprimary">{test?.user_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {test?.user_email}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            {/* Test Details */}
                                            <TableCell className="px-4 py-2">
                                                <div className="flex items-center gap-3">
                                                    {/* Rounded Icon */}
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-orange-500">

                                                        <MdOutlineQuiz className="text-white text-2xl" />

                                                    </div>
                                                    {/* Text Details */}
                                                    <div>
                                                        <p className="font-medium text-primary">{test?.test_name}</p>
                                                        <p className="font-medium text-gray-800">{test?.assessment_type_name}</p>
                                                        <p className="text-sm text-gray-500 text-normal">{test?.created_at}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            {/* Status */}
                                            <TableCell className="px-6 py-1">
                                                <span
                                                    className={`px-3 py-1.5 rounded-full text-sm font-normal border-green-600 ${test?.is_draft
                                                        ? statusClasses.Done
                                                        : statusClasses.Draft
                                                        }`}
                                                >
                                                    {test?.is_draft ? "Done" : "Draft"}
                                                </span>
                                            </TableCell>
                                            {/* Action */}
                                            <TableCell className="px-4 py-2">
                                                <button onClick={() => route.push(`/test-history/${test?.assessment_type_name}/${test?.test_uuid}`)} className="px-4 py-1 text-white bg-primary rounded-md hover:bg-green-500">
                                                    View
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Section */}
                <div className="flex justify-between items-center my-4">
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

                            <span className="text-sm font-medium text-gray-800">
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
};

export default TestHistoryTable;
