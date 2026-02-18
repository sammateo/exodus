import { redirect } from "next/navigation";
import { validate as validateUUID } from "uuid";
import { getAnimalDetailsWithPhotos } from "../action";
import { FaBalanceScaleLeft, FaDog } from "react-icons/fa";
import NavigationBar from "@/components/navigation/navigation-bar";
import Link from "next/link";
import { FaArrowLeftLong, FaRegCalendar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { MdOutlineCategory } from "react-icons/md";
import { BiSolidPyramid } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  //validate that slug is a uuid
  if (!validateUUID(slug)) {
    redirect("/registry");
  }

  const animal = await getAnimalDetailsWithPhotos(slug);
  if (!animal) {
    return <div></div>;
  }
  return (
    <section>
      <NavigationBar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div className="h-96">
            {animal.photos && animal.photos.length > 0 ? (
              <Image
                width={400}
                height={384}
                src={animal.photos[0].image_url}
                className="rounded object-cover h-full w-full"
                alt={`photo-${animal.name}`}
              />
            ) : (
              <FaDog className="h-full w-full mx-auto p-4 rounded object-cover bg-indigo-200" />
            )}
          </div>
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                {animal.name}{" "}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                  <IoMdCheckmarkCircleOutline className="-ms-1 me-1.5 size-4" />

                  <p className="text-sm whitespace-nowrap">{animal.status}</p>
                </span>
                {animal.status === "found" && (
                  <>
                    <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                      <FaRegCalendar className="-ms-1 me-1.5 size-4" />

                      <p className="text-sm whitespace-nowrap">
                        {animal.found_date}
                      </p>
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                      <GrLocation className="-ms-1 me-1.5 size-4" />

                      <p className="text-sm whitespace-nowrap">
                        {animal.found_location}
                      </p>
                    </span>
                  </>
                )}
              </div>
              <p className="mt-4 text-pretty text-gray-700">
                {animal.description}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
                <MdOutlineCategory className="size-6" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Species
              </h3>

              <p className="mt-2 text-pretty text-gray-700">{animal.species}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
                <BiSolidPyramid className="size-6" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Breed
              </h3>

              <p className="mt-2 text-pretty text-gray-700">{animal.breed}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
                <IoCalendarNumberOutline className="size-6" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">Age</h3>

              <p className="mt-2 text-pretty text-gray-700">{animal.age}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
                <FaBalanceScaleLeft className="size-6" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">Size</h3>

              <p className="mt-2 text-pretty text-gray-700">{animal.size}</p>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/registry"}>
        <Button className="mx-auto w-fit flex items-center gap-2">
          <FaArrowLeftLong />
          <span>Back to Registry</span>
        </Button>
      </Link>
    </section>
  );
};

export default page;
