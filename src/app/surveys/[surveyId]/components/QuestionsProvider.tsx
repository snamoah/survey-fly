"use client";
import { produce } from "immer";
import { createContext, useState } from "react";

import { Question, WidgetOf } from "@/types";

type QuestionActionType = {
  selectQuestion: (id: string) => void;
  deleteQuestion: (id: string) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  updateQuestionSettings: (setting: WidgetOf<Question>) => void;
};

type QuestionsContextType = {
  questions: Question[];
  selectedQuestion?: Question;
};

export const QuestionsContext = createContext<QuestionsContextType>({
  questions: [],
});
export const QuestionsActionsContext = createContext<QuestionActionType>({
  addQuestion() {},
  selectQuestion() {},
  updateQuestion() {},
  deleteQuestion() {},
  updateQuestionSettings() {},
});

type Props = {
  initialValue: Question[];
  children: React.ReactNode;
};

const QuestionsProvider = ({ children, initialValue }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(initialValue);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>();

  const addQuestion = (question: Question) => {
    setQuestions(questions.concat([question]));
    setSelectedQuestionId(question.uuid);
  };

  const updateQuestion = (question: Question) => {
    setQuestions(
      produce(questions, (draft) => {
        const index = draft.findIndex(
          (question) => question.uuid === selectedQuestion?.uuid
        );
        if (index > -1) {
          draft[index] = question;
        }
      })
    );
  };

  const updateQuestionSettings = (settings: WidgetOf<Question>) => {
    setQuestions(
      produce(questions, (draft) => {
        const index = draft.findIndex(
          (question) => question.uuid === selectedQuestion?.uuid
        );
        if (index > -1) {
          draft[index].widgetSettings = settings;
        }
      })
    );
  };

  const deleteQuestion = (id: string) => {
    const nextQuestions = questions.filter((question) => question.uuid !== id);
    setQuestions(nextQuestions);

    const newLastQuestion = nextQuestions[nextQuestions.length - 1];
    if (newLastQuestion) {
      setSelectedQuestionId(newLastQuestion.uuid);
    }
  };

  const context = {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    updateQuestionSettings,
    selectQuestion: setSelectedQuestionId,
  };

  const selectedQuestion = questions.find(
    (question) => question.uuid === selectedQuestionId
  );

  return (
    <QuestionsContext.Provider value={{ questions, selectedQuestion }}>
      <QuestionsActionsContext.Provider value={context}>
        {children}
      </QuestionsActionsContext.Provider>
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
