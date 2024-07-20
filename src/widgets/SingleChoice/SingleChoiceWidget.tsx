import { classNames } from '@/utils';

import { WidgetProps } from '../types';
import { SingleChoice, SingleChoiceAnswer, SingleChoiceType } from './types';

const Radio = ({
  option,
  toggle,
  checked,
}: {
  checked?: boolean;
  option: SingleChoice['options'][number];
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
      <input id={option.key} checked={checked} type="radio" onChange={toggle} />
      <label htmlFor={option.key} className="my-1 text-xs outline-none">
        {option.value}
      </label>
    </li>
  );
};

export const SingleChoiceWidget = <
  T extends SingleChoiceType = SingleChoiceType,
>({
  type,
  answer,
  settings,
  onChange,
}: WidgetProps<T, SingleChoice, SingleChoiceAnswer>) => {
  return (
    <div className="grid grid-flow-row gap-2">
      {settings.options.map((option) => (
        <Radio
          key={option.key}
          option={option}
          toggle={() => onChange({ type, value: option.value })}
          checked={answer?.value === option.value}
        />
      ))}
    </div>
  );
};
