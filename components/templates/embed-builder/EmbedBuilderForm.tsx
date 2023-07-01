/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from '@/components/widgets/InputField';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';
import { motion } from 'framer-motion';

interface EmbedBuilderFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  tumbnailURL: string;
  setTumbnailURL: React.Dispatch<React.SetStateAction<string>>;
  fields: Array<{ name: string; value: string; inline: boolean }>;
  setFields: React.Dispatch<React.SetStateAction<any>>;
  embedURL: string;
  setEmbedURL: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  timestamp: string;
  setTimestamp: React.Dispatch<React.SetStateAction<string>>;
  authorName: string;
  setAuthorName: React.Dispatch<React.SetStateAction<string>>;
  authorURL: string;
  setAuthorURL: React.Dispatch<React.SetStateAction<string>>;
  authorIconURL: string;
  setAuthorIconURL: React.Dispatch<React.SetStateAction<string>>;
  footerText: string;
  setFooterText: React.Dispatch<React.SetStateAction<string>>;
  footerIconURL: string;
  setFooterIconURL: React.Dispatch<React.SetStateAction<string>>;
}

const EmbedBuilderForm = ({
  title,
  setTitle,
  description,
  setDescription,
  color,
  setColor,
  tumbnailURL,
  setTumbnailURL,
  fields,
  setFields,
  embedURL,
  setEmbedURL,
  image,
  setImage,
  timestamp,
  setTimestamp,
  authorName,
  setAuthorName,
  authorURL,
  setAuthorURL,
  authorIconURL,
  setAuthorIconURL,
  footerText,
  setFooterText,
  footerIconURL,
  setFooterIconURL,
}: EmbedBuilderFormProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  const handleFieldChange = (
    index: number,
    fieldKey: string,
    value: string
  ) => {
    const updatedFields: any = [...fields];
    updatedFields[index][fieldKey] = value;
    setFields(updatedFields);
  };

  const handleAddField = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFields([...fields, { name: '', value: '', inline: true }]);
  };

  const handleRemoveField = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { current } = textareaRef;
      if (current) {
        const { selectionStart, selectionEnd } = current;
        const newContent =
          description.substring(0, selectionStart) +
          '\n' +
          description.substring(selectionEnd);
        setDescription(newContent);
        current.selectionStart = selectionEnd + 1;
        current.selectionEnd = selectionEnd + 1;
      }
    }
  };

  const handleInlineChange = (index: number, value: boolean) => {
    const updatedFields = [...fields];
    updatedFields[index].inline = value;
    setFields(updatedFields);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      description,
      url: embedURL,
      color: `0x${parseInt(color.replace('#', ''), 16).toString(16)}`,
      fields,
      image: {
        url: image,
      },
      timestamp,
      thumbnail: {
        url: tumbnailURL,
      },
      author: {
        name: authorName,
        url: authorURL,
        icon_url: authorIconURL,
      },
      footer: {
        text: footerText,
        icon_url: footerIconURL,
      },
    };
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit} className='relative'>
      <div className='shrink-0 space-y-6'>
        <InputField
          placeholder='Embed Title'
          value={title}
          onChange={setTitle}
        />

        <textarea
          ref={textareaRef}
          placeholder='Embed Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className='form-input-field w-full'
          rows={3}
          cols={50}
        />

        <InputField
          placeholder='Embed URL'
          value={embedURL}
          onChange={setEmbedURL}
        />

        <div className='relative flex items-center gap-4'>
          <div
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-kittyNeutralBlack'
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          >
            <Image
              src='/assets/icons/color-palette.svg'
              alt='Color Palette'
              width={200}
              height={200}
              className='h-6 w-6'
            />
          </div>
          <InputField
            placeholder='#000000'
            value={color}
            onChange={setColor}
            className='w-[40%]'
          />
          {displayColorPicker && (
            <div className='absolute top-12 z-10'>
              <div
                className='fixed inset-0 cursor-pointer'
                onClick={() => setDisplayColorPicker(false)}
              ></div>
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          )}
        </div>

        <div className='py-2 text-white'>
          <h2 className='mb-3 text-sm font-semibold tracking-wide'>Fields</h2>
          <ul className='space-y-6'>
            {fields.map((field, index) => (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                key={index}
                className='relative flex flex-col gap-2'
              >
                <input
                  type='text'
                  placeholder='Name of the embed field'
                  className='form-input-field w-[75%]'
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, 'name', e.target.value)
                  }
                />
                <input
                  type='text'
                  placeholder='Value of the embed field'
                  className='form-input-field w-[75%]'
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, 'value', e.target.value)
                  }
                />

                <div>
                  <input
                    type='checkbox'
                    checked={field.inline}
                    onChange={(e) =>
                      handleInlineChange(index, e.target.checked)
                    }
                    className='h-4 w-4 cursor-pointer rounded bg-kittyNeutralBlack text-kittyNeutralBlack focus:ring-0'
                  />
                  <label className='ml-2 text-sm font-medium text-white '>
                    Inline
                  </label>
                </div>

                <button
                  className='absolute right-6 top-1 flex items-center gap-1 md:right-4 lg:right-12 2xl:right-16'
                  onClick={(e) => handleRemoveField(e, index)}
                >
                  <AiOutlineCloseCircle size={20} className='text-red-500' />
                  <p className='-mt-1 text-xs'>Close</p>
                </button>
              </motion.li>
            ))}
          </ul>
          <button
            onClick={handleAddField}
            className='mt-6 flex cursor-pointer items-center gap-2 transition active:scale-90'
          >
            <CiCirclePlus size={22} />
            <p className='text-sm'>Add Field</p>
          </button>
        </div>

        <InputField
          placeholder='Timestamp for the embed'
          value={timestamp}
          onChange={setTimestamp}
        />

        <InputField
          value={image}
          onChange={setImage}
          placeholder='Source url of image'
        />

        <InputField
          value={tumbnailURL}
          onChange={setTumbnailURL}
          placeholder='Source url of tumbnail'
        />

        {/*Author  */}
        <div>
          <h2 className='mb-3 text-sm font-semibold tracking-wide text-white'>
            Author
          </h2>{' '}
          <div className='space-y-2'>
            <InputField
              placeholder='name'
              value={authorName}
              onChange={setAuthorName}
            />
            <InputField
              placeholder='url'
              value={authorURL}
              onChange={setAuthorURL}
            />
            <InputField
              placeholder='icon_url'
              value={authorIconURL}
              onChange={setAuthorIconURL}
            />
          </div>
        </div>

        <div>
          <h2 className='mb-3 text-sm font-semibold tracking-wide text-white'>
            Footer
          </h2>{' '}
          <div className='space-y-2'>
            <InputField
              placeholder='text'
              value={footerText}
              onChange={setFooterText}
            />
            <InputField
              placeholder='icon_url'
              value={footerIconURL}
              onChange={setFooterIconURL}
            />
          </div>
        </div>
      </div>
      <button className='my-4 h-8 w-20 rounded-md bg-[#f5dea3] text-sm tracking-wide'>
        Save
      </button>
    </form>
  );
};

export default EmbedBuilderForm;
