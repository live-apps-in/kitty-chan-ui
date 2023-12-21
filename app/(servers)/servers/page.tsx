"use client";
import Navbar from "@/components/navbar";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GuildDto } from "@/types/server";

const ServersPage = () => {
  const { loading } = useAuth();

  const [guilds, setGuilds] = useState<GuildDto[]>([]);

  const { userDetails } = useAppSelector((state) => state.authReducer.value);

  const router = useRouter();

  const fetchGuilds = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setGuilds(data);
      console.log("Guilds", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push("/");
    } else {
      fetchGuilds();
    }
  }, [loading, userDetails]);

  return (
    !loading &&
    userDetails && (
      <div>
        <Navbar className="border-b" loading={loading} />
        <div className="grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12">
          <div className="col-span-3 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-2xl md:text-4xl font-bold ">Your Servers</p>
              <Image
                src="/assets/images/discord-avatar-2.png"
                width={350}
                height={350}
                alt="kitty chan"
                className="h-12 w-auto md:hidden"
              />
            </div>
            {guilds && (
              <ul className="col-span-3 space-y-4">
                {guilds?.map((guild: GuildDto) => (
                  <li
                    key={guild._id}
                    className="flex items-center shadow-sm even:shadow-purple-400 odd:shadow-yellow-400 p-4 rounded-lg"
                  >
                    <img
                      src={`${
                        guild.icon
                          ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png`
                          : "/assets/images/guild-default.png"
                      } 
`}
                      alt="avatar"
                      className="h-12 md:h-16 w-auto px-2 md:px-6 rounded-full"
                    />
                    <p className="font-semibold flex items-center w-full ">
                      {guild.name}
                    </p>
                    <Link href={`/dashboard/${guild.guildId}/analytics`}>
                      <Button className="float-right font-semibold">
                        Select Server
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Image
            src="/assets/images/discord-avatar-2.png"
            width={350}
            height={350}
            alt="kitty chan"
            className="hidden md:block sticky col-span-2 top-0"
          />
        </div>
      </div>
    )
  );
};

export default ServersPage;
