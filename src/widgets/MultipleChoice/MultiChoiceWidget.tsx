import * as uuid from "uuid";
import { produce } from "immer";
import { useState } from "react";
import { classNames } from "@/utils";
import { CloseCircle } from "@/ui/icons";

import { WidgetSettings } from "../types";
import { buildDefaultMultipleChoice } from "./helpers";

const MAX_OPTIONS_COUNT = 10;

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
        <input type="checkbox" disabled className="h-11/12 w-11/12" />
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

  const deleteOption = (id: string) =>
    onChange(
      produce(value, (draft) => {
        draft.options = draft.options.filter((option) => option.key !== id);
      })
    );

  const addOtherOption = () => {
    onChange(
      produce(value, (draft) => {
        draft.options.push({
          key: uuid.v4(),
          value: "Other",
        });
      })
    );
  };

  const isActionFooterInvisible =
    value.options.length === MAX_OPTIONS_COUNT ||
    value.options[value.options.length - 1].value === "Other";

  return (
    <ul className="flex flex-col gap-3">
      {value.options.map((option) => (
        <Input
          key={option.key}
          value={option.value}
          deleteValue={() => deleteOption(option.key)}
          onChange={(value) => updateOptionAtIndex(value, option.key)}
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
