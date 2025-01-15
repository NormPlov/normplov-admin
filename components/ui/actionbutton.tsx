"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { School } from "@/types/types";
import { useDeleteUniversityMutation } from "@/app/redux/service/university";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataTableRowActionsProps {
  row: School;
  onDeleteSuccess: () => void;
}

export function DataTableRowActions({
  row,
  onDeleteSuccess,
}: DataTableRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUniversity, { isLoading: isDeleting }] =
    useDeleteUniversityMutation();

  const handleDelete = async () => {
    try {
      // await deleteUniversity(row.uuid).unwrap();
      onDeleteSuccess();
      setIsDeleteDialogOpen(false);
      toast.success("Delete successfully!");
    } catch (error) {
      console.error("Failed to delete university:", error);
      toast.error("Delete failed!");
      // Here you might want to show an error message to the user
    }
  };

  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/majors-universities/${row.uuid}`} className="text-textprimary">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/majors-universities/edit/${row.uuid}`} className="text-textprimary">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setIsDeleteDialogOpen(true)}
            className="text-danger"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-texprimary">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              university and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600"  onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
