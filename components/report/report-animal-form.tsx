"use client";
import React, { useActionState, useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import DatePickerInput from "../ui/date-picker";
import RequiredIndicator from "../ui/required-indicator";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AnimalReport } from "@/types/report-types";
import { reportAnimal } from "@/app/report-animal/action";
import { useSearchParams } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";

export interface CreateAnimalReportActionState extends Omit<
  AnimalReport,
  "id" | "created_at" | "updated_at"
> {
  photo: File | undefined;
}

const initialState: CreateAnimalReportActionState = {
  name: null,
  species: "",
  breed: null,
  gender: null,
  age: null,
  size: null,
  description: null,
  status: "pending",
  photo: undefined,
  report_type: "found",
  last_seen_location: null,
  last_seen_date: null,
  contact_name: null,
  contact_email: null,
  contact_phone: null,
};

const ReportAnimalForm = () => {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(
    reportAnimal,
    initialState,
  );

  const submission = searchParams.get("submission");
  if (submission === "true") {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md mx-auto text-center">
          <IoMdCheckmarkCircleOutline className="mx-auto size-20 text-indigo-700" />

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Report Submitted
          </h2>

          <p className="mt-4 text-pretty text-gray-700">
            Thank you for your submission, we have received it and an agent will
            review.
          </p>

          <Link
            href={"/"}
            className="mt-6 block w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const [showFoundFields, setShowFoundFields] = useState<boolean>(true);
  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Report Details</FieldLegend>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="report-type">
                  Report Type <RequiredIndicator />
                </FieldLabel>
                <Select
                  name="report-type"
                  defaultValue={state.gender || ""}
                  onValueChange={(value) => {
                    setShowFoundFields(value === "found");
                  }}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Report Type</SelectLabel>
                      <SelectItem value="found">Found</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-name">
                  Contact Name <RequiredIndicator />
                </FieldLabel>
                <Input
                  name="contact-name"
                  defaultValue={state.contact_name || ""}
                  placeholder="Contact Name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-email">
                  Contact Email <RequiredIndicator />
                </FieldLabel>
                <Input
                  name="contact-email"
                  type="email"
                  defaultValue={state.contact_email || ""}
                  placeholder="Contact Email"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-phone">
                  Contact Phone <RequiredIndicator />
                </FieldLabel>
                <Input
                  name="contact-phone"
                  type="tel"
                  defaultValue={state.contact_phone || ""}
                  placeholder="Contact Phone"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Animal Details</FieldLegend>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              {!showFoundFields && (
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
              )}

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
                <FieldLabel htmlFor="animal-photo">Photo</FieldLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  name="animal-photo"
                  placeholder="Photo"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="last-seen-location">
                  {showFoundFields ? "Location Found" : "Last Seen Location"}
                  <RequiredIndicator />
                </FieldLabel>
                <Input
                  name="last-seen-location"
                  placeholder={
                    showFoundFields ? "Location Found" : "Last Seen Location"
                  }
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-seen-date">
                  {showFoundFields ? "Date Found" : "Last Seen Date"}
                  <RequiredIndicator />
                </FieldLabel>
                <DatePickerInput name="last-seen-date" required />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="animal-description">
                  Description
                </FieldLabel>
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
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ReportAnimalForm;
