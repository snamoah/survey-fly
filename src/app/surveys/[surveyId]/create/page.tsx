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
      autoFocus={true}
      value={valueToEdit}
      onBlur={() => onChange(valueToEdit)}
      onChange={(e) => setValueToEdit(e.target.value)}
      placeholder="Type your question here..."
      className="placeholder h-10 w-full border-b-2 text-base outline-none"
      type="text"
    />
  );
};

const Page = () => {
  const { selectedQuestion } = useContext(QuestionsContext);
  const { updateQuestion, deleteQuestion, updateQuestionSettings } = useContext(
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
    QuestionDefinitionMap[selectedQuestion.type].editorComponent;

  return (
    <article
      key={selectedQuestion.uuid}
      className="m-10 flex flex-col divide-y divide-slate-300 rounded-md ring-1 ring-slate-300"
    >
      <header className="flex flex-col gap-2 p-6">
        <div className="flex justify-end">
          <button
            onClick={() => deleteQuestion(selectedQuestion.uuid)}
            className="btn px-2 ring-1 ring-slate-400"
          >
            <Trash />
          </button>
        </div>
        <TitleInput
          value={selectedQuestion.title}
          onChange={onChangeQuestionTitle}
        />
      </header>
      <footer className="p-6">
        <WidgetComponent
          onChange={updateQuestionSettings}
          value={selectedQuestion.widgetSettings}
        />
      </footer>
    </article>
  );
};

export default Page;
