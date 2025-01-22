"use client";

import React, { useState } from "react";
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
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../../popup/PopupViewProfile";
import { User } from "@/types/types";
import BlockUserModal from "../../popup/ConfrimBlock";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export default function UserTable() {
  const [Unblock] = useUnBlockUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Store the selected user data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  // Toastify Config
  const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // Fetch data
  const { data, isLoading } = useGetAllUserQuery({
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

  /// Pagination metadata
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

  // Filter logic
  const filteredUsers =
    data?.payload?.users?.filter((user) => {
      const normalizeString = (str: string) =>
        str.replace(/\s+/g, "").toLowerCase();
      const matchesSearch =
        user.username.toLowerCase().includes(normalizeString(search)) ||
        user.email.toLowerCase().includes(normalizeString(search));
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && user.is_active) ||
        (filter === "inactive" && !user.is_active);
      return matchesSearch && matchesFilter;
    }) || [];

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
            toast.success("User unblocked successfully", toastConfig);
          })
          .catch(() => {
            toast.error("Failed to unblock user", toastConfig);
          });
      } else {
        blockUser(selectedUser.uuid)
          .unwrap()
          .then(() => {
            toast.success("User blocked successfully", toastConfig);
          })
          .catch(() => {
            toast.error("Failed to block user", toastConfig);
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
            {/* Filter Select */}
            <Select value={filter} onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All" />
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
          <ToastContainer />
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
                      {user.gender || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-normal rounded-full text-center text-sm px-1 border ${
                          user.is_active
                            ? "bg-green-200 text-green-900 border-green-500"
                            : "bg-red-100 text-red-500 border-red-400"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
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
      </div>
      {/* Profile Modal */}
      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}

      {/* Block User Confirmation Modal */}
      {confirmModalOpen && selectedUser && (
        <BlockUserModal
        title={`Confirm ${selectedUser.is_blocked ? "unblock" : "block"} User`}
        message={`Are you sure you want to ${selectedUser.is_blocked ? "unblock" : "block"} this user?`}
        onConfirm={handleConfirmBlock}
        onCancel={()=> setConfirmModalOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
          // onConfirm={handleConfirmBlock}
          // onCancel={() => setConfirmModalOpen(false)}
          // actionType={selectedUser.is_blocked ? "unblock" : "block"}
        />
      )}
    </div>
  );
}
