"use client";
import { useContext, useState } from "react";

import { Trash } from "@/ui/icons";

import {
  QuestionsContext,
  QuestionsActionsContext,
} from "../components/QuestionsProvider";
import { QuestionDefinitionMap } from "@/utils/constants/widgetDefinitions";

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
  const { updateQuestion, updateQuestionSettings } = useContext(
    QuestionsActionsContext
  );

  if (!selectedQuestion) {
    return null;
  }

  const onChangeQuestionTitle = (title: string) => {
    updateQuestion({
      ...selectedQuestion,
      title,
    });
  };

  const WidgetComponent =
    QuestionDefinitionMap[selectedQuestion.type].widgetComponent;

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
        <WidgetComponent
          key={selectedQuestion.uuid}
          onChange={updateQuestionSettings}
          value={selectedQuestion.widgetSettings}
        />
      </footer>
    </article>
  );
};

export default Page;
