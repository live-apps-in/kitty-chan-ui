'use client';
import ChooseTemplateTypeModal from '@/components/widgets/ChooseTemplateTypeModal';
import { useAppSelector } from '@/redux/store';
import { GreetDto, TemplateDto } from '@/types/Greet';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { LuMousePointerClick } from 'react-icons/lu';

const WelcomeGreet = () => {
  const [templates, setTemplates] = useState<TemplateDto[]>([]);
  const [openModal,setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const { greet } = useAppSelector((state) => state.greetReducer.value);
  console.log(greet);

  // const templateData = {
  //   name: 'Welcome message',
  //   type: 'embed',
  //   target: 'welcome',
  //   embed: 'This is embed template',
  // };

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
      const { status } = await axios.patch(
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
        setCurrentTemplateId(templateId);
      }
    } catch (error) {
      console.log('Apply Welcome Template Error: ', error);
    }
  }

  console.log(templates);
  console.log(currentTemplateId);
  console.log(greet);

  return (
    <div className='relative h-full text-white'>
      <h1 className='text-2xl'>Welcome Greet</h1>

      {/* Choose Template Type Modal */}
      <ChooseTemplateTypeModal open={openModal} setOpen={setOpenModal}/>

      {/* Create Template Btn */}
      <button onClick={()=>setOpenModal(true)} className='absolute right-4 my-4 h-8 w-auto rounded-md bg-[#f5dea3] px-4 text-sm font-semibold text-black'>
        Create Template
      </button>
      <h2 className='py-2 text-lg'>Current Template</h2>
      {/* Templates Container */}
      <div className='space-y-4'>
        {templates?.map((template: TemplateDto) => {
          if (template._id !== currentTemplateId) return null;
          return (
            <div
              key={template._id}
              className='relative flex h-auto w-auto items-center gap-3 rounded-md border-[1px] border-[#fff0c6] bg-kittyNeutralBlack px-4 py-4 shadow-xl'
            >
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
              </div>
              <Link
                href={`/dashboard/${currentGuildId}/greet/welcome/${template.type}`}
                className='absolute right-8 top-3 flex cursor-pointer items-center gap-2'
              >
                <FiEdit3 size={20} className=' text-white' />
                <span className='text-sm'>Edit</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Other Templates */}
      <div className='py-4'>
        <h2 className='mb-4 text-lg '>Other Templates</h2>
        <div className='space-y-4'>
          {templates?.map((template: TemplateDto) => (
            <div
              key={template._id}
              className='relative flex h-auto w-auto items-center gap-3 rounded-md bg-kittyNeutralBlack px-4 py-4'
            >
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
                <p>{template._id}</p>
              </div>
              <div className='absolute right-8 top-3 flex cursor-pointer items-center gap-8'>
                <Link
                  href={`/dashboard/${currentGuildId}/greet/welcome/${template.type}`}
                  className='flex cursor-pointer items-center gap-2'
                >
                  <FiEdit3 size={20} className=' text-white' />
                  <span className='text-sm'>Edit</span>
                </Link>
                <button
                  onClick={() => handleApplyTemplate(template._id)}
                  className='flex items-center gap-2'
                >
                  <LuMousePointerClick size={20} className=' text-white' />
                  <span className='text-sm'>Use this template</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeGreet;
