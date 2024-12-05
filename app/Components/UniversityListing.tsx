"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
import universityData from "@/lib/university.json";
// import { UniversityType } from "../types/university";

type UniversityType = {
  logo: string;
  name: string;
  address: string;
  email: string;
};

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function UniversityListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolType, setSchoolType] = useState<string | undefined>();

  // Filter and sort the data
  const filteredData = universityData.filter((university: UniversityType) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">All Universities</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={schoolType} onValueChange={setSchoolType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
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

      <Table>
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
          {currentItems.map((university: UniversityType, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={university.logo}
                  alt={`${university.name} Logo`}
                  className="w-10 h-10 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{university.name}</TableCell>
              <TableCell>{university.address}</TableCell>
              <TableCell className="text-right">{university.email}</TableCell>
              <TableCell className="text-center">
                <DataTableRowActions row={university} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end mt-4">
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
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </main>
  );
}
