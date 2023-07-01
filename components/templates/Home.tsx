'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Header from '../common/Header';
import { useAppSelector } from '@/redux/store';

const Home = () => {
  const { loading } = useAuth();
  const { isAuth } = useAppSelector((state) => state.authReducer.value);

  return loading ? (
    <p>Loading Spinner...</p>
  ) : (
    <>
      <Header />
      <div className='flex h-screen items-center justify-center bg-[#08020a] text-white'>
        <div>
          <p className='pb-4 font-lilita text-7xl tracking-wide'>
            <span className='font-lilita'>K</span>ITTY CHAN BOT
          </p>
          <h4 className='pb-12 text-4xl'>
            Powerful Enough to Moderate <br /> your Discord server
          </h4>
          {!loading && isAuth ? (
            <Link
              href='/servers'
              className='rounded-xl bg-[#fce4a8] px-4 py-2 text-sm font-semibold text-black transition hover:border hover:border-[#fce4a8] hover:bg-transparent hover:text-white'
            >
              Add to Server
            </Link>
          ) : (
            <div className='group relative'>
              <div className='animate-tilt absolute -inset-0.5 h-14 w-56 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
              <button className='relative flex items-center rounded-lg bg-black px-7 py-4 leading-none'>
                <span className='text-purple-300 transition duration-200 group-hover:text-purple-100'>
                  <a
                    className='text-md font-semibold tracking-wider'
                    href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL}
                  >
                    Login with Discord
                  </a>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
