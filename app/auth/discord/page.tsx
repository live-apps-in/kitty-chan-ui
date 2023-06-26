'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function DiscordAuth() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

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
        Cookies.set('accessToken', accessToken, {
          expires: 7,
        });
        router.push('/all-guilds');
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && <h1>Loading! Please wait...</h1>;
}
