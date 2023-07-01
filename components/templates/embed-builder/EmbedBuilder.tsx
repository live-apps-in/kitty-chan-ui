'use client';
import React, { useState } from 'react';
import EmbedBuilderForm from './EmbedBuilderForm';
import EmbedBuilderPreview from './EmbedBuilderPreview';

const EmbedBuilder = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [embedURL, setEmbedURL] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const [fields, setFields] = useState<
    [{ name: string; value: string; inline: boolean }]
  >([{ name: '', value: '', inline: true }]);
  const [tumbnailURL, setTumbnailURL] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  // Author
  const [authorName, setAuthorName] = useState<string>('');
  const [authorURL, setAuthorURL] = useState<string>('');
  const [authorIconURL, setAuthorIconURL] = useState<string>('');

  // Footer
  const [footerText, setFooterText] = useState<string>('');
  const [footerIconURL, setFooterIconURL] = useState<string>('');

  return (
    <div className='grid grid-cols-1 place-items-start gap-10 md:grid-cols-2'>
      <div className='order-2 w-full bg-kittyFormBg px-6 py-10 md:order-1'>
        <EmbedBuilderForm
          setTitle={setTitle}
          title={title}
          setDescription={setDescription}
          description={description}
          color={color}
          setColor={setColor}
          tumbnailURL={tumbnailURL}
          setTumbnailURL={setTumbnailURL}
          authorName={authorName}
          setAuthorName={setAuthorName}
          footerText={footerText}
          setFooterText={setFooterText}
          fields={fields}
          setFields={setFields}
          image={image}
          setImage={setImage}
          embedURL={embedURL}
          setEmbedURL={setEmbedURL}
          timestamp={timestamp}
          setTimestamp={setTimestamp}
          authorURL={authorURL}
          setAuthorURL={setAuthorURL}
          authorIconURL={authorIconURL}
          setAuthorIconURL={setAuthorIconURL}
          footerIconURL={footerIconURL}
          setFooterIconURL={setFooterIconURL}
        />
      </div>
      <div className='top-0 order-1 w-full bg-kittyFormBg p-4 md:sticky md:order-2'>
        <EmbedBuilderPreview
          title={title}
          description={description}
          color={color}
          tumbnailURL={tumbnailURL}
          fields={fields}
          embedURL={embedURL}
          image={image}
          timestamp={timestamp}
          authorName={authorName}
          authorURL={authorURL}
          authorIconURL={authorIconURL}
          footerText={footerText}
          footerIconURL={footerIconURL}
        />
      </div>
    </div>
  );
};

export default EmbedBuilder;
