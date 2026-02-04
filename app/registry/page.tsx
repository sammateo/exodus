import { getAnimalsWithPhotos } from "./action";
import { FaDog } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RegistryFilter from "@/components/registry/registry-filter";
import NavigationBar from "@/components/navigation/navigation-bar";
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
                <li key={animal.id}>
                  <a
                    href="#"
                    className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
                  >
                    <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                      <div className="sm:order-last sm:shrink-0">
                        {animal.photos && animal.photos.length > 0 ? (
                          <img
                            alt=""
                            src={animal.photos[0].image_url}
                            className="size-16 rounded-full object-cover sm:size-18"
                          />
                        ) : (
                          <FaDog className="size-16 rounded-full object-cover sm:size-18" />
                        )}
                      </div>

                      <div className="mt-4 sm:mt-0">
                        <h3 className="text-lg font-medium text-pretty text-gray-900">
                          {animal.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-700">
                          {animal.species} | {animal.breed}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {animal.age} | {animal.size}
                        </p>

                        <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                          {animal.description}
                        </p>
                      </div>
                    </div>

                    <dl className="mt-6 flex gap-4 lg:gap-6">
                      {animal.status === "found" && (
                        <div className="flex items-center gap-2">
                          <dt className="text-gray-700">
                            <span className="sr-only"> Published on </span>

                            <CiCalendar className="size-5" />
                          </dt>

                          <dd className="text-xs text-gray-700">
                            {animal.found_date}
                          </dd>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <dt className="text-gray-700">
                          <span className="sr-only"> Reading time </span>

                          <IoMdInformationCircleOutline className="size-5" />
                        </dt>

                        <dd className="text-xs text-gray-700">
                          {animal.status}
                        </dd>
                      </div>
                    </dl>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
