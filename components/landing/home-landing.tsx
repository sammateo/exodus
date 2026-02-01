import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaHome, FaSearchLocation } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbMessageReport } from "react-icons/tb";
import HowItWorks from "./how-it-works";

const HomeLanding = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
          Find, Report, or Adopt Animals Near You
        </h2>

        <p className="mt-4 text-lg text-pretty text-gray-700">
          Browse animals available for adoption, see lost and found pets in your
          area, or report a stray you've found — all in one easy-to-use platform
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <a
          className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent"
          href="#"
        >
          <span className="font-medium text-white transition-colors group-hover:text-indigo-600">
            View Animals for Adoption
          </span>

          <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600">
            <HiArrowNarrowRight className="size-5" />
          </span>
        </a>

        <a
          className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600"
          href="#"
        >
          <span className="font-medium transition-colors group-hover:text-white">
            {" "}
            Report a Found Animal{" "}
          </span>

          <span className="shrink-0 rounded-full border border-indigo-600 bg-white p-2">
            <HiArrowNarrowRight className="size-5" />
          </span>
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
            <FaHome className="size-6" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Adoptable Animals
          </h3>

          <p className="mt-2 text-pretty text-gray-700">
            Browse profiles of animals looking for a loving home. Find your new
            companion today.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
            <FaSearchLocation className="size-6" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Lost & Found
          </h3>

          <p className="mt-2 text-pretty text-gray-700">
            See animals reported as lost or found in your area, and help reunite
            them with their families.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
            <TbMessageReport className="size-6" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Report a Found Animal
          </h3>

          <p className="mt-2 text-pretty text-gray-700">
            Found a stray? Quickly submit the details and help us get them back
            to their owners.
          </p>
        </div>
      </div>

      <HowItWorks />
    </div>
  );
};

export default HomeLanding;
