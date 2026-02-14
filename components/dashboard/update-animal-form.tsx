"use client";
import { updateAnimal, UpdateAnimalActionState } from "@/app/dashboard/action";
import { Animal } from "@/types/data-types";
import Link from "next/link";
import { useActionState, useState } from "react";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { Button } from "../ui/button";
import DatePickerInput from "../ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import RequiredIndicator from "../ui/required-indicator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

const UpdateAnimalForm = ({ animal }: { animal: Animal }) => {
  const initial: UpdateAnimalActionState = {
    ...animal,
    update_photo: false,
    photo: undefined,
  };
  const animalId = animal.id;
  const updateAnimalWithId = updateAnimal.bind(null, animalId);
  const [state, formAction, pending] = useActionState(
    updateAnimalWithId,
    initial,
  );

  const [showFoundFields, setShowFoundFields] = useState<boolean>(false);
  const [showPhotoFields, setShowPhotoFields] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Animal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Animal</DialogTitle>
          <DialogDescription>Edit existing animal details</DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4"
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="animal-name">
                Name <RequiredIndicator />
              </FieldLabel>
              <Input
                name="animal-name"
                defaultValue={state.name || ""}
                placeholder="Name"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-species">
                Species <RequiredIndicator />
              </FieldLabel>
              <Input
                name="animal-species"
                placeholder="Species"
                defaultValue={state.species || ""}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-breed">
                Breed <RequiredIndicator />
              </FieldLabel>
              <Input
                name="animal-breed"
                placeholder="Breed"
                defaultValue={state.breed || ""}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-gender">
                Gender <RequiredIndicator />
              </FieldLabel>
              <Select
                name="animal-gender"
                defaultValue={state.gender || ""}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-age">
                Age <RequiredIndicator />
              </FieldLabel>
              <Input
                name="animal-age"
                placeholder="Age"
                defaultValue={state.age || ""}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-size">
                Size <RequiredIndicator />
              </FieldLabel>
              <Select
                name="animal-size"
                defaultValue={state.size || ""}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Size</SelectLabel>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="animal-status">
                Status <RequiredIndicator />
              </FieldLabel>
              <Select
                name="animal-status"
                defaultValue={state.status || ""}
                onValueChange={(value) => {
                  setShowFoundFields(value === "found");
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="adoption">Adoption</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                    <SelectItem value="adopted">Adopted</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="animal-update-photo">
                Update Photo?
              </FieldLabel>
              <Switch
                name="animal-update-photo"
                onCheckedChange={setShowPhotoFields}
                defaultChecked={state.update_photo || false}
              />
              <FieldDescription>
                <Link
                  className="flex items-center gap-2"
                  target="_blank"
                  href={`/registry/${animal.id}`}
                >
                  <span>view animal</span>
                  <CgArrowsExpandUpRight />
                </Link>
              </FieldDescription>
            </Field>
            {showPhotoFields && (
              <Field>
                <FieldLabel htmlFor="animal-photo">
                  Photo <RequiredIndicator />
                </FieldLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="animal-photo"
                  placeholder="Photo"
                  required
                />
              </Field>
            )}
            {showFoundFields && (
              <>
                <Field>
                  <FieldLabel htmlFor="animal-found-location">
                    Location Found
                    <RequiredIndicator />
                  </FieldLabel>
                  <Input
                    name="animal-found-location"
                    placeholder="Location Found"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="animal-found-date">
                    Date Found
                    <RequiredIndicator />
                  </FieldLabel>
                  <DatePickerInput name="animal-found-date" required />
                </Field>
              </>
            )}

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="animal-description">Description</FieldLabel>
              <Textarea
                className="resize-none"
                name="animal-description"
                placeholder="Description"
                defaultValue={state.description || ""}
              />
            </Field>

            <Field orientation="horizontal">
              <Button type="reset" variant="outline" disabled={pending}>
                Reset
              </Button>
              <Button type="submit" disabled={pending}>
                Submit
                {pending && <Spinner />}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAnimalForm;
