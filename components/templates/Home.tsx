'use client';
import React from 'react';
import LoginButton from '../elements/LoginButton';
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
            <Link href='/all-guilds' className='text-white'>
              Add to Server
            </Link>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
