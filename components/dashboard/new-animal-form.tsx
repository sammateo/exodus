"use client";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useActionState, useState } from "react";
import { createAnimal, CreateAnimalActionState } from "@/app/dashboard/action";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import DatePickerInput from "../ui/date-picker";
import { Textarea } from "../ui/textarea";
import RequiredIndicator from "../ui/required-indicator";

const initialState: CreateAnimalActionState = {
  name: null,
  species: "",
  breed: null,
  gender: null,
  age: null,
  size: null,
  description: null,
  status: "adoption",
  found_location: null,
  found_date: null,
  is_public: false,
  photo: undefined,
};
const NewAnimalForm = () => {
  const [state, formAction, pending] = useActionState(
    createAnimal,
    initialState,
  );

  const [showFoundFields, setShowFoundFields] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Animal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Animal</DialogTitle>
          <DialogDescription>
            Submit the details for adding a new animal to the database
          </DialogDescription>
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
                id="animal-name"
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
            <Field>
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
              <FieldLabel htmlFor="animal-photo">Photo</FieldLabel>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="animal-photo"
                placeholder="Photo"
              />
            </Field>
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
              {/* <Input
                name="animal-description"
                placeholder="Description"
                defaultValue={state.description || ""}
              /> */}
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

export default NewAnimalForm;
