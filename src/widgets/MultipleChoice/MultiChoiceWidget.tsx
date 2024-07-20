import { produce } from 'immer';
import { classNames } from '@/utils';

import { WidgetProps } from '../types';
import {
  MultipleChoiceAnswer,
  MultipleChoice,
  MultipleChoiceType,
} from './types';

const CheckBox = ({
  option,
  toggle,
  checked,
}: {
  checked: boolean;
  option: MultipleChoice['options'][number];
  toggle: () => void;
}) => {
  return (
    <li
      className={classNames(
        'flex h-10 flex-row items-center gap-2 rounded-sm p-2 ring-1 ring-slate-500 hover:cursor-pointer hover:bg-slate-100',
        !!checked && 'rounded-md bg-slate-100',
      )}
      onClick={toggle}
    >
      <input
        id={option.key}
        checked={checked}
        type="checkbox"
        onChange={toggle}
      />
      <label htmlFor={option.key} className="my-1 text-xs outline-none">
        {option.value}
      </label>
    </li>
  );
};

export const MultiChoiceWidget = <
  T extends MultipleChoiceType = MultipleChoiceType,
>({
  type,
  settings,
  onChange,
  answer = { type, value: [] },
}: WidgetProps<T, MultipleChoice, MultipleChoiceAnswer>) => {
  const buildAnswer = (value: MultipleChoiceAnswer) => ({
    type,
    value,
  });

  const toggleOption = (value: string) => {
    onChange(
      buildAnswer(
        produce(answer.value, (draft) => {
          const index = draft.indexOf(value);
          index > -1 ? draft.splice(index, 1) : draft.push(value);
        }),
      ),
    );
  };

  return (
    <div className="grid grid-flow-row gap-2">
      {settings.options.map((option) => (
        <CheckBox
          key={option.key}
          option={option}
          toggle={() => toggleOption(option.value)}
          checked={answer.value.includes(option.value)}
        />
      ))}
    </div>
  );
};
