import { classNames } from '@/utils';

import { WidgetProps } from '../types';
import { YesOrNo, YesOrNoAnswer, YesOrNoType } from './types';

const Radio = ({
  label,
  toggle,
  checked,
}: {
  label: string;
  checked?: boolean;
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
      <input id={label} checked={checked} type="radio" onChange={toggle} />
      <label htmlFor={label} className="my-1 text-xs outline-none">
        {label}
      </label>
    </li>
  );
};

export const YesOrNoWidget = <T extends YesOrNoType = YesOrNoType>({
  type,
  answer,
  onChange,
}: WidgetProps<T, YesOrNo, YesOrNoAnswer>) => {
  return (
    <div className="grid grid-flow-row gap-2">
      <Radio
        label="Yes"
        toggle={() => onChange({ type, value: true })}
        checked={answer?.value === true}
      />
      <Radio
        label="No"
        toggle={() => onChange({ type, value: false })}
        checked={answer?.value === false}
      />
    </div>
  );
};
