import { loginWithGoogle, signout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";
import { IoMdMenu } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const NavigationBar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const links = [
    {
      label: "Registry",
      url: "/registry",
    },
    {
      label: "Report Found",
      url: "/report-animal",
    },
    {
      label: "Dashboard",
      url: "/dashboard",
      auth: true,
    },
  ];
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
              {links.map((link) => {
                if (!link.auth || user)
                  return (
                    <li key={link.label}>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href={link.url}
                      >
                        {" "}
                        {link.label}
                      </Link>
                    </li>
                  );
              })}
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
            <Sheet>
              <SheetTrigger asChild>
                <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <IoMdMenu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link className="block text-indigo-600" href="/">
                      <span className="sr-only">Home</span>
                      <img src={"/images/rspca_logo.jpg"} className="h-16" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Global" className="block md:hidden">
                  <ul className="flex flex-col items-start text-sm">
                    {links.map((link) => {
                      if (!link.auth || user)
                        return (
                          <li className="w-full" key={link.label}>
                            <Link
                              className="text-gray-500 transition hover:text-gray-500/75 block hover:bg-indigo-50 px-4 py-4 border-b-2 w-full"
                              href={link.url}
                            >
                              {" "}
                              {link.label}
                            </Link>
                          </li>
                        );
                    })}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
