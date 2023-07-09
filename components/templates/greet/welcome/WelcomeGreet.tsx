'use client';
import ChooseTemplateTypeModal from '@/components/widgets/ChooseTemplateTypeModal';
import { setGreet } from '@/redux/slices/greetSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { PlainTemplateDto } from '@/types/Greet';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import { LuMousePointerClick } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

const WelcomeGreet = () => {
  const [templates, setTemplates] = useState<PlainTemplateDto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const { greet } = useAppSelector((state) => state.greetReducer.value);

  const dispatch = useDispatch<AppDispatch>();
  console.log(greet);

  async function fetchWelcomeGreetTemplates() {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/welcome`,
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
        // Set Current templateId
        setCurrentTemplateId(greet?.welcome.templateId);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      console.log('Greet Error: ', error);
    }
  }

  useEffect(() => {
    fetchWelcomeGreetTemplates();
  }, []);

  async function handleApplyTemplate(templateId: string) {
    // Keeping other greet data (i.e farewell) as it is & updating only welcome templateId

    const greetData = {
      isActive: greet?.isActive,
      farewell: { ...greet?.farewell },
      welcome: {
        isActive: true,
        channelId: currentGuildId,
        templateId,
      },
    };

    try {
      const { status, data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        greetData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );

      if (status == 200) {
        // Update the greet details in cookie
        Cookies.set('greet-details', JSON.stringify(data));
        dispatch(setGreet(data));
        setCurrentTemplateId(templateId);
      }
    } catch (error) {
      console.log('Apply Welcome Template Error: ', error);
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
      console.log('Delete Welcome Template Error: ', error);
    }
  }

  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='text-2xl'>Welcome Greet</h1>

      {/* Choose Template Type Modal */}
      <ChooseTemplateTypeModal
        open={openModal}
        setOpen={setOpenModal}
        currentGuildId={currentGuildId}
        target='welcome'
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
                    href={`/dashboard/${currentGuildId}/greet/welcome/${template.type}/${template._id}`}
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
            {templates?.map((template: PlainTemplateDto) => {
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
                        href={`/dashboard/${currentGuildId}/greet/welcome/${template.type}/${template._id}`}
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
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeGreet;
