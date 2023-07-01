import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  type?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  onChange,
  className,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type ? type : 'text'}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className={`${
        className ? className : 'w-full'
      } block rounded-md border-0 bg-kittyNeutralBlack px-2 py-2 text-white shadow-sm outline-none placeholder:text-kittyTextGray sm:text-sm sm:leading-6`}
    />
  );
};

export default InputField;
