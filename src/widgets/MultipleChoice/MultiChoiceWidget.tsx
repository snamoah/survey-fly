import * as uuid from "uuid";
import { produce } from "immer";
import { InputHTMLAttributes, useState } from "react";

import { classNames } from "@/utils";
import { CloseCircle, VerticalDots } from "@/ui/icons";

import { WidgetSettings } from "../types";
import { buildDefaultMultipleChoice } from "./helpers";

const MAX_OPTIONS_COUNT = 10;
const MIN_OPTIONS = 2;
const OTHER_TEXT = "Other";

export type MultipleChoice = {
  options: {
    key: string;
    value: string;
  }[];
};

const Input = ({
  value,
  onChange,
  deleteValue,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  deleteValue: () => void;
  onChange: (value: string) => void;
}) => {
  const [valueToEdit, setValueToEdit] = useState(value);

  return (
    <li className="flex h-10 flex-row gap-2 rounded-sm p-2 ring-1">
      <div className="flex items-center bg-green-300">
        <VerticalDots size={12} className="fill-slate-300" />
      </div>
      <div className="grid place-content-center">
        <input type="checkbox" disabled />
      </div>
      <input
        {...props}
        type="text"
        value={valueToEdit}
        onBlur={() => onChange(valueToEdit)}
        onChange={(e) => setValueToEdit(e.target.value)}
        className="my-1 grow text-xs outline-none"
      />
      <div
        onClick={deleteValue}
        className="grid w-12 place-content-center hover:cursor-pointer"
      >
        <CloseCircle size={18} />
      </div>
    </li>
  );
};

export const MultipleChoiceWidget = ({
  value = buildDefaultMultipleChoice(),
  onChange,
}: WidgetSettings<MultipleChoice>) => {
  const updateOptionAtIndex = (str: string, id: string) =>
    onChange(
      produce(value, (draft) => {
        const index = draft.options.findIndex((option) => option.key === id);
        draft.options[index].value = str;
      })
    );

  const addOption = () =>
    onChange(
      produce(value, (draft) => {
        draft.options.push({
          key: uuid.v4(),
          value: "",
        });
      })
    );

  const deleteOption = (id: string) => {
    const shouldDelete = value.options.length > MIN_OPTIONS;
    if (shouldDelete) {
      onChange(
        produce(value, (draft) => {
          draft.options = draft.options.filter((option) => option.key !== id);
        })
      );
    }
  };

  const addOtherOption = () => {
    onChange(
      produce(value, (draft) => {
        draft.options.push({
          key: uuid.v4(),
          value: OTHER_TEXT,
        });
      })
    );
  };

  const isActionFooterInvisible =
    value.options.length === MAX_OPTIONS_COUNT ||
    value.options[value.options.length - 1].value === "Other";

  return (
    <ul className="flex flex-col gap-3 bg-yellow-300">
      {value.options.map((option) => (
        <Input
          key={option.key}
          value={option.value}
          placeholder="Type answer option here..."
          readOnly={option.value === OTHER_TEXT}
          deleteValue={() => deleteOption(option.key)}
          onChange={(value) => updateOptionAtIndex(value, option.key)}
          {...(option.value === OTHER_TEXT ? { tabIndex: -1 } : {})}
        />
      ))}
      <li
        className={classNames(
          "mt-2 flex gap-2",
          isActionFooterInvisible && "invisible"
        )}
      >
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
    </ul>
  );
};
