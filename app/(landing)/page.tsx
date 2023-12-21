"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { DISCORD_OAUTH_URL } from "@/lib/constants";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";


export default function LandingPage() {
  const { loading } = useAuth();

  const { userDetails } = useAppSelector((state) => state.authReducer.value);

  return (
    <div className="bg-kitty-chan-bg bg-cover min-h-screen mx-auto max-w-[1920px]">
      <Navbar loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start py-16 md:py-24 gap-2 col-span-3">
          <h1 className="bg-yellow-100 text-gray-900 px-2 py-1 rounded-md text-sm mb-2">
            Who can resist a cute virtual kitty as your server buddy? 🐱
          </h1>
          <h2 className="text-4xl md:text-6xl font-extrabold font-hel">
            Your Fun and Helpful <br /> Discord Companion!
          </h2>
          <h4 className="text-lg md:text-xl font-semibold my-4">
            😽 Welcome to kitty chan!
          </h4>
          <p className="text-md md:text-lg max-w-5xl mb-6">
            Unleash the power of Kittychan, the perfect Discord bot designed to
            enhance your server experience. Whether youre a gaming community,
            study group, or just a bunch of friends hanging out, Kittychan is
            here to make your Discord server even more awesome.
          </p>
          {!loading && !userDetails ? (
            <Link href={DISCORD_OAUTH_URL}>
              <Button>Login with Discord</Button>
            </Link>
          ) : (
            <Link href="/servers">
              <Button>Add to Server</Button>
            </Link>
          )}
        </div>
        <div className="md:absolute right-24 place-self-center  -mt-28 -ml-10">
          <img
            src="/assets/images/kitty-chan-logo.png"
            alt="kitty chan"
            className="relative"
          />
        </div>
      </div>
    </div>
  );
}
