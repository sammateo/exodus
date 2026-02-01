import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const HomeFooter = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Barbados RSPCA
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-gray-500">
            Every report helps animals in need. Together with RSPCA, you can
            make a real difference — finding homes for pets and reuniting lost
            animals with their families.
          </p>

          <a
            href="#"
            className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white"
          >
            Get Started
          </a>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                {" "}
                Terms &amp; Conditions{" "}
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                {" "}
                Privacy Policy{" "}
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                {" "}
                Cookies{" "}
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Facebook</span>

                <FaFacebook className="size-6" />
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>

                <FaInstagram className="size-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
