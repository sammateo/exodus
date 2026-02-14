import { AnimalWithPhotos } from "@/types/data-types";
import React from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaDog } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const RegistryCardAlt = ({ animal }: { animal: AnimalWithPhotos }) => {
  return (
    <li>
      <a
        href={`/registry/${animal.id}`}
        className="block rounded-lg p-4 shadow-xs shadow-indigo-100"
      >
        {animal.photos && animal.photos.length > 0 ? (
          <img
            alt=""
            src={animal.photos[0].image_url}
            className="h-56 w-full rounded-md object-cover"
          />
        ) : (
          <FaDog className="h-56 w-full rounded-md bg-indigo-200 p-2 object-cover size-56 mx-auto" />
        )}
        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">species & breed</dt>

              <dd className="text-sm text-gray-500">
                {" "}
                {animal.species} | {animal.breed} | {animal.age} | {animal.size}
              </dd>
            </div>

            <div>
              <dt className="sr-only">name</dt>

              <dd className="font-medium">{animal.name}</dd>
            </div>
          </dl>
          <div>
            <p className="mt-2 min-h-[calc(2*1.25rem)] line-clamp-2 text-sm text-pretty text-gray-700">
              {animal.description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <IoMdInformationCircleOutline className="size-4 text-indigo-700" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Status</p>

                <p className="font-medium">{animal.status}</p>
              </div>
            </div>

            {animal.status === "found" && (
              <>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <FaRegCalendar className="size-4 text-indigo-700" />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Date Found</p>

                    <p className="font-medium">{animal.found_date}</p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <GrLocation className="size-4 text-indigo-700" />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Location Found</p>

                    <p className="font-medium">{animal.found_location}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </a>
    </li>
  );
};

export default RegistryCardAlt;
