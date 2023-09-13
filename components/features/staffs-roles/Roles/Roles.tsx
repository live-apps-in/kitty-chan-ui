'use client';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

export interface RolesDto {
  _id: string;
  name: string;
  permissions: Array<string>;
  guildId: string;
  systemRole: boolean;
}

const RoleCard = ({
  role,
  handleDelete,
}: {
  role: RolesDto;
  handleDelete: (roleId: string) => void;
}) => {
  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );
  return (
    <>
      <h2 className='text-md'>{role.name}</h2>
      <div className='flex items-start gap-3'>
        <div>
          <div className='flex items-start gap-2'>
            <h2 className='text-sm  tracking-wider text-[#a87ed9]'>
              Permissions
            </h2>
            <div className='flex flex-wrap items-center gap-3'>
              {role.permissions.map((permission) => (
                <span
                  key={permission}
                  className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-wider text-white'
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='absolute right-8 top-5 flex cursor-pointer items-center gap-8'>
          <Link
            href={`/dashboard/${currentGuildId}/roles/${role._id}`}
            className='flex cursor-pointer items-center gap-1'
          >
            <FiEdit3 size={20} className=' text-white' />
            <span className='text-sm'>Edit</span>
          </Link>
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(role._id)}
            className='group flex cursor-pointer items-center gap-1 '
          >
            <MdDeleteSweep
              size={20}
              className=' text-white group-hover:text-red-500'
            />
            <span className='text-sm group-hover:text-red-500'>Delete</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Roles = () => {
  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const [roles, setRoles] = useState<RolesDto[] | null>();

  const getRoles = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/role`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        setRoles(data);
      } else {
        setRoles(null);
      }
    } catch (error) {
      console.log('Fetch Guild Roles Error: ', error);
    }
  };

  const handleDelete = async (roleId: string) => {
    try {
      const { status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/role/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        const updatedRoles = roles?.filter((role) => role._id !== roleId);
        setRoles(updatedRoles);
      }
    } catch (error) {
      console.log('Delete Role Error: ', error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className='h-screen '>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl'>All Guild Roles</h2>
        <Link
          href={`/dashboard/${currentGuildId}/roles/add`}
          className='bg-kittyNeutralBlack hover:bg-black text-white font-bold py-2 px-4 rounded'
        >
          Add Role
        </Link>
      </div>
      {/* View Roles */}
      {roles?.map((role) => (
        <div
          key={role._id}
          className='relative flex flex-col h-auto w-auto gap-3 my-6 rounded-md bg-kittyNeutralBlack px-4 py-4 text-white'
        >
          <RoleCard role={role} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default Roles;
