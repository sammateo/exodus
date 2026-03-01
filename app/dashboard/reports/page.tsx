import RegistryFilter from "@/components/registry/registry-filter";
import NewAnimalForm from "@/components/dashboard/new-animal-form";
import { Metadata } from "next";
import { AnimalsPageProps } from "@/app/registry/page";
import { DataTable } from "@/components/data-table/data-table";
import { getAnimalReportsWithPhotos } from "./action";
import { columns } from "./columns";
export const metadata: Metadata = {
  title: "Reports",
};
export default async function ReportsPage({ searchParams }: AnimalsPageProps) {
  const queries = await searchParams;
  const filters = {
    species: queries?.species as string | undefined,
    status: queries?.status as "found" | "lost" | undefined,
    size: queries?.size as "small" | "medium" | "large" | undefined,
    gender: queries?.gender as "male" | "female" | "unknown" | undefined,
    age: queries?.age as string | undefined,
  };
  const animals = await getAnimalReportsWithPhotos(filters);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p>Total reports: {animals?.length ?? 0}</p>
        </div>
      </div>
      <div className="mx-auto py-10">
        <RegistryFilter
          initialFilters={filters}
          pageRoute="dashboard/reports"
        />
        <DataTable columns={columns} data={animals} />
      </div>
    </div>
  );
}
