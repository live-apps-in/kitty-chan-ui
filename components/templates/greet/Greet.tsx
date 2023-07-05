'use client';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Greet = () => {
  const [greet, setGreet] = useState<any>(null);

  const { currentGuildId } = useAppSelector(
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
    fetchGreet();
  }, []);

  console.log(greet);

  return <div className='h-full text-white'>Greet</div>;
};

export default Greet;
