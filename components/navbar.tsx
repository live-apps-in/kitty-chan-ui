"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { DISCORD_OAUTH_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import Loader from "./loader";
import ProfileDropdown from "./profile-dropdown";

const Navbar = ({
  className,
  loading,
}: {
  className?: string;
  loading: boolean;
}) => {
  const { userDetails } = useAppSelector((state) => state.authReducer.value);

  return (
    <nav
      className={cn(
        "flex justify-between py-4 shadow-md px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <Link href="/" className="flex items-center gap-1 md:gap-3">
        <img
          src="/assets/images/kitty-chan-logo.jpg"
          alt="kitty chan"
          className="rounded-full h-12 md:h-12 w-auto"
        />
        <h2 className="font-extrabold text-xl md:text-2xl">kitty chan</h2>
      </Link>

      {loading && !userDetails && <Loader />}

      {!loading && !userDetails && (
        <Button size={"sm"}>
          <Link href={DISCORD_OAUTH_URL}>Login with Discord</Link>
        </Button>
      )}

      {!loading && userDetails && <ProfileDropdown userDetails={userDetails} />}
    </nav>
  );
};

export default Navbar;
