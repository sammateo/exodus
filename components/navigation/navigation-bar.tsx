import { loginWithGoogle, signout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";
import { IoMdMenu } from "react-icons/io";

const NavigationBar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-indigo-600" href="/">
          <span className="sr-only">Home</span>
          <img src={"/images/rspca_logo.jpg"} className="h-16" />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/registry"
                >
                  {" "}
                  Registry{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="/report-animal"
                >
                  {" "}
                  Report Found{" "}
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/dashboard"
                  >
                    {" "}
                    Dashboard{" "}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <form className="sm:flex sm:gap-4">
              {!user && (
                <button
                  className="block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  formAction={loginWithGoogle}
                >
                  Login
                </button>
              )}

              {user && (
                <button
                  className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-600/75"
                  formAction={signout}
                >
                  Sign Out
                </button>
              )}
            </form>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <IoMdMenu className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
