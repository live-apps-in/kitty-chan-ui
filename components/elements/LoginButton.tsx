import React from 'react';

const LoginButton = () => {
  return (
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
  );
};

export default LoginButton;
