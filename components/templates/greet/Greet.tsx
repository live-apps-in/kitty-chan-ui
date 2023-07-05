'use client';
import { useAppSelector } from '@/redux/store';
import { GuildDto } from '@/types/AllGuilds';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Greet = () => {
  const [greet, setGreet] = useState<any>(null);
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

  console.log(currentGuild);
  console.log(greet);

  return (
    <div className='h-full text-white'>
      <h2>Greet</h2>
    </div>
  );
};

export default Greet;
