'use client';
import React, { useState } from 'react';
import EmbedBuilderForm from './EmbedBuilderForm';
import EmbedBuilderPreview from './EmbedBuilderPreview';
import { EmbedTemplateDto } from '@/types/Templates';
import { rgbToHex } from '@/utils/utils';

interface EmbedBuilderProps {
  target: string;
  templateToEdit?: EmbedTemplateDto;
  feature: string;
}

const EmbedBuilder = ({
  target,
  templateToEdit,
  feature,
}: EmbedBuilderProps) => {
  const [title, setTitle] = useState<string>(templateToEdit?.embed.title || '');
  const [description, setDescription] = useState<string>(
    templateToEdit?.embed.description || ''
  );
  const [embedURL, setEmbedURL] = useState<string>(
    templateToEdit?.embed.url || ''
  );

  console.log(templateToEdit?.embed);
  const [color, setColor] = useState(
    (templateToEdit && rgbToHex(templateToEdit?.embed?.color)) || ''
  );
  const [fields, setFields] = useState<
    Array<{ name: string; value: string; inline: boolean }>
  >(templateToEdit?.embed.fields || [{ name: '', value: '', inline: true }]);
  
  const [tumbnailURL, setTumbnailURL] = useState<string>(
    templateToEdit?.embed.thumbnail?.url || ''
  );
  const [image, setImage] = useState<string>(
    templateToEdit?.embed.image?.url || ''
  );
  const [timestamp, setTimestamp] = useState<string>(
    templateToEdit?.embed.timestamp || ''
  );

  // Author
  const [authorName, setAuthorName] = useState<string>(
    templateToEdit?.embed.author?.name || ''
  );
  const [authorURL, setAuthorURL] = useState<string>(
    templateToEdit?.embed.author?.url || ''
  );
  const [authorIconURL, setAuthorIconURL] = useState<string>(
    templateToEdit?.embed.author?.icon_url || ''
  );

  // Footer
  const [footerText, setFooterText] = useState<string>(
    templateToEdit?.embed.footer?.text || ''
  );
  const [footerIconURL, setFooterIconURL] = useState<string>(
    templateToEdit?.embed.footer?.icon_url || ''
  );

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
          target={target}
          templateToEdit={templateToEdit}
          feature={feature}
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
