import { classNames } from "@/utils";

import { YesOrNo, YesOrNoAnswer } from "./types";

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
        "flex h-10 flex-row items-center gap-2 rounded-sm p-2 ring-1 ring-slate-500 hover:cursor-pointer hover:bg-slate-100",
        !!checked && "rounded-md ring-blue-600"
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

export const YesOrNoWidget = ({
  answer,
  onChange,
}: {
  settings: YesOrNo;
  answer?: YesOrNoAnswer;
  onChange: (answer: YesOrNoAnswer) => void;
}) => {
  return (
    <div className="grid grid-flow-col gap-2">
      <Radio
        label="YES"
        toggle={() => onChange(true)}
        checked={answer === true}
      />
      <Radio
        label="NO"
        toggle={() => onChange(false)}
        checked={answer === false}
      />
    </div>
  );
};
