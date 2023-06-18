"use client";
import { produce } from "immer";
import { useContext, useState } from "react";

import { classNames } from "@/utils";
import { QuestionDefinitionMap } from "@/utils/constants";

import { QuestionsContext } from "../components/QuestionsProvider";

const Page = () => {
  const { questions } = useContext(QuestionsContext);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const submitAnswer = (questionId: string, answer: any) => {
    setAnswers(
      produce(answers, (draft) => {
        draft[questionId] = answer;
      })
    );
  };

  const gotoNext = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-hidden">
      <nav className="h-20 w-full bg-slate-400"></nav>
      <p className="grid-row-1 grid h-10 place-content-center bg-yellow-200">
        This is a preview. Publish to allow access to your repsondents
      </p>
      <main className="row-span-3 grid flex-1 grid-cols-1 overflow-auto bg-white">
        <div className="grid grid-rows-1 place-items-center">
          {questions.map((question, index) => {
            const isInactive = questionIndex !== index;
            const WidgetComponent =
              QuestionDefinitionMap[question.type].widgetComponent;

            return (
              <section
                key={question.uuid}
                className={classNames("w-3/5", isInactive && "hidden")}
              >
                <h1>{index + 1}</h1>
                <h1>{question.title}</h1>
                <p>{question.type}</p>

                <WidgetComponent
                  settings={question.widgetSettings}
                  answer={answers[question.uuid]}
                  onChange={(answer) => submitAnswer(question.uuid, answer)}
                />

                <button
                  disabled={!answers[question.uuid]}
                  className="btn bg-blue-500"
                  onClick={gotoNext}
                >
                  Next
                </button>
              </section>
            );
          })}
        </div>
      </main>
      <footer className="h-28 bg-orange-300"></footer>
    </div>
  );
};

export default Page;
