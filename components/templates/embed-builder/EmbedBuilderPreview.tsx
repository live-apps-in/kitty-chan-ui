import Image from 'next/image';
import React from 'react';

interface EmbedBuilderPreviewProps {
  name: string;
  description: string;
  color: string;
  tumbnailURL: string;
  author: string;
  footer: string;
  fields: Array<{ name: string; value: string }>;
  embedURL: string;
  image: string;
  timestamp: string;
}

const EmbedBuilderPreview = ({
  name,
  description,
  color,
  tumbnailURL,
  author,
  footer,
  fields,
  image,
  embedURL,
  timestamp,
}: EmbedBuilderPreviewProps) => {
  return (
    <div>
      {/* Embed Preview text section */}
      <div className='mb-4 flex items-center gap-6'>
        <Image
          src='/assets/images/discord-logo.svg'
          alt='Discord logo'
          width={200}
          height={200}
          className='h-10 w-10 object-contain'
        />
        <h2 className='font-semibold text-white'>Embed Preview</h2>
      </div>

      {/* Embed Preview */}
      <div className='relative h-auto min-w-full rounded-md bg-kittyNeutralBlack px-5 py-3 text-white'>
        {/* Left Border  */}
        <span
          className='absolute left-0 top-0 h-full w-[6px] rounded-l-md'
          style={{ backgroundColor: color }}
        ></span>

        {/* Author */}
        <h6 className='mb-2'>{author}</h6>

        {/* Title */}
        <h2 className='mb-1 font-semibold'>
          {embedURL ? (
            <a
              href={embedURL}
              target='_blank'
              className='text-[#fce4a8] underline-offset-2 hover:underline'
            >
              {name}
            </a>
          ) : (
            name
          )}
        </h2>
        <p className='text-sm'>{description}</p>

        {/* Fields */}
        <ul className='mt-4 flex flex-wrap items-start gap-6'>
          {fields.map((field, index) => (
            <div key={index}>
              <h2 className='mb-1 font-semibold'>{field.name}</h2>
              <p>{field.value}</p>
            </div>
          ))}
        </ul>

        {/*Image  */}
        <img src={image} alt='' className='mt-4 h-auto w-52 rounded-md' />

        {/*Tumbnail  */}
        <img
          src={tumbnailURL}
          alt=''
          className='absolute right-4 top-4 h-auto w-14 rounded-md'
        />

        {/* Footer & Timestamp */}
        <div className='mt-1 flex items-center gap-1'>
          <p className='text-xs'>{footer}</p>
          {footer && timestamp && <p>•</p>}
          <p className='text-xs'>{timestamp && 'few seconds ago'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmbedBuilderPreview;
