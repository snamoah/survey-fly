import { classNames } from "@/utils";
import { SingleChoice, SingleChoiceAnswer } from "./types";

const Radio = ({
  option,
  toggle,
  checked,
}: {
  checked?: boolean;
  option: SingleChoice["options"][number];
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
      <input id={option.key} checked={checked} type="radio" onChange={toggle} />
      <label htmlFor={option.key} className="my-1 text-xs outline-none">
        {option.value}
      </label>
    </li>
  );
};

export const SingleChoiceWidget = ({
  answer,
  settings,
  onChange,
}: {
  settings: SingleChoice;
  answer?: SingleChoiceAnswer;
  onChange: (answer: SingleChoiceAnswer) => void;
}) => {
  return (
    <div className="grid grid-flow-col gap-2">
      {settings.options.map((option) => (
        <Radio
          key={option.key}
          option={option}
          toggle={() => onChange(option.value)}
          checked={answer === option.value}
        />
      ))}
    </div>
  );
};
