"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { deleteAnimal } from "@/app/dashboard/action";
import { Spinner } from "../ui/spinner";

const DeleteAnimalForm = ({
  animal_id,
  setDropdownMenuOpen,
}: {
  animal_id: string;
  setDropdownMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteAnimal = () => {
    startTransition(async () => {
      await deleteAnimal(animal_id);
      //close dialog
      setIsOpen(false);
      //close dropdown menu with options (view, update, delete)
      setDropdownMenuOpen(false);
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Delete animal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this animal?
          </DialogTitle>
          <DialogDescription>This action is irreversible.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" disabled={isPending}>
              Close
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteAnimal}
            disabled={isPending}
          >
            Delete animal
            {isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAnimalForm;
