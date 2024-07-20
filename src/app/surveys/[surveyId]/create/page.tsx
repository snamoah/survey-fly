'use client';
import { useContext, useState } from 'react';

import { Trash } from '@/ui/icons';
import { Empty } from '@/ui/illustrations';
import { QuestionDefinitionMap } from '@/utils/constants';

import {
  QuestionsContext,
  QuestionsActionsContext,
} from '../components/QuestionsProvider';
import {
  QuestionType,
  WidgetSettingsType,
} from '@/types';

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

type EditorWidgetProps<T extends QuestionType> = {
  type: T;
  settings: WidgetSettingsType<T>;
  onChange: (setting: WidgetSettingsType<T>) => void;
};

const EditorWidget = <TQuestionType extends QuestionType>({
  type,
  settings,
  onChange,
}: EditorWidgetProps<TQuestionType>) => {
  const Editor = QuestionDefinitionMap[type].editorComponent;

  return <Editor type={type} value={settings} onChange={onChange} />;
};

const Page = () => {
  const { selectedQuestion } = useContext(QuestionsContext);
  const { updateQuestion, deleteQuestion, updateQuestionSettings } = useContext(
    QuestionsActionsContext,
  );

  if (!selectedQuestion) {
    return (
      <article className="grid h-full place-items-center">
        <section className="flex flex-col items-center gap-1">
          <div className="p-15 flex-wrap rounded-full bg-cyan-50">
            <Empty />
          </div>

          <h1 className="mt-5 text-center">Start by creating a new question</h1>
          <p className="text-center text-sm">
            Click "Add your first question" to create your first question
          </p>
        </section>
      </article>
    );
  }

  const onChangeQuestionTitle = (title: string) => {
    updateQuestion({
      ...selectedQuestion,
      title,
    });
  };

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
        <EditorWidget
          settings={selectedQuestion.widgetSettings}
          type={selectedQuestion.type}
          onChange={updateQuestionSettings}
        />
      </footer>
    </article>
  );
};

export default Page;
