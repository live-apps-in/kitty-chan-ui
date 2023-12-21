"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AnalyticsDto } from "@/types/features/analytics";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsPage = () => {
  const { guildId } = useParams();

  const [analytics, setAnalytics] = useState<AnalyticsDto>();
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/analytics/overview`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );
      setAnalytics(data);
    } catch (error) {
      console.log(`Error fetching analytics: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  console.log(analytics);

  return (
    <>
      <p className="heading w-52 mb-6">Overview</p>
      <div className="flex items-center gap-4">
        <div className="p-6 w-64 shadow-md bg-[#0e0e0e] rounded-lg">
          <p className="font-semibold capitalize text-2xl bg-gradient-to-r from-purple-300 via-purple-200  to-purple-300  bg-clip-text text-transparent">
            Active members
          </p>
          {loading ? (
            <Skeleton className="w-[100px] h-[30px] mt-4 rounded-full" />
          ) : (
            <p className="text-5xl font-semibold mt-2">
              {analytics?.members.active}
            </p>
          )}
        </div>

        <div className="p-6 w-64 shadow-md bg-[#0e0e0e] rounded-lg ">
          <p className="font-semibold capitalize text-2xl bg-gradient-to-r from-purple-300 via-purple-200  to-purple-300 bg-clip-text text-transparent">
            Messages count
          </p>
          {loading ? (
            <Skeleton className="w-[100px] h-[30px] mt-4 rounded-full" />
          ) : (
            <p className="text-5xl font-semibold mt-2">
              {analytics?.messages.count}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
