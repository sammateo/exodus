"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimalFilters } from "@/types/filter-types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface AnimalFiltersProps {
  initialFilters?: AnimalFilters;
  pageRoute?: "registry" | "dashboard";
}

export default function RegistryFilter({
  initialFilters,
  pageRoute,
}: AnimalFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters || {});
  const [isPending, startTransition] = useTransition();
  const speciesRef = useRef<HTMLDivElement>(null);
  function updateFilter(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));

    // Trigger server-side update
    startTransition(() => {
      const searchParams = new URLSearchParams();
      Object.entries({ ...filters, [key]: value }).forEach(([k, v]) => {
        if (v) searchParams.set(k, v);
      });
      router.push(`/${pageRoute || "registry"}?${searchParams.toString()}`);
    });
  }

  useEffect(() => {
    //update filters if initial filters changes
    // happens on router.push with different params
    setFilters(initialFilters || {});
  }, [initialFilters]);

  const resetFilter = () => {
    // setFilters({
    //   species: undefined,
    // });
    // Trigger server-side update
    startTransition(() => {
      router.push(`${pageRoute || "/registry"}`);
    });
  };
  console.log(filters);
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Select
        onValueChange={(e) => updateFilter("species", e === "all" ? "" : e)}
        value={filters.species || "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Species" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup ref={speciesRef}>
            <SelectLabel>Species</SelectLabel>
            <SelectItem value="all">All Species</SelectItem>
            <SelectItem value="dog">Dog</SelectItem>
            <SelectItem value="cat">Cat</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => updateFilter("status", e === "all" ? "" : e)}
        value={filters.status || "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="adoption">Adoption</SelectItem>
            <SelectItem value="found">Found</SelectItem>
            <SelectItem value="adopted">Adopted</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => updateFilter("size", e === "all" ? "" : e)}
        value={filters.size || "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Sizes" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sizes</SelectLabel>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => updateFilter("gender", e === "all" ? "" : e)}
        value={filters.gender || "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Genders</SelectLabel>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={resetFilter}>
        Reset
      </Button>

      {isPending && <span className="ml-2 text-gray-500">Updating...</span>}
    </div>
  );
}
