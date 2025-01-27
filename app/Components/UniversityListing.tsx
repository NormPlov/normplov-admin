"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
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
import { School } from "@/types/types";
import { useUniversityQuery } from "../redux/service/university";
import DropdownPopup from "./popup/ModalAction";
import { useRouter } from "next/navigation";
import { FiAlertCircle } from "react-icons/fi";
import { useDeleteUniversityMutation } from "../redux/service/university";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function UniversityListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const router = useRouter()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState<School | null>(null)

  const [deleteUniversity] = useDeleteUniversityMutation()

  const { data , isLoading} = useUniversityQuery({
    page: currentPage,
    size: itemsPerPage,
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

  const filteredUniversities: School[] = data?.payload?.schools?.filter((school: School) => {
    const matchesSearch = (school?.en_name ?? "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchFilter =
      filter === "all" ||
      (filter === "PRIVATE" && school?.type === "PRIVATE") ||
      (filter === "PUBLIC" && school?.type === "PUBLIC") ||
      (filter === "TVET" && school?.type === "TVET");

    return matchesSearch && matchFilter;
  }) || [];


  const universities = data?.payload?.schools || [];

  console.log("university:", universities);

  const handleDeleteClick = (university: School) => {
    setUniversityToDelete(university);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (universityToDelete) {
      try {
        console.log("uuid university:", universityToDelete.uuid)
        await deleteUniversity({ uuid: universityToDelete.uuid }).unwrap();
        setDeleteModalOpen(false);
        setUniversityToDelete(null);
      } catch (error) {
        console.error("Error deleting university:", error);
      }
    }
  };


  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-6">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-secondary">All Universities</h1>
        <div className="flex items-center space-x-4 text-textprimary">
          <div className="relative w-[370px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              aria-label="Search universities"
            />
          </div>
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PUBLIC">Public School</SelectItem>
              <SelectItem value="PRIVATE">Private School</SelectItem>
              <SelectItem value="TVET">TVET</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild className="bg-primary hover:bg-green-600">
            <Link href="majors-universities/create">
              <Plus className="mr-2 h-4 w-4" />
              Add University
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 text-textprimary ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Universities / Institute</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-left">Popular Major</TableHead>
              <TableHead className="text-right">School Type</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUniversities.map((school: School) => (
              <TableRow key={school?.uuid}>
                <TableCell>
                  <Avatar className="w-18 h-18">
                    <AvatarImage
                      width={1000}
                      height={1000}
                      src={
                        !school?.logo_url
                          ? "/assets/placeholder.png"
                          : school.logo_url.startsWith("http")
                            ? school.logo_url
                            : `${process.env.NEXT_PUBLIC_NORMPLOV_API}${school.logo_url}`
                      }

                      alt={`${school?.en_name || "University"} Logo`}
                      className="w-full h-full object-container "
                    />
                    <AvatarFallback className="text-gray-700">
                      {school?.en_name?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{school?.en_name || "N/A"}</TableCell>
                <TableCell>{school?.location || "N/A"}</TableCell>
                <TableCell className="text-left">
                  {school?.popular_major || "N/A"}
                </TableCell>
                <TableCell className="text-right">{school?.type || "N/A"}</TableCell>

                <TableCell className="text-gray-700">
                  <DropdownPopup
                    onView={() => router.push(`/majors-universities/${school?.uuid}`)}
                    onEdit={() => router.push(`/majors-universities/edit/${school?.uuid}`)}
                    onDelete={() => {
                      if (school?.is_recommended) {
                        toast.error("This school is recommended and cannot be deleted!", {
                          hideProgressBar: true
                        });
                      } else {
                        handleDeleteClick(school);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
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
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] text-center">
            <FiAlertCircle className="text-red-500 text-5xl mb-4 text-center mx-auto" />
            <p className="text-gray-700 text-lg mb-6">
              Are you sure you want to delete this university?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} className="bg-red-500 text-white hover:bg-red-600 px-6">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
