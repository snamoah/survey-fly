import { createContext, useState } from "react";

type QuestionActionType = {
  addQuestion: (question: Question) => void;
};

export const QuestionsContext = createContext<Question[]>([]);
export const QuestionsActionsContext = createContext<QuestionActionType>({
  addQuestion() {},
});

const QuestionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Question) =>
    setQuestions((prev) => prev.concat([question]));

  const context = {
    addQuestion,
  };
  return (
    <QuestionsContext.Provider value={questions}>
      <QuestionsActionsContext.Provider value={context}>
        {children}
      </QuestionsActionsContext.Provider>
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
