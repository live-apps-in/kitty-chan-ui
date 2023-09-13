'use client';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';

const StaffsAndRoles = () => {
  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const links = [
    {
      name: 'Staffs',
      href: `/dashboard/${currentGuildId}/staffs`,
    },
    {
      name: 'Roles',
      href: `/dashboard/${currentGuildId}/roles`,
    },
  ];

  return (
    <div className='h-screen'>
      <h2 className='text-white text-xl'>Staffs and Roles</h2>
      <div className='flex items-center gap-8 py-16'>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className='flex flex-col md:flex-row h-44 w-full md:w-1/4 cursor-pointer  items-center text-white justify-center rounded-md border-2 border-kittyTextGray bg-kittyNeutralBlack shadow-xl'
          >
            <h2 className='text-xl font-bold tracking-wider'>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StaffsAndRoles;
