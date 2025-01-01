import { classNames } from '@/utils';
import { ChangeEventHandler, useRef } from 'react';

type Props = {
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

export const ColorPicker = ({ value, className, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef?.current?.click();
  };

  return (
    <span className="relative" style={{ backgroundColor: value }}>
      <input
        ref={inputRef}
        type="color"
        value={value}
        className="absolute bottom-0 h-1 w-1 opacity-0"
        {...props}
      />
      <button
        onClick={onClick}
        className={className}
        style={{ backgroundColor: value }}
      />
    </span>
  );
};
