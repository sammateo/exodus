"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Animal } from "@/types/data-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
export const TOAST_POSITION = "top-center";
export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={"Name"} />;
    },
  },
  {
    accessorKey: "species",
    header: "Species",
  },
  {
    accessorKey: "breed",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={"Breed"} />;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={"Age"} />;
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={"Size"} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const animal = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(animal?.name || "");
                toast.success("name copied", {
                  position: TOAST_POSITION,
                });
              }}
            >
              Copy animal name
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => {
                toast.info("viewing animal", {
                  position: TOAST_POSITION,
                });
              }}
            >
              View animal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info("updating animal", {
                  position: TOAST_POSITION,
                });
              }}
            >
              Update animal
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                toast.error("deleting animal", {
                  position: TOAST_POSITION,
                });
              }}
            >
              Delete animal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
