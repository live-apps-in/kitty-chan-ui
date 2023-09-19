'use client';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import { RolesDto } from '../Roles/Roles';
import Image from 'next/image';
import ToggleButton from '@/components/widgets/ToggleButton';

interface DiscordDto {
  username: string;
  avatar: string;
  id: string;
}

export interface StaffDto {
  _id: string;
  name: string;
  discord: DiscordDto;
  userId: string;
  roleId: string;
  isActive: boolean;
}

const StaffCard = ({
  staff,
  roles,
  handleDelete,
}: {
  staff: StaffDto;
  roles: RolesDto[];
  handleDelete: (staffId: string) => void;
}) => {
  const [enabled, setEnabled] = useState(staff.isActive);

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const updateStaff = async (isActive: boolean) => {
    const staffInfo = {
      userId: staff.userId,
      roleId: staff.roleId,
      isActive,
    };

    try {
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff/${staff._id}`,
        staffInfo,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status !== 200) window.alert('Update Failed. Please try again.');
    } catch (error) {
      console.log('Error Updating staff', error);
    }
  };

  return (
    <>
      <div className='flex items-center gap-2'>
        <Image
          src={`https://cdn.discordapp.com/avatars/${staff?.discord.id}/${staff?.discord.avatar}.png`}
          alt=''
          className='w-8 h-auto rounded-full'
          width={500}
          height={500}
        />
        <h2 className='text-lg capitalize'>{staff.name}</h2>
      </div>
      <div className='flex items-start gap-3'>
        <div>
          <div className='flex items-start gap-2'>
            <h2 className='text-sm  tracking-wider text-[#a87ed9]'>
              Assigned Role:
            </h2>
            <div className='flex flex-wrap items-center gap-3'>
              {roles?.map((role) => {
                if (role._id !== staff.roleId) return;
                return (
                  <span
                    key={role._id}
                    className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-wider text-white'
                  >
                    {role.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className='absolute right-8 top-5 flex cursor-pointer items-center gap-8'>
          <div className='flex items-center gap-2 my-4'>
            <ToggleButton
              enabled={enabled}
              setEnabled={setEnabled}
              updateData={updateStaff}
            />
            <span className='text-sm'>{enabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          <Link
            href={`/dashboard/${currentGuildId}/staffs/${staff._id}`}
            className='flex cursor-pointer items-center gap-1'
          >
            <FiEdit3 size={20} className=' text-white' />
            <span className='text-sm'>Edit</span>
          </Link>
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(staff._id)}
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

const Staffs = () => {
  const [staffs, setStaffs] = useState<StaffDto[]>([]);
  const [roles, setRoles] = useState<RolesDto[] | null>();

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const getStaffs = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status == 200) {
        setStaffs(data);
      }
    } catch (error) {
      console.log('Fetch Staffs Error: ', error);
    }
  };

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

  const handleDelete = async (staffId: string) => {
    try {
      const { status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff/${staffId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        const updatedStaffs = staffs?.filter((staff) => staff._id !== staffId);
        setStaffs(updatedStaffs);
      }
    } catch (error) {
      console.log('Delete Role Error: ', error);
    }
  };

  useEffect(() => {
    getStaffs();
    getRoles();
  }, []);

  return (
    <div className='h-screen text-white'>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl'>All Staffs</h2>
        <Link
          href={`/dashboard/${currentGuildId}/staffs/add`}
          className='bg-kittyNeutralBlack hover:bg-black text-white font-bold py-2 px-4 rounded'
        >
          Add Staff
        </Link>
      </div>
      {/* View Staffs */}
      {roles &&
        staffs?.map((staff: StaffDto) => (
          <div
            key={staff._id}
            className='relative flex flex-col h-auto w-auto gap-3 my-6 rounded-md bg-kittyNeutralBlack px-4 py-4 text-white'
          >
            <StaffCard
              staff={staff}
              roles={roles}
              handleDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  );
};

export default Staffs;
