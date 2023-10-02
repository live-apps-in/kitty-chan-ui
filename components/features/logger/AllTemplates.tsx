'use client';
import ChooseTemplateTypeModal from '@/components/widgets/ChooseTemplateTypeModal';
import { PlainTemplateDto } from '@/types/Templates';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import { LuMousePointerClick } from 'react-icons/lu';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { loggerTypes } from './Logger';
import { useDispatch } from 'react-redux';
import { setLogs } from '@/redux/slices/logsSlice';
import ToggleButton from '@/components/widgets/ToggleButton';
import { BsChevronDown } from 'react-icons/bs';
import { ChannelDto } from '@/types/Channel';
import { LogsDto } from '@/types/Greet';

interface AllTemplatesProps {
  target: string;
}

const AllTemplates = ({ target }: AllTemplatesProps) => {
  const [templates, setTemplates] = useState<PlainTemplateDto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();

  const [openChannelsMenu, setOpenChannelsMenu] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<ChannelDto>();
  const [channels, setChannels] = useState<ChannelDto[]>();

  const [enabled, setEnabled] = useState(false);

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const { logs }: any = useAppSelector((state) => state.logsReducer.value);

  const dispatch = useDispatch<AppDispatch>();

  async function fetchChannels() {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/channels`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status === 200) {
        setChannels(data);
        if (logs) {
          setCurrentChannel(
            data?.filter(
              (channel: ChannelDto) => logs[target].channelId === channel.id
            )[0]
          );
        }
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async function fetchAllTemplates() {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${target}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      setLoading(false);
      if (status === 200) {
        setTemplates(data);
        const targetTemplateId = logs?.[target].templateId;
        setCurrentTemplateId(targetTemplateId || null);
        setEnabled(logs?.[target].isActive);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  useEffect(() => {
    fetchAllTemplates();
    fetchChannels();
  }, []);

  // Update channel while selecting channel in dropdown
  async function handleChannelUpdate(channel: ChannelDto) {
    setCurrentChannel(channel);

    const logsData = {
      ...logs,
      [target]: {
        isActive: true,
        channelId: channel.id,
        templateId: currentTemplateId,
      },
    };

    try {
      const { status, data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/logger`,
        logsData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status == 200) {
        // Update logs details in cookie
        Cookies.set('logs-details', JSON.stringify(data));
        dispatch(setLogs(data));
      }
    } catch (error) {
      console.log('Apply Channel Template Error: ', error);
    }
  }

  async function handleApplyTemplate(templateId: string) {
    if (!currentChannel) {
      window.alert('Choose channel First');
      return;
    }

    const logsData = {
      ...logs,
      [target]: {
        isActive: true,
        channelId: currentChannel.id,
        templateId,
      },
    };

    try {
      const { status, data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/logger`,
        logsData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status == 200) {
        // Update logs details in cookie
        Cookies.set('logs-details', JSON.stringify(data));
        dispatch(setLogs(data));
        setCurrentTemplateId(templateId);
      }
    } catch (error) {
      console.log('Apply logs Template Error: ', error);
    }
  }

  async function handleDeleteTemplate(templateId: string) {
    try {
      const { status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status == 200) {
        const updatedTemplates = templates.filter(
          (template) => template._id !== templateId
        );
        setTemplates(updatedTemplates);
      }
    } catch (error) {
      console.log('Delete Template Error: ', error);
    }
  }

  // Update isActive of properties in logs
  async function toggleIsActive(isActive: boolean) {
    const logsData = {
      ...logs,
      [target]: { ...logs?.[target], isActive },
    };

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
        setEnabled(data?.[target].isActive);
      }
    } catch (error) {
      console.log('Logs Target isActive Update Error: ', error);
    }
  }

  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='text-2xl capitalize'>
        {loggerTypes.map((logger) => logger.href === target && logger.name)}
      </h1>
      <div>
        <button
          onClick={() => setOpenChannelsMenu(!openChannelsMenu)}
          className=' bg-kittyNeutralBlack hover:bg-black text-white font-bold py-2 px-4 rounded-lg w-full md:w-44 mt-4 flex items-center gap-2'
        >
          Select Channel
          <BsChevronDown className={`${openChannelsMenu && 'rotate-180'}`} />
        </button>
        {openChannelsMenu && (
          <ul className='text-sm z-100  text-white max-h-44 overflow-y-scroll bg-kittyNeutralBlack md:w-1/4 p-2 rounded-lg mt-1'>
            {channels?.map((channel: ChannelDto) => (
              <li
                key={channel.id}
                onClick={() => {
                  setOpenChannelsMenu(false);
                  handleChannelUpdate(channel);
                }}
                className='flex items-center hover:bg-kittyDarkGray hover:rounded-lg gap-2 px-4 cursor-pointer'
              >
                <p className='block py-4 cursor-pointer'>{channel.name}</p>
              </li>
            ))}
          </ul>
        )}
        {currentChannel && (
          <div className='flex  items-center my-3 gap-2'>
            <p className='text-sm'>Selected Channel:</p>
            <p>{currentChannel.name}</p>
          </div>
        )}
      </div>

      <div className='flex items-center gap-2 my-4'>
        <ToggleButton
          enabled={enabled}
          setEnabled={setEnabled}
          updateData={toggleIsActive}
        />
        <span className='text-sm'>
          {loggerTypes.map((logger) => logger.href === target && logger.name)}{' '}
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>

      {/* Choose Template Type Modal */}
      <ChooseTemplateTypeModal
        open={openModal}
        setOpen={setOpenModal}
        currentGuildId={currentGuildId}
        target={target}
        feature='logs'
      />

      {/* Create Template Btn */}
      <button
        onClick={() => setOpenModal(true)}
        className='absolute right-4 top-2 my-4 h-8 w-auto rounded-md bg-[#f5dea3] px-4 text-sm font-semibold text-black'
      >
        Create Template
      </button>
      <h2 className='py-2 text-lg mt-6'>Current Template</h2>
      {/* Templates Container */}
      {loading ? (
        <p>Loading...Please wait!</p>
      ) : (
        <div className='space-y-4'>
          {templates?.map((template: PlainTemplateDto) => {
            if (template._id !== currentTemplateId) return null;
            return (
              <div
                key={template._id}
                className='relative flex flex-col h-auto w-auto  gap-3 rounded-md border-[1px] border-[#fff0c6] bg-kittyNeutralBlack px-4 py-4 shadow-xl'
              >
                <h2 className='text-md'>{template.name}</h2>
                <div className='flex items-start gap-3'>
                  <Image
                    className='h-10 w-auto rounded-full'
                    src='/assets/images/kitty-chan-logo.jpg'
                    alt='kitty chan logo'
                    width={500}
                    height={500}
                  />
                  <div>
                    <div className='flex items-center gap-2'>
                      <h2 className='text-sm  tracking-wider text-[#a87ed9]'>
                        kitty chan
                      </h2>
                      <span className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-tighter text-white'>
                        BOT{' '}
                      </span>
                    </div>
                    <p>{template.content}</p>
                    <p>Type:{template.type}</p>
                  </div>
                  <Link
                    href={`/dashboard/${currentGuildId}/logs/${target}/${template.type}/${template._id}`}
                    className='absolute right-8 top-3 flex cursor-pointer items-center gap-2'
                  >
                    <FiEdit3 size={20} className=' text-white' />
                    <span className='text-sm'>Edit</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Other Templates */}
      <div className='py-4'>
        <h2 className='mb-4 text-lg '>Other Templates</h2>
        {loading ? (
          <p>Loading...Please wait!</p>
        ) : (
          <div className='space-y-4'>
            {!loading && templates && templates?.length !== 0 ? (
              templates?.map((template: PlainTemplateDto) => {
                if (template._id === currentTemplateId) return null;
                return (
                  <div
                    key={template._id}
                    className='relative flex flex-col h-auto w-auto gap-3 rounded-md bg-kittyNeutralBlack px-4 py-4'
                  >
                    <h2 className='text-md'>{template.name}</h2>
                    <div className='flex items-start gap-3'>
                      <Image
                        className='h-10 w-auto rounded-full'
                        src='/assets/images/kitty-chan-logo.jpg'
                        alt='kitty chan logo'
                        width={500}
                        height={500}
                      />
                      <div>
                        <div className='flex items-center gap-2'>
                          <h2 className='text-sm  tracking-wider text-[#a87ed9]'>
                            kitty chan
                          </h2>
                          <span className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-tighter text-white'>
                            BOT{' '}
                          </span>
                        </div>
                        <p>{template.content}</p>
                        <p>Type:{template.type}</p>
                      </div>
                      <div className='absolute right-8 top-3 flex cursor-pointer items-center gap-8'>
                        <Link
                          href={`/dashboard/${currentGuildId}/logs/${target}/${template.type}/${template._id}`}
                          className='flex cursor-pointer items-center gap-1'
                        >
                          <FiEdit3 size={20} className=' text-white' />
                          <span className='text-sm'>Edit</span>
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteTemplate(template._id)}
                          className='group flex cursor-pointer items-center gap-1 '
                        >
                          <MdDeleteSweep
                            size={20}
                            className=' text-white group-hover:text-red-500'
                          />
                          <span className='text-sm group-hover:text-red-500'>
                            Delete
                          </span>
                        </button>
                        {/* Apply Template Button */}
                        <button
                          onClick={() => handleApplyTemplate(template._id)}
                          className='flex items-center gap-2'
                        >
                          <LuMousePointerClick
                            size={20}
                            className=' text-white'
                          />
                          <span className='text-sm'>Use this template</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className='text-md text-yellow-200'>
                Oops! No templates found. Create one to unleash the logs
                feature.
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTemplates;
