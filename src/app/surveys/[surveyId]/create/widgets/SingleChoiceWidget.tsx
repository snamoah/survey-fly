import { useState } from "react";
import { CloseCircle } from "@/ui/icons";
import { classNames } from "@/utils";

const MAX_OPTIONS_COUNT = 10;

const Input = ({
  value,
  onChange,
  deleteValue,
}: {
  value: string;
  deleteValue: () => void;
  onChange: (value: string) => void;
}) => {
  const [valueToEdit, setValueToEdit] = useState(value);

  return (
    <li className="flex h-10 gap-2 rounded-sm ring-1">
      <div className="grid w-10 place-content-center">
        <span className="h-5 w-3 bg-green-300"></span>
      </div>
      <div className="my-1 grid place-content-center rounded-sm">
        <input type="radio" disabled className="h-11/12 w-11/12" />
      </div>
      <input
        type="text"
        value={valueToEdit}
        onBlur={() => onChange(valueToEdit)}
        onChange={(e) => setValueToEdit(e.target.value)}
        className="my-1 w-full grow text-xs outline-none"
      />
      <div
        onClick={deleteValue}
        className="grid w-12 place-content-center bg-slate-200 hover:cursor-pointer"
      >
        <CloseCircle size={18} />
      </div>
    </li>
  );
};

const SingleChoiceWidget = ({
  options = ["Option 1"],
  onChange,
}: {
  options?: string[];
  onChange: (options: string[]) => void;
}) => {
  const [optionsToEdit, setOptionsToEdit] = useState(options);

  const updateOptionAtIndex = (value: string, index: number) => {
    const newOptions = [...optionsToEdit];
    newOptions[index] = value;
    setOptionsToEdit(newOptions);
  };

  const addOption = () => setOptionsToEdit((prev) => prev.concat([""]));
  const deleteOption = (index: number) =>
    setOptionsToEdit((prev) => prev.filter((_, prevId) => prevId !== index));

  return (
    <ul className="flex flex-col gap-3" onBlur={() => onChange(optionsToEdit)}>
      {optionsToEdit.map((option, index) => (
        <Input
          key={option}
          value={option}
          deleteValue={() => deleteOption(index)}
          onChange={(value) => updateOptionAtIndex(value, index)}
        />
      ))}
      <li
        className={classNames(
          "mt-2 flex gap-2",
          optionsToEdit.length === MAX_OPTIONS_COUNT && "invisible"
        )}
      >
        <button className="btn bg-purple-500" onClick={addOption}>
          Add an option
        </button>
        <button className="btn text-slate-700 ring-1 ring-slate-700">
          Add "Other"
        </button>
      </li>
    </ul>
  );
};

export default SingleChoiceWidget;
