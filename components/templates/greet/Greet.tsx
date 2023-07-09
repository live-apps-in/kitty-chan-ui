'use client';
import { useAppSelector } from '@/redux/store';
import { GuildDto } from '@/types/AllGuilds';
import { GreetDto } from '@/types/Greet';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Greet = () => {
  const [greet, setGreet] = useState<GreetDto | null>(null);
  const [currentGuild, setCurrentGuild] = useState<GuildDto>();

  const { currentGuildId, allGuilds } = useAppSelector(
    (state) => state.guildReducer.value
  );

  async function fetchGreet() {
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        setGreet(data);
        Cookies.set('greet-details', JSON.stringify(data));
      } else {
        setGreet(null);
      }
    } catch (error) {
      console.log('Greet Error: ', error);
    }
  }

  useEffect(() => {
    // Allow only guild_owner to access greet route
    const guilds = allGuilds?.filter(
      (guild: any) => guild.guildId === currentGuildId
    );
    setCurrentGuild(guilds?.[0]);
    if (currentGuild?.userRole === 'guild_owner') fetchGreet();
  }, [currentGuild]);

  return (
    <div className='h-screen text-white'>
      <p className='mb-6'>Choose the greet</p>
      <ul className='flex flex-wrap items-center gap-6'>
        <Link
          href={`/dashboard/${currentGuild?.guildId}/greet/welcome`}
          className='flex h-32 w-64 cursor-pointer  items-center justify-center rounded-md border-2 border-kittyTextGray bg-kittyNeutralBlack shadow-xl'
        >
          <h2 className='text-xl font-bold tracking-wider'>Welcome</h2>
        </Link>
        <Link
          href={`/dashboard/${currentGuild?.guildId}/greet/farewell`}
          className='flex h-32 w-64 cursor-pointer  items-center justify-center rounded-md border-2 border-kittyTextGray bg-kittyNeutralBlack shadow-xl'
        >
          <h2 className='text-xl font-bold tracking-wider'>Farewell</h2>
        </Link>
      </ul>
    </div>
  );
};

export default Greet;
