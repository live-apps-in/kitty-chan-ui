'use client';
import ToggleButton from '@/components/widgets/ToggleButton';
import { setGreet } from '@/redux/slices/greetSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { GuildDto } from '@/types/AllGuilds';
import { GreetDto } from '@/types/Greet';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Greet = () => {
  const [currentGuild, setCurrentGuild] = useState<GuildDto>();
  const [enabled, setEnabled] = useState(false);
  const [greetDetails, setGreetDetails] = useState<GreetDto>();

  const { currentGuildId, allGuilds } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const dispatch = useDispatch<AppDispatch>();

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
        Cookies.set('greet-details', JSON.stringify(data));
        dispatch(setGreet(data));
        setEnabled(data.isActive);
        setGreetDetails(data);
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

  async function updateGreet(isActive: boolean) {
    const greetData = { ...greetDetails, isActive };

    try {
      const { data, status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        greetData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status === 200) {
        Cookies.set('greet-details', JSON.stringify(data));
        dispatch(setGreet(data));
        setEnabled(data.isActive);
      }
    } catch (error) {
      console.log('Update Greet Error: ', error);
    }
  }

  return (
    <div className='h-screen text-white'>
      <p className='mb-6'>Choose the greet</p>
      <div className='flex items-center gap-2 mb-4'>
        <ToggleButton
          enabled={enabled}
          setEnabled={setEnabled}
          updateGreet={updateGreet}
        />
        <span className='text-sm'>
          Greet {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <ul className='flex flex-wrap items-center gap-6 '>
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
