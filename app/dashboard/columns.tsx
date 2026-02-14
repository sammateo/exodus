"use client";

import DeleteAnimalForm from "@/components/dashboard/delete-animal-form";
import UpdateAnimalForm from "@/components/dashboard/update-animal-form";
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
import { redirect } from "next/navigation";
import { useState } from "react";
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
      const [isOpen, setIsOpen] = useState(false);
      return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem
              onClick={() => {
                redirect(`/registry/${animal.id}`);
              }}
              className="text-center"
            >
              View animal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info("updating animal", {
                  position: TOAST_POSITION,
                });
              }}
              asChild
            >
              <UpdateAnimalForm animal={animal} />
              {/* Update animal */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" asChild>
              <DeleteAnimalForm
                animal_id={animal.id}
                setDropdownMenuOpen={setIsOpen}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
