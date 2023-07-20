'use client';
import ToggleButton from '@/components/widgets/ToggleButton';
import { setLogs } from '@/redux/slices/logsSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { GuildDto } from '@/types/AllGuilds';
import { LogsDto } from '@/types/Features';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const loggerTypes = [
  {
    name: 'Message Update',
    href: 'messageUpdate',
  },
  {
    name: 'Message Delete',
    href: 'messageDelete',
  },
  {
    name: 'Member Add Role',
    href: 'memberAddRole',
  },
  {
    name: 'Member Remove Role',
    href: 'memberRemoveRole',
  },
  {
    name: 'Member Nickname Update',
    href: 'memberNicknameUpdate',
  },
  {
    name: 'Member Username Update',
    href: 'memberUsernameUpdate',
  },
  {
    name: 'Member Avatar Update',
    href: 'memberAvatarUpdate',
  },
];

const Logger = () => {
  const [currentGuild, setCurrentGuild] = useState<GuildDto>();
  const [loggerDetails, setLoggerDetails] = useState<LogsDto>();

  const [enabled, setEnabled] = useState(false);

  const { currentGuildId, allGuilds } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const dispatch = useDispatch<AppDispatch>();

  async function fetchLogger() {
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/logger`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status === 200) {
        const newData = {
          isActive:
            data.isActive === true || data.isActive === false
              ? data.isActive
              : false,
          messageUpdate: {
            isActive:
              data.messageUpdate?.isActive === true ||
              data.messageUpdate?.isActive === false
                ? data.messageUpdate?.isActive
                : true,
            channelId: data.messageUpdate?.channelId || null,
            templateId: data.messageUpdate?.templateId || null,
          },
          messageDelete: {
            isActive:
              data.messageDelete?.isActive === true ||
              data.messageDelete?.isActive === false
                ? data.messageDelete?.isActive
                : true,
            channelId: data.messageDelete?.channelId || null,
            templateId: data.messageDelete?.templateId || null,
          },
          memberAddRole: {
            isActive:
              data.memberAddRole?.isActive === true ||
              data.memberAddRole?.isActive === false
                ? data.memberAddRole?.isActive
                : true,
            channelId: data.memberAddRole?.channelId || null,
            templateId: data.memberAddRole?.templateId || null,
          },
          memberRemoveRole: {
            isActive:
              data.memberRemoveRole?.isActive === true ||
              data.memberRemoveRole?.isActive === false
                ? data.memberRemoveRole?.isActive
                : true,
            channelId: data.memberRemoveRole?.channelId || null,
            templateId: data.memberRemoveRole?.templateId || null,
          },
          memberNicknameUpdate: {
            isActive:
              data.memberNicknameUpdate?.isActive === true ||
              data.memberNicknameUpdate?.isActive === false
                ? data.memberNicknameUpdate?.isActive
                : true,
            channelId: data.memberNicknameUpdate?.channelId || null,
            templateId: data.memberNicknameUpdate?.templateId || null,
          },
          memberUsernameUpdate: {
            isActive:
              data.memberUsernameUpdate?.isActive === true ||
              data.memberUsernameUpdate?.isActive === false
                ? data.memberUsernameUpdate?.isActive
                : true,
            channelId: data.memberUsernameUpdate?.channelId || null,
            templateId: data.memberUsernameUpdate?.templateId || null,
          },
          memberAvatarUpdate: {
            isActive:
              data.memberAvatarUpdate?.isActive === true ||
              data.memberAvatarUpdate?.isActive === false
                ? data.memberAvatarUpdate?.isActive
                : true,
            channelId: data.memberAvatarUpdate?.channelId || null,
            templateId: data.memberAvatarUpdate?.templateId || null,
          },
        };

        Cookies.set('logs-details', JSON.stringify(newData));
        dispatch(setLogs(newData));
        setLoggerDetails(newData);
        setEnabled(data.isActive);
      }
    } catch (error) {
      console.log('Fetch Logs Error: ', error);
    }
  }

  async function toggleIsActive(isActive: boolean) {
    const logsData = { ...loggerDetails, isActive };

    try {
      const { data, status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/logger`,
        logsData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status === 200) {
        Cookies.set('logs-details', JSON.stringify(data));
        dispatch(setLogs(data));
        setEnabled(data.isActive);
      }
    } catch (error) {
      console.log('Toggle Logs IsActive Error: ', error);
    }
  }

  useEffect(() => {
    // Allow only guild_owner to access the route
    const guilds = allGuilds?.filter(
      (guild: any) => guild.guildId === currentGuildId
    );

    setCurrentGuild(guilds?.[0]);
    if (currentGuild?.userRole === 'guild_owner') fetchLogger();
  }, [currentGuild]);

  return (
    <div className='min-h-screen text-white'>
      <p className='mb-6'>Choose the Logger</p>
      <div className='flex items-center gap-2 mb-4'>
        <ToggleButton
          enabled={enabled}
          setEnabled={setEnabled}
          updateData={toggleIsActive}
        />
        <span className='text-sm'>Logs {enabled ? 'Enabled' : 'Disabled'}</span>
      </div>
      <ul className='flex flex-wrap items-center gap-6'>
        {loggerTypes.map((logger) => (
          <Link
            key={logger.name}
            href={`/dashboard/${currentGuildId}/logs/${logger.href}`}
            className='flex h-32 w-64 cursor-pointer  items-center justify-center rounded-md border-2 border-kittyTextGray bg-kittyNeutralBlack shadow-xl'
          >
            <h2 className='text-md font-bold tracking-wider'>{logger.name}</h2>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Logger;
