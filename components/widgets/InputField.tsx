import React, { ChangeEvent } from "react";

interface InputFieldProps {
  type?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  onChange,
  className,
  label,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={label} className="text-white text-sm font-semibold">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${
          className ? className : "w-full"
        } form-input-field placeholder:text-xs  mt-2`}
      />
    </div>
  );
};

export default InputField;
