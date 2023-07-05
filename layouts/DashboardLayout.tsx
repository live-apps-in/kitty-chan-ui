'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { logOut } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { GuildDto } from '@/types/AllGuilds';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard/1109546114371301479',
    icon: '/assets/icons/dashboard.svg',
  },
];

const generals = [
  {
    name: 'greet',
    href: '/dashboard/1109546114371301479/greet',
    icon: '/assets/icons/home.svg',
  },
  {
    name: 'logs',
    href: '/dashboard/1109546114371301479/logs',
    icon: '/assets/icons/list.svg',
  },
];

const features = [
  {
    name: 'Reaction Roles',
    href: '/dashboard/1109546114371301479/reaction-roles',
    icon: '/assets/icons/reaction-roles.svg',
  },
  {
    name: 'Language filters',
    href: '/dashboard/1109546114371301479/language-filters',
    icon: '/assets/icons/language.svg',
  },
  {
    name: 'Portal',
    href: '/dashboard/1109546114371301479/portal',
    icon: '/assets/icons/portal.svg',
  },
  {
    name: 'Hands Free',
    href: '/dashboard/1109546114371301479/hands-free',
    icon: '/assets/icons/hands-free.svg',
  },
];

const DashboardLayout = ({
  children,
  guildId,
}: {
  children: React.ReactNode;
  guildId?: string;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentGuild, setCurrentGuild] = useState<GuildDto>();

  const pathname = usePathname();
  const router = useRouter();

  const { loading } = useAuth();

  const { isAuth, userDetails } = useAppSelector(
    (state) => state.authReducer.value
  );

  const { allGuilds, currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userDetails]);

  useEffect(() => {
    let guilds;
    if (guildId) {
      guilds = allGuilds?.filter((guild: any) => guild.guildId === guildId);
    } else {
      guilds = allGuilds?.filter(
        (guild: any) => guild.guildId === currentGuildId
      );
    }
    setCurrentGuild(guilds?.[0]);
  }, []);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-kittyDarkGray px-6 pb-4'>
                  <div className='flex h-16 shrink-0 items-center'>
                    {/* Logo */}
                    <motion.div
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5 }}
                      variants={{
                        hidden: { opacity: 0, x: -80 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link href='/' className='flex items-center gap-2'>
                        <Image
                          width={500}
                          height={500}
                          src='/assets/images/kitty-chan-logo.jpg'
                          className='mt-4 h-10 w-10 rounded-full md:h-16 md:w-16'
                          alt='kitty chan logo'
                        />
                        <p className='mt-4 font-lilita text-xl tracking-wider text-white'>
                          kitty chan
                        </p>
                      </Link>
                    </motion.div>
                  </div>
                  <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                      <li>
                        <h2 className='text-sm font-semibold leading-6 text-white'>
                          Home
                        </h2>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={`
                                      ${
                                        pathname.includes(item.href)
                                          ? 'bg-kittyNeutralBlack text-white'
                                          : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                                      }
                                       group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                    `}
                              >
                                <Image
                                  src={item.icon}
                                  className={`${
                                    pathname.includes(item.href)
                                      ? ''
                                      : 'text-gray-400 group-hover:text-white'
                                  }
                            h-6 w-6 shrink-0
                          `}
                                  aria-hidden='true'
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <h2 className='text-sm font-semibold leading-6 text-white'>
                          General
                        </h2>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {generals.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={`
                                      ${
                                        pathname.includes(item.href)
                                          ? 'bg-kittyNeutralBlack text-white'
                                          : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                                      }
                                       group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                    `}
                              >
                                <Image
                                  src={item.icon}
                                  className={`${
                                    pathname.includes(item.href)
                                      ? ''
                                      : 'text-gray-400 group-hover:text-white'
                                  }
                            h-6 w-6 shrink-0
                          `}
                                  aria-hidden='true'
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <h2 className='text-sm font-semibold leading-6 text-white'>
                          Features
                        </h2>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {features.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={`
                                      ${
                                        pathname.includes(item.href)
                                          ? 'bg-kittyNeutralBlack text-white'
                                          : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                                      }
                                       group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                    `}
                              >
                                <Image
                                  src={item.icon}
                                  className={`${
                                    pathname.includes(item.href)
                                      ? ''
                                      : 'text-gray-400 group-hover:text-white'
                                  }
                            h-6 w-6 shrink-0
                          `}
                                  aria-hidden='true'
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col '>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto border-gray-300 bg-kittyDarkGray px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            {/* Logo */}
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -80 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Link href='' className='flex items-center gap-2'>
                <Image
                  width={500}
                  height={500}
                  src='/assets/images/kitty-chan-logo.jpg'
                  className='mt-4 h-10 w-10 rounded-full md:h-16 md:w-16'
                  alt='kitty chan logo'
                />
                <p className='mt-4 font-lilita text-xl tracking-wider text-white'>
                  kitty chan
                </p>
              </Link>
            </motion.div>
          </div>
          <nav className='flex flex-1 flex-col py-4'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <h2 className='text-sm font-semibold leading-6 text-white'>
                  Home
                </h2>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`${
                          pathname.includes(item.href)
                            ? 'bg-kittyNeutralBlack text-white'
                            : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                        }
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                        `}
                      >
                        <Image
                          src={item.icon}
                          className={`${
                            pathname.includes(item.href)
                              ? ''
                              : 'text-gray-400 group-hover:text-white'
                          }
                            h-6 w-6 shrink-0
                          `}
                          aria-hidden='true'
                          alt={item.name}
                          width={200}
                          height={200}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <h2 className='text-sm font-semibold leading-6 text-white'>
                  General
                </h2>
                <ul role='list' className='-mx-2 space-y-1'>
                  {generals.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`${
                          pathname.includes(item.href)
                            ? 'bg-kittyNeutralBlack text-white'
                            : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                        }
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                        `}
                      >
                        <Image
                          src={item.icon}
                          className={`${
                            pathname.includes(item.href)
                              ? ''
                              : 'text-gray-400 group-hover:text-white'
                          }
                            h-6 w-6 shrink-0
                          `}
                          aria-hidden='true'
                          alt={item.name}
                          width={200}
                          height={200}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <h2 className='text-sm font-semibold leading-6 text-white'>
                  Features
                </h2>
                <ul role='list' className='-mx-2 space-y-1'>
                  {features.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`${
                          pathname.includes(item.href)
                            ? 'bg-kittyNeutralBlack text-white'
                            : 'text-kittyTextGray hover:bg-kittyNeutralBlack hover:text-white'
                        }
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                        `}
                      >
                        <Image
                          src={item.icon}
                          className={`${
                            pathname.includes(item.href)
                              ? ''
                              : 'text-gray-400 group-hover:text-white'
                          }
                            h-6 w-6 shrink-0
                          `}
                          aria-hidden='true'
                          alt={item.name}
                          width={200}
                          height={200}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Topbar */}
      <div className='lg:pl-72'>
        <div className='sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 bg-kittyLightGray px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
          <button
            type='button'
            className='-m-2.5 p-2.5 text-white lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          {/* Current Section */}
          <h2 className='text-lg font-semibold tracking-wide text-white lg:text-2xl'>
            Dashboard
          </h2>
          <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
            <div className='ml-auto flex items-center gap-x-4 lg:gap-x-14'>
              {/* Current Guild */}
              {currentGuild && (
                <Menu as='div' className='relative'>
                  <Menu.Button className='hidden h-[54px] w-[259px] cursor-pointer items-center justify-around rounded-md bg-kittyNeutralBlack lg:flex'>
                    {/* Image */}
                    <div className='flex items-center gap-4'>
                      <Image
                        src={`${
                          currentGuild.icon
                            ? `https://cdn.discordapp.com/icons/${currentGuild.guildId}/${currentGuild.icon}.png`
                            : '/assets/images/guild-default-icon.jpg'
                        } 
`}
                        alt={currentGuild.name}
                        width={200}
                        height={200}
                        className='h-9 w-9 rounded-full'
                      />
                      <h2 className='font-semibold text-white'>
                        {currentGuild.name}
                      </h2>
                    </div>
                    <ChevronDownIcon
                      className='ml-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <div className='absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-md bg-kittyDarkGray p-2 text-gray-400 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      <ul className='w-full text-sm'>
                        <li className='my-2 w-full rounded-xl p-2'>
                          Server:{' '}
                          <span className='text-white'>
                            {currentGuild?.name}
                          </span>
                        </li>

                        <div className='h-[1px] w-full bg-gray-700' />
                        <Link href='/servers'>
                          <li className='my-2 w-full cursor-pointer px-2 py-3 hover:rounded-xl hover:bg-kittyNeutralBlack hover:text-white '>
                            Add new Server
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </Transition>
                </Menu>
              )}

              {/* Profile dropdown */}
              <Menu as='div' className='relative'>
                <Menu.Button className='-m-1.5 flex items-center gap-20 p-1.5'>
                  <span className='flex items-center'>
                    <Image
                      src={`${
                        isAuth
                          ? `https://cdn.discordapp.com/avatars/${userDetails?.discord.id}/${userDetails?.discord.avatar}.png`
                          : '/assets/images/user-avatar.png'
                      } 
`}
                      alt={userDetails?.discord.global_name || 'User Avatar'}
                      className='h-[54px] w-auto rounded-full'
                      width={500}
                      height={500}
                    />
                    <ChevronDownIcon
                      className='ml-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div className='absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-md bg-kittyDarkGray p-2 text-gray-400 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
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
                          router.push('/');
                        }}
                        className='my-2 w-full cursor-pointer px-2 py-3 hover:rounded-xl hover:bg-kittyNeutralBlack hover:text-white '
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className='h-screen bg-kittyLightGray py-10'>
          <div className='px-4 sm:px-6'>{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
