import { AnimalsPageProps } from "../registry/page";
import { getAnimalsWithPhotos } from "../registry/action";
import { DataTable } from "../../components/data-table/data-table";
import { columns } from "./columns";
import RegistryFilter from "@/components/registry/registry-filter";
import { Button } from "@/components/ui/button";
import NewAnimalForm from "@/components/dashboard/new-animal-form";

export default async function DashboardPage({
  searchParams,
}: AnimalsPageProps) {
  const queries = await searchParams;
  const filters = {
    species: queries?.species as string | undefined,
    status: queries?.status as
      | "adoption"
      | "found"
      | "adopted"
      | "reclaimed"
      | undefined,
    size: queries?.size as "small" | "medium" | "large" | undefined,
    gender: queries?.gender as "male" | "female" | "unknown" | undefined,
    age: queries?.age as string | undefined,
  };
  const animals = await getAnimalsWithPhotos(filters);
  // .flatMap((animal) =>
  //   Array(20)
  //     .fill(0)
  //     .map(() => ({ ...animal })),
  // );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Total animals: {animals?.length ?? 0}</p>
        </div>
        <div>
          <NewAnimalForm />
        </div>
      </div>
      <div className="mx-auto py-10">
        <RegistryFilter pageRoute="dashboard" />
        <DataTable columns={columns} data={animals} />
      </div>
    </div>
  );
}
