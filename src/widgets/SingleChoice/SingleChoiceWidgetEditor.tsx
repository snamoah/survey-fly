import * as uuid from 'uuid';
import { produce } from 'immer';
import { InputHTMLAttributes, useState } from 'react';

import { CloseCircleOutline, VerticalDots } from '@/ui/icons';

import { SingleChoiceSettings, SingleChoiceType } from './types';
import { WidgetEditorProps } from '../types';
import { buildDefaultSingleChoice } from './helpers';
import { useTheme } from '@/ui/theme';
import { classNames } from '@/utils';

const MAX_OPTIONS_COUNT = 10;
const MIN_OPTIONS = 2;
const OTHER_TEXT = 'Other';

const Input = ({
  value,
  onChange,
  deleteValue,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  deleteValue: () => void;
  onChange: (value: string) => void;
}) => {
  const [valueToEdit, setValueToEdit] = useState(value);
  const { theme, defaultTheme } = useTheme();

  const backgroundColor = theme.fillColor || defaultTheme.fillColor;
  const color = theme.strokeColor || defaultTheme.strokeColor;

  return (
    <li
      className="flex h-10 flex-row gap-2 rounded-sm p-2 ring-1"
      style={{
        color,
        backgroundColor,
        borderColor: color,
        textAlign: theme.textAlign,
        borderWidth: theme.borderWidth,
        borderTopLeftRadius: `${theme.borderTopLeftRadius}px`,
        borderTopRightRadius: `${theme.borderTopRightRadius}px`,
        borderBottomLeftRadius: `${theme.borderBottomLeftRadius}px`,
        borderBottomRightRadius: `${theme.borderBottomRightRadius}px`,
      }}
    >
      <div className="flex items-center">
        <VerticalDots size={12} className="fill-slate-300" />
      </div>
      <div className="grid place-content-center">
        <input type="radio" disabled />
      </div>
      <input
        {...props}
        type="text"
        value={valueToEdit}
        onBlur={() => onChange(valueToEdit)}
        onChange={(e) => setValueToEdit(e.target.value)}
        className="my-1 grow text-xs outline-none"
        style={{
          backgroundColor,
          textAlign: theme.textAlign,
          letterSpacing: `${theme.letterSpacing}px`,
          lineHeight: `${theme.lineHeight}px`,
          fontWeight: theme.textBold ? 'bold' : 'normal',
          fontStyle: theme.textItalic ? 'italic' : 'normal',
          textDecoration: theme.textUnderline ? 'underline' : 'none',
        }}
      />
      <div
        onClick={deleteValue}
        className="grid w-12 place-content-center hover:cursor-pointer"
      >
        <CloseCircleOutline size={18} />
      </div>
    </li>
  );
};

export const SingleChoiceWidgetEditor = <
  T extends SingleChoiceType = SingleChoiceType,
>({
  value = buildDefaultSingleChoice(),
  onChange,
}: WidgetEditorProps<T, SingleChoiceSettings>) => {
  const { theme } = useTheme();

  const updateOptionAtIndex = (str: string, id: string) =>
    onChange(
      produce(value, (draft) => {
        const index = draft.options.findIndex((option) => option.key === id);
        draft.options[index].value = str;
      }),
    );

  const addOption = () =>
    onChange(
      produce(value, (draft) => {
        draft.options.push({
          key: uuid.v4(),
          value: '',
        });
      }),
    );

  const deleteOption = (id: string) => {
    const shouldDelete = value.options.length > MIN_OPTIONS;
    if (shouldDelete) {
      onChange(
        produce(value, (draft) => {
          draft.options = draft.options.filter((option) => option.key !== id);
        }),
      );
    }
  };

  const addOtherOption = () =>
    onChange(
      produce(value, (draft) => {
        draft.options.push({
          key: uuid.v4(),
          value: 'Other',
        });
      }),
    );

  const isActionFooterInvisible =
    value.options.length === MAX_OPTIONS_COUNT ||
    value.options[value.options.length - 1].value === 'Other';

  return (
    <ul
      className={classNames(
        'grid grid-flow-row gap-3',
        `grid-cols-${theme.gridCols}`,
      )}
    >
      {value.options.map((option) => (
        <Input
          key={option.key}
          value={option.value}
          readOnly={option.value === OTHER_TEXT}
          placeholder="Type answer option here..."
          deleteValue={() => deleteOption(option.key)}
          onChange={(value) => updateOptionAtIndex(value, option.key)}
          {...(option.value === OTHER_TEXT ? { tabIndex: -1 } : {})}
        />
      ))}
      {!isActionFooterInvisible && (
        <li className="mt-2 flex gap-2">
          <button className="btn bg-purple-500" onClick={addOption}>
            Add an option
          </button>
          <button
            onClick={addOtherOption}
            className="btn text-slate-700 ring-1 ring-slate-700"
          >
            Add "Other"
          </button>
        </li>
      )}
    </ul>
  );
};
