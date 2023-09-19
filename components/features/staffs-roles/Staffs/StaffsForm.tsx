'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppSelector } from '@/redux/store';
import { RolesDto } from '../Roles/Roles';
import Image from 'next/image';
import { RxCrossCircled } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { StaffDto } from './Staffs';

interface DiscordDto {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: null;
  banner_color: string;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
}

interface UserDto {
  _id: string;
  name: string;
  discord: DiscordDto;
}

export default function StaffForm({ staffToEdit }: { staffToEdit?: StaffDto }) {
  const router = useRouter();

  const [users, setUsers] = useState<UserDto[] | null>([]);
  const [roles, setRoles] = useState<RolesDto[]>([]);
  const [isRolesMenuOpen, setIsRolesMenuOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<{
    _id: string;
    name: string;
  }>();
  const [selectedUser, setSelectedUser] = useState<UserDto | null>();

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
        if (staffToEdit) {
          const currentStaff = data.filter(
            (staff: StaffDto) => staff._id === staffToEdit.userId
          );
          setSelectedUser(currentStaff[0]);
        }
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
      }

      if (staffToEdit) {
        const currentRole = data.filter(
          (role: RolesDto) => role._id === staffToEdit.roleId
        );
        setSelectedRole(currentRole[0]);
      }
    } catch (error) {
      console.log('Fetch Guild Roles Error: ', error);
    }
  };

  useEffect(() => {
    getRoles();
    getStaffs();
  }, []);

  const fetchUsers = async (username: string) => {
    // Make users array empty before fetching users
    setUsers(null);

    // Don't make api call for empty string
    if (username === '') return null;
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/user?name=${username}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        setUsers(data);
      } else {
        setUsers(null);
      }
    } catch (error) {
      console.log('Fetch Users Error: ', error);
    }
  };

  const handleSelectRole = (role: RolesDto) => {
    setSelectedRole({ _id: role._id, name: role.name });
    setIsRolesMenuOpen(false);
  };

  const handleSelectUser = (user: UserDto) => {
    setSelectedUser(user);
    setUsers([]);
  };

  const handleSubmit = async () => {
    const staffInfo = {
      userId: selectedUser?._id,
      roleId: selectedRole?._id,
      isActive: true,
    };

    if (staffInfo.userId === undefined || staffInfo.roleId === undefined) {
      window.alert('Fields Cannot be empty');
      return;
    }

    if (staffToEdit) {
      try {
        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff/${staffToEdit._id}`,
          staffInfo,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 200) {
          router.push(`/dashboard/${currentGuildId}/staffs`);
        }
      } catch (error) {
        console.log('Error Updating staff', error);
      }
    } else {
      try {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff`,
          staffInfo,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 201) {
          router.push(`/dashboard/${currentGuildId}/staffs`);
        }
      } catch (error) {
        console.log('Error Adding staff', error);
      }
    }
  };

  return (
    <div className='h-screen flex flex-col gap-4'>
      <h1 className='text-2xl text-white'>
        {staffToEdit ? 'Update Staff' : 'Add Staff'}
      </h1>

      <div className=' mb-4 text-white'>
        <h2 className='mb-2'>
          {selectedUser ? 'Selected User' : 'Search User'}
        </h2>
        {!selectedUser && (
          <input
            placeholder='Search by username Eg: jaga'
            type='text'
            className='form-input-field w-full md:w-1/4'
            onChange={(e) => {
              fetchUsers(e.target.value);
            }}
          />
        )}
        <div className='z-10 mt-1 w-full md:w-1/4 divide-y divide-gray-800 rounded-lg shadow  bg-kittyDarkGray'>
          {users?.map((user: UserDto) => (
            <ul key={user._id} className='text-sm text-white'>
              <li
                onClick={() => handleSelectUser(user)}
                className='flex items-center hover:bg-kittyNeutralBlack gap-2 px-4 cursor-pointer'
              >
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user?.discord.id}/${user?.discord.avatar}.png`}
                  alt=''
                  className='w-8 h-auto rounded-full'
                  width={500}
                  height={500}
                />
                <p className='block py-4 cursor-pointer'>{user.name}</p>
              </li>
            </ul>
          ))}
        </div>
        {selectedUser && (
          <div className='flex flex-wrap items-center gap-1 mt-2 text-white'>
            <Image
              src={`https://cdn.discordapp.com/avatars/${selectedUser?.discord.id}/${selectedUser?.discord.avatar}.png`}
              alt=''
              className='w-8 h-auto rounded-full'
              width={500}
              height={500}
            />
            <span className='rounded-sm bg-[#5b65ea] px-[6px] py-[2px] text-[12px] tracking-wider'>
              {selectedUser?.name}
            </span>
            {!staffToEdit && (
              <RxCrossCircled
                className='hover:text-red-500 transition cursor-pointer ml-2'
                onClick={() => setSelectedUser(null)}
              />
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className='text-white mb-2 text-md'>Choose Role</h2>
        <button
          className='text-white bg-kittyNeutralBlack hover:bg-kittyNeutralBlack focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full md:w-1/4'
          onClick={() => setIsRolesMenuOpen(!isRolesMenuOpen)}
        >
          {selectedRole ? selectedRole.name : 'View Roles'}
          <svg
            className='w-2.5 h-2.5 ml-auto'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        </button>

        {isRolesMenuOpen && (
          <div className='z-10 mt-1 w-full md:w-1/4 divide-y divide-gray-800 rounded-lg shadow  bg-kittyDarkGray'>
            {roles.map((role: RolesDto) => (
              <ul key={role._id} className='text-sm text-white'>
                <li>
                  <p
                    onClick={() => handleSelectRole(role)}
                    className='block px-4 py-4 hover:rounded-lg hover:bg-kittyNeutralBlack cursor-pointer'
                  >
                    {role.name}
                  </p>
                </li>
              </ul>
            ))}
          </div>
        )}

        {selectedRole && (
          <div className='flex flex-wrap items-center gap-3 mt-2 text-white'>
            <p className='text-sm'>Selected Role:</p>
            <span className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[12px] tracking-wider'>
              {selectedRole?.name}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className='bg-kittyNeutralBlack hover:bg-black text-white font-bold py-2 px-4 rounded-lg w-full md:w-44 mt-4'
      >
        {staffToEdit ? 'Update Staff' : 'Add Staff'}
      </button>
    </div>
  );
}
