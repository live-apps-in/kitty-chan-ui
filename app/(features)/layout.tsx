"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import ProfileDropdown from "@/components/profile-dropdown";
import { LogOut } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { loading } = useAuth();

  const { userDetails } = useAppSelector((state) => state.authReducer.value);

  const { guildId } = useParams();

  const pathname = usePathname();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const baseUrl = `/dashboard/${guildId}`;

  const navigation = [
    {
      name: "Analytics",
      href: `${baseUrl}/analytics`,
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Greet",
      href: `${baseUrl}/greet`,
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Logger",
      href: `${baseUrl}/logger`,
      icon: FolderIcon,
      current: false,
    },
    {
      name: "Reaction Roles",
      href: `${baseUrl}/reaction-roles`,
      icon: CalendarIcon,
      current: false,
    },
    {
      name: "Language Filters",
      href: `${baseUrl}/language-filters`,
      icon: DocumentDuplicateIcon,
      current: false,
    },
    {
      name: "Portal",
      href: `${baseUrl}/portal`,
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Hands Free",
      href: `${baseUrl}/hands-free`,
      icon: ChartPieIcon,
      current: false,
    },
  ];

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push("/");
    }
  }, [loading, userDetails]);

  return (
    !loading &&
    userDetails && (
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5 bg-gray-800 hover:bg-gray-900 rounded-2xl"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {/* To close sidebar */}
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Mobile Sidebar*/}
                  <div className="flex grow bg-black flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex gap-2 h-16 shrink-0 items-center">
                      <img
                        className="h-16 w-auto"
                        src="/assets/images/kitty-chan-logo.png"
                        alt="kitty chan"
                      />
                      <p className="font-semibold">kitty chan</p>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    pathname.includes(item.href)
                                      ? "bg-purple-500/20 text-purple-300"
                                      : "text-gray-300 hover:text-white hover:bg-gray-900",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <p
                            onClick={() => {
                              dispatch(logOut());
                              router.push("/");
                            }}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer"
                          >
                            <LogOut
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Log Out
                          </p>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-black lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  px-6 pb-4">
            <div className="flex gap-2 h-16 shrink-0 items-center">
              <img
                className="h-16 w-auto"
                src="/assets/images/kitty-chan-logo.png"
                alt="kitty chan"
              />
              <p className="font-bold text-lg">kitty chan</p>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            pathname.includes(item.href)
                              ? "bg-purple-500/20 text-purple-300"
                              : "text-gray-300 hover:text-white hover:bg-gray-900",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <p
                    onClick={() => {
                      dispatch(logOut());
                      router.push("/");
                    }}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Logout
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64">
          {/* Dashboard Layout Navbar */}
          <div className="bg-black z-40 flex h-20 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {/* Button to open sidebar in mobile view */}
            <button
              type="button"
              className="-m-2.5 p-2.5  lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              {/* Separator - Desktop */}
              {/* <div className="block h-6 w-px bg-white" aria-hidden="true" /> */}

              {/* Profile dropdown */}
              {!loading && userDetails && (
                <ProfileDropdown userDetails={userDetails} />
              )}
            </div>
          </div>

          <main className="px-4 sm:px-6 lg:px-8 py-4  sm:mr-6 lg:mr-8 rounded-3xl bg-[#222327] min-h-screen">
            {children}
          </main>
        </div>
      </div>
    )
  );
}
