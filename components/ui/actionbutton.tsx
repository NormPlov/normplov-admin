"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type UniversityType = {
  logo: string;
  name: string;
  address: string;
  email: string;
};

interface DataTableRowActionsProps {
  row: UniversityType;
}

export function DataTableRowActions({ }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <div className="text-primary">
            <FaEye />
          </div>
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="text-warning">
            <FaEdit />
          </div>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="text-danger">
            <FaTrash />
          </div>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
