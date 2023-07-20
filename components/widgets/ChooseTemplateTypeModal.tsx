import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';

interface ChooseTemplateTypeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentGuildId: string | null;
  target: string; // welcome or farewell
  feature: string;
}

export default function ChooseTemplateTypeModal({
  open,
  setOpen,
  currentGuildId,
  target,
  feature,
}: ChooseTemplateTypeModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <div className='mt-3 text-center sm:mt-2'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900 pb-4'
                    >
                      Choose Template Type
                    </Dialog.Title>
                    <div className='mt-2 space-x-6'>
                      <Link
                        href={`/dashboard/${currentGuildId}/${feature}/${target}/plain`}
                        className='bg-black px-4 py-2 text-white text-sm tracking-wide rounded-full font-semibold'
                      >
                        Plain
                      </Link>
                      <Link
                        href={`/dashboard/${currentGuildId}/${feature}/${target}/embed`}
                        className='bg-black px-4 py-2 text-white text-sm tracking-wide rounded-full font-semibold'
                      >
                        Embed
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
