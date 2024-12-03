"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import universityData from "@/lib/university.json";
import { DataTableRowActions } from "@/components/ui/actionbutton";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

type UniversityType = {
  logo: string;
  name: string;
  address: string;
  email: string;
};

const University = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(universityData.length / itemPerPage);
  const currentItems = universityData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-secondary text-2xl font-bold">All Universities</h1>
        <div className="flex items-center pr-4">
          {/* Search */}
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>

          {/* Select */}
          {/* <div className="pr-4">
            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  Royal University of Phnom Penh
                </SelectItem>
                <SelectItem value="dark">
                  Royal University of Fine Art
                </SelectItem>
                <SelectItem value="system">
                  Royal University of Law and Economic
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Add Button */}
          <Button asChild className="bg-primary">
            <Link href="university/create">
              <FaPlus />
              Add University
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
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
              <TableCell className="grid place-content-center">
                <DataTableRowActions row={university} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="grid place-content-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "font-bold" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default University;
