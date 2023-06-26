'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Header from '../common/Header';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import { GuildDto } from '@/types/AllGuilds';
import Link from 'next/link';

const AllGuilds = () => {
  const { loading } = useAuth();
  const [guilds, setGuilds] = useState<GuildDto[]>([]);

  const userDetails = useAppSelector(
    (state) => state.authReducer.value.userDetails
  );

  const router = useRouter();

  const fetchGuilds = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );
      setGuilds(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push('/');
    } else {
      fetchGuilds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userDetails]);

  return (
    userDetails && (
      <div className='h-screen w-full bg-[#08020a]'>
        <Header />
        {/* Servers */}
        <h2 className='my-8 text-center text-4xl font-bold text-white'>
          Choose a Server
        </h2>
        <div className='mx-auto flex flex-wrap items-center justify-around lg:max-w-4xl'>
          {guilds?.map((guild: GuildDto) => (
            <div key={guild._id} className='cursor-pointer space-y-4'>
              <Image
                src={`${
                  guild.icon
                    ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png`
                    : '/assets/images/guild-default-icon.jpg'
                } 
`}
                alt={guild.name}
                width={500}
                height={500}
                className='h-44 w-44 rounded-xl'
              />
              <h2 className='font-semibold text-white'>{guild.name}</h2>
              <Link href={`/dashboard/${guild.guildId}`}>
                <button className='mt-2 rounded-lg bg-gray-600 px-4 py-2 text-white'>
                  Add
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default AllGuilds;
