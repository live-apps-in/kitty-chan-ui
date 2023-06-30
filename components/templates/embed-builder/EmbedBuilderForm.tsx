import Image from 'next/image';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';

interface EmbedBuilderFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  tumbnailURL: string;
  setTumbnailURL: React.Dispatch<React.SetStateAction<string>>;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  footer: string;
  setFooter: React.Dispatch<React.SetStateAction<string>>;
  fields: Array<{ name: string; value: string }>;
  setFields: React.Dispatch<React.SetStateAction<any>>;
  embedURL: string;
  setEmbedURL: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  timestamp: string;
  setTimestamp: React.Dispatch<React.SetStateAction<string>>;
}

const EmbedBuilderForm = ({
  name,
  setName,
  description,
  setDescription,
  color,
  setColor,
  tumbnailURL,
  setTumbnailURL,
  author,
  setAuthor,
  footer,
  setFooter,
  fields,
  setFields,
  embedURL,
  setEmbedURL,
  image,
  setImage,
  timestamp,
  setTimestamp,
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
    setFields([...fields, { name: '', value: '' }]);
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

  return (
    <form>
      <div className='space-y-6'>
        <input
          type='text'
          name='name'
          placeholder='Title'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />
        <input
          type='text'
          name='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />

        <input
          type='text'
          name='embedURL'
          value={embedURL}
          onChange={(e) => setEmbedURL(e.target.value)}
          placeholder='Embed URL'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
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
          <input
            type='text'
            name='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='block w-[40%] rounded-md border-0 bg-kittyNeutralBlack px-2 py-2 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
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
          <h2 className='mb-4 font-semibold'>Fields</h2>
          <ul className='space-y-6'>
            {fields.map((field, index) => (
              <li key={index} className='relative flex flex-col gap-2'>
                <input
                  type='text'
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, 'name', e.target.value)
                  }
                  placeholder='Field Name'
                  className='block w-[75%] rounded-md border-0 bg-kittyNeutralBlack px-2 py-2 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
                />
                <input
                  type='text'
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, 'value', e.target.value)
                  }
                  placeholder='Field Value'
                  className='block w-[75%] rounded-md border-0 bg-kittyNeutralBlack px-2 py-2 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
                />
                <button
                  className='absolute right-12 top-1 flex items-center gap-1'
                  onClick={(e) => handleRemoveField(e, index)}
                >
                  <AiOutlineCloseCircle size={20} className='text-red-500' />
                  <p className='-mt-1 text-xs'>Close</p>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddField}
            className='mt-3 flex cursor-pointer items-center gap-2'
          >
            <CiCirclePlus size={22} />
            <p className='text-sm'>Add Field</p>
          </button>
        </div>

        <input
          type='text'
          name='timestamp'
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder='Timestamp'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />

        <input
          type='text'
          name='image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image Url'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />

        <input
          type='text'
          name='tumbnailURL'
          value={tumbnailURL}
          onChange={(e) => setTumbnailURL(e.target.value)}
          placeholder='Tumbnail Url'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />

        <input
          type='text'
          name='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />

        <input
          type='text'
          name='footer'
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          placeholder='Footer'
          className='block w-full rounded-md border-0 bg-kittyNeutralBlack px-2 py-1.5 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6'
        />
      </div>
    </form>
  );
};

export default EmbedBuilderForm;
