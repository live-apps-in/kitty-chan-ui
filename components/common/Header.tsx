import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AppDispatch, useAppSelector } from '@/redux/store';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/slices/authSlice';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'About', href: '#' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);

  const { userDetails, isAuth } = useAppSelector(
    (state) => state.authReducer.value
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className='border-b-2 border-b-purple-500/10 bg-[#08020a]'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-2'
        aria-label='Global'
      >
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            className='h-16 w-auto rounded-full'
            src='/assets/images/kitty-chan-logo.jpg'
            alt='kitty chan logo'
            width={500}
            height={500}
          />
          <div className='text-2xl tracking-widest text-white'>
            <p className='-mb-2 font-lilita'>KITTY</p>
            <p className='font-lilita'>CHAN</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-white'
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className='relative flex items-center gap-2'>
          {/* Mobile menu open Btn */}
          <div className='mr-3 flex lg:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className='h-6 w-6 text-white' aria-hidden='true' />
            </button>
          </div>

          {/* User Details */}
          {!isAuth ? (
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL}
              className='rounded-lg bg-purple-700 px-4 py-2 text-white'
            >
              Login With Discord
            </a>
          ) : (
            <div
              onClick={() => setDropDownMenuOpen(!dropDownMenuOpen)}
              className='flex cursor-pointer items-center gap-2'
            >
              <p className='hidden font-semibold text-white lg:flex'>
                {userDetails?.discord.username}
              </p>
              <Image
                src={`${
                  isAuth
                    ? `https://cdn.discordapp.com/avatars/${userDetails?.discord.id}/${userDetails?.discord.avatar}.png`
                    : '/assets/images/user-avatar.png'
                } 
`}
                alt={userDetails?.discord.global_name || 'User Avatar'}
                className='h-auto w-12 rounded-full'
                width={500}
                height={500}
              />
              <ChevronDownIcon className='h-5 w-auto text-white' />
            </div>
          )}

          {dropDownMenuOpen && (
            <div className='absolute right-0 top-14 z-10 mt-2.5 w-52 origin-top-right rounded-md bg-kittyDarkGray p-2 text-gray-400 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
              <ul className='w-full text-sm'>
                <li className='space-y-1 border-b border-gray-700 px-2 py-3 text-gray-300'>
                  <p>{userDetails?.discord.global_name}</p>
                  <p className='text-xs'>
                    {`${userDetails?.discord.username}#${userDetails?.discord.discriminator}`}
                  </p>
                </li>
                <Link href='/servers'>
                  <li className='my-2 w-full rounded-xl px-2 py-3 hover:bg-kittyNeutralBlack hover:text-white'>
                    Servers
                  </li>
                </Link>
                <div className='h-[1px] w-full bg-gray-700' />
                <li
                  onClick={() => {
                    dispatch(logOut());
                    setDropDownMenuOpen(false);
                  }}
                  className='my-2 w-full cursor-pointer px-2 py-3 hover:rounded-xl hover:bg-kittyNeutralBlack hover:text-white '
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#08020a] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                className='h-16 w-auto rounded-full'
                src='/assets/images/kitty-chan-logo.jpg'
                alt='kitty chan Logo'
                width={500}
                height={500}
              />
              <p className='font-lilita text-2xl tracking-wide text-white'>
                kitty chan BOT
              </p>
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon
                className='h-6 w-6 text-red-500 transition-all duration-300 ease-in-out hover:text-red-800'
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-purple-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-purple-500/10 hover:text-purple-500'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='py-6'>
                {isAuth ? (
                  <button
                    onClick={() => {
                      dispatch(logOut());
                      setMobileMenuOpen(false);
                    }}
                    className='-mx-3 block w-full cursor-pointer rounded-lg px-3 py-2.5 text-start text-base font-semibold leading-7 text-white hover:bg-purple-500/10 hover:text-purple-500'
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL}
                    onClick={() => setMobileMenuOpen(false)}
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-start text-base font-semibold leading-7 text-white hover:bg-purple-500/10 hover:text-purple-500'
                  >
                    Login with Discord
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
