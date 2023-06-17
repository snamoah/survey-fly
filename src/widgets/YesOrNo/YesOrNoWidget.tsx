import { useState } from "react";
import { WidgetSettings } from "../types";

export type YesOrNo = {
  value: boolean;
};

const Input = ({
  value,
  onChange,
  readonly,
}: {
  value: string;
  readonly?: boolean;
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
        readOnly={readonly}
        onBlur={() => onChange(valueToEdit)}
        onChange={(e) => setValueToEdit(e.target.value)}
        className="my-1 w-full grow text-xs outline-none"
      />
    </li>
  );
};

export const YesOrNoWidget = (props: WidgetSettings<YesOrNo>) => (
  <ul className="flex flex-col gap-3">
    <Input value="Yes" readonly={true} onChange={() => {}} />
    <Input value="No" readonly={true} onChange={() => {}} />
  </ul>
);
