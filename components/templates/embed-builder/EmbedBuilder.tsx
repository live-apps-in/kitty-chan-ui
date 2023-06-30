'use client';
import React, { useState } from 'react';
import EmbedBuilderForm from './EmbedBuilderForm';
import EmbedBuilderPreview from './EmbedBuilderPreview';

const EmbedBuilder = () => {
  const [author, setAuthor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [embedURL, setEmbedURL] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const [fields, setFields] = useState<[{ name: string; value: string }]>([
    { name: '', value: '' },
  ]);
  const [tumbnailURL, setTumbnailURL] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [footer, setFooter] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  return (
    <div className='flex flex-wrap-reverse items-start gap-10 md:flex-nowrap'>
      <div className='w-full bg-kittyFormBg px-6 py-10'>
        <EmbedBuilderForm
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
          color={color}
          setColor={setColor}
          tumbnailURL={tumbnailURL}
          setTumbnailURL={setTumbnailURL}
          author={author}
          setAuthor={setAuthor}
          footer={footer}
          setFooter={setFooter}
          fields={fields}
          setFields={setFields}
          image={image}
          setImage={setImage}
          embedURL={embedURL}
          setEmbedURL={setEmbedURL}
          timestamp={timestamp}
          setTimestamp={setTimestamp}
        />
      </div>
      <div className='sticky top-0 w-full bg-kittyFormBg p-4'>
        <EmbedBuilderPreview
          name={name}
          description={description}
          color={color}
          tumbnailURL={tumbnailURL}
          author={author}
          footer={footer}
          fields={fields}
          embedURL={embedURL}
          image={image}
          timestamp={timestamp}
        />
      </div>
    </div>
  );
};

export default EmbedBuilder;
