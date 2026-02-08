"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimalFilters } from "@/types/filter-types";

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

  const resetFilter = () => {
    setFilters({});
    // Trigger server-side update
    startTransition(() => {
      router.push(`${pageRoute || "/registry"}`);
    });
  };
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <select
        value={filters.species || ""}
        onChange={(e) => updateFilter("species", e.target.value)}
        className="p-2 rounded"
      >
        <option value="">All Species</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      <select
        value={filters.status || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="adoption">Adoption</option>
        <option value="found">Found</option>
        <option value="adopted">Aadopted</option>
      </select>

      <select
        value={filters.size || ""}
        onChange={(e) => updateFilter("size", e.target.value)}
        className="p-2 rounded"
      >
        <option value="">All Sizes</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <select
        value={filters.gender || ""}
        onChange={(e) => updateFilter("gender", e.target.value)}
        className="p-2 rounded"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unknown">Unknown</option>
      </select>

      <button className="underline" onClick={resetFilter}>
        Reset
      </button>
      {/* <select
        value={filters.age || ""}
        onChange={(e) => updateFilter("age", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Ages</option>
        <option value="puppy">Puppy/Kitten</option>
        <option value="adult">Adult</option>
        <option value="senior">Senior</option>
      </select> */}

      {isPending && <span className="ml-2 text-gray-500">Updating...</span>}
    </div>
  );
}
