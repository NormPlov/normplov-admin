"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineLockOpen, HiOutlineLockClosed, HiOutlineTrash } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetAllUserQuery, useBlockUserMutation } from "@/app/redux/service/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function UserTable() {
  const [blockUser] = useBlockUserMutation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  // Fetch data
  const { data, isLoading } = useGetAllUserQuery({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // Metadata for pagination
  const totalPages = data?.payload?.metadata?.total_pages || 0;

  // Filter logic
  const filteredUsers =
    data?.payload?.users?.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && user.is_active) ||
        (filter === "inactive" && !user.is_active);
      return matchesSearch && matchesFilter;
    }) || [];

  const handleBlockClick = (username: string, uuid: string) => {
    blockUser(uuid);
    alert(`User "${username}" has been blocked.`);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <main className="h-screen p-6 text-textprimary rounded-md">
      <section className="space-y-5 w-full h-full bg-white rounded-md p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-normal text-secondary">All Users</h2>
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
                <TableHead>Gender</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.uuid}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${user.avatar}`}
                          alt={user?.username || "User"}
                        />
                        <AvatarFallback>
                          {user.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.gender || "N/A"}</TableCell>
                    <TableCell>{user.date_of_birth || "N/A"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.is_active ? "default" : "secondary"}
                        className={
                          user.is_active
                            ? "bg-emerald-500 text-white"
                            : "bg-red-100 text-red-500"
                        }
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              
                            >
                              {user.is_active ? (
                                <FaEye className="text-textprimary" />
                              ) : (
                                <FaEyeSlash className="text-textprimary" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {user.is_active ? "Block User" : "Unblock User"}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => handleBlockClick(user.username, user.uuid)}
                            >
                              {user.is_active ? (
                                <HiOutlineLockOpen className="text-red-500" />
                              ) : (
                                <HiOutlineLockClosed className="text-green-500" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {user.is_active ? "Block User" : "Unblock User"}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost">
                              <HiOutlineTrash className="text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete User</TooltipContent>
                        </Tooltip>

                        </TooltipProvider>
                      </div>
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
            <Select value={`${itemsPerPage}`} onValueChange={handleItemsPerPageChange}>
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
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
            <Button
              variant="outline"
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
