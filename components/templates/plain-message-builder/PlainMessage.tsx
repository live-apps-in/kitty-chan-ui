'use client';
import { useAppSelector } from '@/redux/store';
import { PlainTemplateDto, TemplateType } from '@/types/Greet';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface PlainMessageProps {
  target: string;
  templateToEdit?: PlainTemplateDto;
}

const FormSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  message: z.string().min(1, 'Message is required!'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const PlainMessage = ({ target, templateToEdit }: PlainMessageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: templateToEdit?.name || '',
      message: templateToEdit?.content || '',
    },
  });

  const message = watch('message');

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const templateData = {
      name: data.name,
      type: TemplateType.PLAIN,
      target, // farewell or welcome
      content: data.message,
    };

    if (templateToEdit) {
      // Update Template
      try {
        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateToEdit._id}`,
          templateData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 200) {
          router.push(`/dashboard/${currentGuildId}/greet/${target}`);
        }
      } catch (error) {
        console.log('Plain Template Update Error: ', error);
      }
    } else {
      // Create Template
      try {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template`,
          templateData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 201) {
          reset();
          router.push(`/dashboard/${currentGuildId}/greet/${target}`);
        }
      } catch (error) {
        console.log('Plain Template Create Error: ', error);
      }
    }
  };

  return (
    <div className='grid grid-cols-1 min-h-screen place-items-start gap-10 md:grid-cols-2'>
      {/*Input Field Container  */}
      <div className='order-2 w-full bg-kittyFormBg px-6 py-10 md:order-1'>
        <h2 className='text-md text-white mb-4'>Enter your message</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <input
              placeholder='Template Name'
              type='text'
              className='form-input-field w-full'
              {...register('name')}
            />
            {errors?.name && (
              <p className='text-xs text-red-500 mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <textarea
              placeholder='Your message here...'
              className='form-input-field w-full'
              rows={3}
              cols={50}
              {...register('message')}
            />{' '}
            {errors?.message && (
              <p className='text-xs text-red-500 mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className='bg-[#f8e5af] rounded-md px-4 py-2 float-right mt-4 disabled:opacity-75'
          >
            {templateToEdit ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
      <div className='top-0 order-1 w-full bg-kittyFormBg p-4 md:sticky md:order-2'>
        <div className='mb-4 flex items-center gap-6 '>
          <Image
            src='/assets/images/discord-logo.svg'
            alt='Discord logo'
            width={200}
            height={200}
            className='h-10 w-10 object-contain'
          />
          <h2 className='font-semibold text-white'>Plain Message Preview</h2>
        </div>

        <div className='relative flex h-auto w-full items-start gap-3 rounded-md  bg-kittyNeutralBlack px-4 py-4 shadow-xl'>
          <Image
            className='h-12 w-auto rounded-full'
            src='/assets/images/kitty-chan-logo.jpg'
            alt='kitty chan logo'
            width={500}
            height={500}
          />
          <div className='w-full'>
            <div className='flex items-center gap-2'>
              <h2 className='text-sm  tracking-wider text-[#a87ed9]'>
                kitty chan
              </h2>
              <span className='rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-tighter text-white'>
                BOT{' '}
              </span>
            </div>
            <p className='text-white break-words w-[88%]'>
              {message || 'Your message here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlainMessage;
