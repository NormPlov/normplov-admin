"use client";

import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineLockOpen, HiOutlineLockClosed } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useGetAllUserQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
} from "@/app/redux/service/user";
import ProfileModal from "../../popup/PopupViewProfile";
import { User } from "@/types/types";
import BlockUserModal from "../../popup/ConfrimBlock";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function UserTable() {

  const { toast } = useToast()
  const [Unblock] = useUnBlockUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null); // Status filter (null = no filter)
  const [gender, setGender] = useState<string | null>(null);

  // Convert status to boolean for API
  const isActive = status === "active" ? true : status === "inactive" ? false : undefined;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Fetch data
  const { data, isLoading } = useGetAllUserQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search,
    is_active: isActive,
    gender: gender === "Other" ? "" : gender || undefined, 
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
 const totalItems = data?.payload?.metadata?.total || 0;

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

  const filteredUsers = data?.payload?.users || [];

  // handle view profile
  const handleViewProfileClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the modal
  };

  // Update to handle both block and unblock actions dynamically
  const handleBlockUserAction = (user: User) => {
    setSelectedUser(user);
    setConfirmModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (selectedUser) {
      if (selectedUser.is_blocked) {
        Unblock(selectedUser.uuid)
          .unwrap()
          .then(() => {
            toast({
              description: "User unblocked successfully",
              variant: "default"
            });
          })
          .catch(() => {
            toast({
              description: "Failed to unblock user",
              variant: "destructive"
            });
          });
      } else {
        blockUser(selectedUser.uuid)
          .unwrap()
          .then(() => {
            toast({
              description: "User blocked successfully",
              variant: "default"
            });
          })
          .catch(() => {
            toast({
              description: "Failed to block user",
              variant: "destructive"
            });
          });
      }
      setConfirmModalOpen(false);
    }
  };

  return (
    <div className="h-screen p-6 rounded-md">
      <div className="space-y-5 w-full h-full bg-white rounded-md p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-secondary">All Users</div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <IoIosSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-800 rounded-md" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-8 focus:border-primary"
              />
            </div>
            {/* Filter Select  Gender*/}
            <Select value={gender || ""} onValueChange={(value) => setGender(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Gender"  className="text-gray-300 text-sm"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Other" >Other</SelectItem>
              </SelectContent>
            </Select>
            {/* Filter Select */}
            <Select value={status || ""} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
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
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
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
                        <AvatarFallback className="text-gray-700">
                          {user.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-gray-700 text-medium">
                      {user.username || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-600 ">
                    {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Other"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-normal rounded-full text-center text-sm border ${user.is_active
                            ? "bg-green-200 text-green-900 border-green-500"
                            : "bg-red-100 text-red-500 border-red-400"
                          }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell className="flex">
                      <div className="flex items-center justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleViewProfileClick(user)}
                              >
                                <FaEye className="text-gray-700" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Profile</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => handleBlockUserAction(user)}
                              >
                                {user?.is_blocked ? (
                                  <HiOutlineLockClosed className="text-red-500" />
                                ) : (
                                  <HiOutlineLockOpen className="text-green-500" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user.is_blocked ? "Unblock User" : "Block User"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center my-4 ">
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
      {/* Profile Modal */}
      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Block User Confirmation Modal */}
      {confirmModalOpen && selectedUser && (
        <BlockUserModal
          title={`Confirm ${selectedUser.is_blocked ? "unblock" : "block"} User`}
          message={`Are you sure you want to ${selectedUser.is_blocked ? "unblock" : "block"} this user?`}
          onConfirm={handleConfirmBlock}
          onCancel={() => setConfirmModalOpen(false)}
          confirmText={selectedUser.is_blocked ? "Unblock" : "Block"}
          cancelText="Cancel"
        />
      )}
    </div>
  );
}
