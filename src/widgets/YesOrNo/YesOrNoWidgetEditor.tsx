import { InputHTMLAttributes, useState } from 'react';
import { WidgetEditorProps } from '../types';
import { YesOrNoSettings, YesOrNoType } from './types';

const Input = ({
  value,
  onChange,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [valueToEdit, setValueToEdit] = useState(value);

  return (
    <li className="flex h-10 gap-2 rounded-sm px-4 py-2 ring-1">
      <div className="my-1 grid place-content-center rounded-sm">
        <input type="radio" disabled />
      </div>
      <input
        {...props}
        type="text"
        value={valueToEdit}
        onBlur={() => onChange(valueToEdit)}
        onChange={(e) => setValueToEdit(e.target.value)}
        className="my-1 w-full grow text-xs outline-none"
      />
    </li>
  );
};

export const YesOrNoWidgetEditor = <T extends YesOrNoType = YesOrNoType>(
  props: WidgetEditorProps<T, YesOrNoSettings>,
) => (
  <ul className="flex flex-col gap-3">
    <Input value="Yes" tabIndex={-1} readOnly={true} onChange={() => {}} />
    <Input value="No" tabIndex={-1} onChange={() => {}} />
  </ul>
);
