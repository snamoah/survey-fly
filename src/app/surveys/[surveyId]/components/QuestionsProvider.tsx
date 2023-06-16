"use client";
import { produce } from "immer";
import { createContext, useState } from "react";

type QuestionActionType = {
  selectQuestion: (id: string) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
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
});

const QuestionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>();

  const addQuestion = (question: Question) => {
    setQuestions(questions.concat([question]));
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

  const context = {
    addQuestion,
    updateQuestion,
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
