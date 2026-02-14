import NavigationBar from "@/components/navigation/navigation-bar";
import RegistryCardAlt from "@/components/registry/registry-card-alt";
import RegistryFilter from "@/components/registry/registry-filter";
import { getAnimalsWithPhotos } from "./action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registry",
};

export interface AnimalsPageProps {
  searchParams?: Record<string, string | string[]>;
}

const page = async ({ searchParams }: AnimalsPageProps) => {
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

  return (
    <div>
      <NavigationBar />
      <section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Barbados RSPCA Registry
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              View pets available for adoption or those reported lost or found
              nearby.
            </p>
            <span>{animals?.length ?? 0} animal(s)</span>
          </header>
          <RegistryFilter />
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {animals &&
              animals.map((animal) => (
                <RegistryCardAlt key={animal.id} animal={animal} />
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
