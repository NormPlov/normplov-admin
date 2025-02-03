'use client'
import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"; // Icons for pagination
// import * as Select from '@radix-ui/react-select'; // Import Radix Select properly
import Button from './ButtonPagination'; // Assuming Button is a reusable component

// const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20]; // Options for "Rows per page"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (size: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  // itemsPerPage,
  // setItemsPerPage,
}: PaginationProps) => {
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle "rows per page" change
  // const handleItemsPerPageChange = (newValue: string) => {
  //   setItemsPerPage(parseInt(newValue, 10));
  //   setCurrentPage(1); // Reset to first page on page size change
  // };

  return (
    <div className="flex items-center justify-end mt-4">
      {/* <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select.Root value={`${itemsPerPage}`} onValueChange={handleItemsPerPageChange}>
          <Select.Trigger className="h-8 w-[70px] bg-blue-200 rounded border border-gray-300 px-2 text-sm">
            <Select.Value placeholder={`${itemsPerPage}`} />
          </Select.Trigger>
          <Select.Content className="bg-white border rounded shadow-lg">
            <Select.Viewport>
              {ITEMS_PER_PAGE_OPTIONS.map((pageSize) => (
                <Select.Item
                  key={pageSize}
                  value={`${pageSize}`}
                  className="px-3 py-1 cursor-pointer hover:bg-gray-200 text-sm"
                >
                  <Select.ItemText>{pageSize}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div> */}

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] text-gray-500 items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-1.5 rounded-[6px]"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4 text-gray-500" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1.5 rounded-[6px]"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1.5 rounded-[6px]"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4 text-gray-500" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-1.5 rounded-[6px]"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

