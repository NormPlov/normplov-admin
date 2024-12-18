"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  // ChevronLeft,
  // ChevronRight,
  // ChevronsLeft,
  // ChevronsRight,
} from "lucide-react";
import { FaPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableRowActions } from "@/components/ui/actionbutton";
import { useUniversityQuery } from "../redux/service/university";
import { SchoolsType, UniversityType } from "@/types/types";
import Image from "next/image";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function UniversityListing() {
  const [currentPage] = useState(1);
  const [pageSize] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  const { data, refetch } = useUniversityQuery({
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, refetch]);

  // const totalItems = data?.payload?.metadata?.total_items || 0;
  // const totalPages = Math.ceil(totalItems / pageSize);

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  // const handlePageSizeChange = (value: string) => {
  //   const newSize = Number(value);
  //   setPageSize(newSize);
  //   setCurrentPage(1); // Reset to the first page when changing page size
  //   refetch();
  // };

  const universities = data?.payload?.schools || [];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">All Universities</h1>
        <div className="flex items-center space-x-4 text-textprimary">
          <div className="relative ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="public">Public School</SelectItem>
              <SelectItem value="private">Private School</SelectItem>
              <SelectItem value="tvet">TVET</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild className="bg-primary">
            <Link href="majors-universities/create">
              <FaPlus className="mr-2" />
              Add University
            </Link>
          </Button>
        </div>
      </div>

     <div className="rounded-md border border-gray-200 text-textprimary">
     <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Universities / Institute</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.map((school: SchoolsType) => (
            <TableRow key={school.id}>
              <TableCell>
                <Image width={1000} height={1000}
                  src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${school.logo_url}` || "/placeholder.svg?height=40&width=40"}
                  alt={`${school.en_name || "University"} Logo`}
                  className="w-10 h-10 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">
                {school.en_name || "N/A"}
              </TableCell>
              <TableCell>{school.location || "N/A"}</TableCell>
              <TableCell className="text-right">
                {school.email || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                  <DataTableRowActions row={school as UniversityType} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </div>

      {/* <div className="flex items-center justify-end mt-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {ITEMS_PER_PAGE_OPTIONS.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}


        {/* <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

  );
}
