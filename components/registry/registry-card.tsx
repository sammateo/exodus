import { AnimalWithPhotos } from "@/types/data-types";
import React from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaDog } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const RegistryCard = ({ animal }: { animal: AnimalWithPhotos }) => {
  return (
    <li>
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

            <p className="mt-4 min-h-[calc(2*1.5rem)] line-clamp-2 text-sm text-pretty text-gray-700">
              {animal.description}
            </p>
          </div>
        </div>

        <dl className="mt-6 flex gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <dt className="text-gray-700">
              <span className="sr-only"> Status </span>

              <IoMdInformationCircleOutline className="size-5" />
            </dt>

            <dd className="text-xs text-gray-700">{animal.status}</dd>
          </div>

          {animal.status === "found" && (
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-1">
                <dt className="text-gray-700">
                  <span className="sr-only"> Found on </span>

                  <CiCalendar className="size-5" />
                </dt>

                <dd className="text-xs text-gray-700">{animal.found_date}</dd>
              </div>
              <div className="flex items-center gap-1">
                <dt className="text-gray-700">
                  <span className="sr-only"> Location found </span>

                  <CiLocationOn className="size-5" />
                </dt>

                <dd className="text-xs text-gray-700">
                  {animal.found_location}
                </dd>
              </div>
            </div>
          )}
        </dl>
      </a>
    </li>
  );
};

export default RegistryCard;
