"use client";
import { useContext, useState } from "react";
import { Trash } from "@/ui/icons";

import MultiChoiceWidget from "./widgets/MultiChoiceWidget";
import SingleChoiceWidget from "./widgets/SingleChoiceWidget";
import {
  QuestionsActionsContext,
  QuestionsContext,
} from "../components/QuestionsProvider";

// const widgetComponentMap: Record<QuestionType, React.FC> = {
//   address: SingleChoiceWidget,
//   "single-choice": SingleChoiceWidget,
//   "multiple-choice": MultiChoiceWidget,
//   signature: SingleChoiceWidget,
//   "input-field": SingleChoiceWidget,
//   "star-rating": SingleChoiceWidget,
//   "yes-or-no": SingleChoiceWidget,
// };

const TitleInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [valueToEdit, setValueToEdit] = useState(value);

  return (
    <input
      onBlur={() => onChange(valueToEdit)}
      value={valueToEdit}
      onChange={(e) => setValueToEdit(e.target.value)}
      placeholder="Type your question here..."
      className="placeholder h-10 w-full border-b-2 text-base outline-none"
      type="text"
    />
  );
};

const Page = () => {
  const { selectedQuestion } = useContext(QuestionsContext);
  const { updateQuestion } = useContext(QuestionsActionsContext);

  if (!selectedQuestion) {
    return null;
  }

  const onChangeQuestionTitle = (title: string) => {
    updateQuestion({
      ...selectedQuestion,
      title,
    });
  };
  const onChangeOptions = (options: string[]) =>
    updateQuestion({
      ...selectedQuestion,
      options,
    });

  // const WidgetComponent = widgetComponentMap[selectedQuestion.type];
  return (
    <article className="m-10 flex flex-col divide-y divide-slate-300 rounded-md ring-1 ring-slate-300">
      <header className="flex flex-col gap-2 p-6">
        <div className="flex justify-end">
          <button className="btn ring-1 ring-slate-800">
            <Trash />
          </button>
        </div>
        <TitleInput
          key={selectedQuestion.uuid}
          value={selectedQuestion.title}
          onChange={onChangeQuestionTitle}
        />
      </header>
      <footer className="p-6">
        {/* <WidgetComponent on /> */}
        <SingleChoiceWidget
          key={selectedQuestion.uuid}
          onChange={onChangeOptions}
          options={selectedQuestion.options}
        />
      </footer>
    </article>
  );
};

export default Page;
