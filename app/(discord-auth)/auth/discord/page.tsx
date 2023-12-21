"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "@/components/loader";

export default function DiscordAuth() {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const router = useRouter();

  const authenticateUser = async () => {
    try {
      setLoading(true);
      const {
        data: { accessToken },
        status,
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/auth/discord?code=${code}`
      );

      if (status === 200) {
        Cookies.set("accessToken", accessToken, {
          expires: 7,
        });
        router.push("/servers");
      }
      console.log(accessToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    loading && (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <Loader />
          <p className="mt-2 font-semibold text-sm">
            Launching kitty! Please wait...
          </p>
        </div>
      </div>
    )
  );
}
