"use client";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { classNames } from "@/utils";
import { CloseCircle } from "@/ui/icons";
import { QuestionDefinitionMap } from "@/utils/constants";

import { QuestionsContext } from "../components/QuestionsProvider";

const Page = () => {
  const router = useRouter();
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

  const gotoNext = () => setQuestionIndex((prevIndex) => prevIndex + 1);
  const goToPrevious = () => setQuestionIndex((prevIndex) => prevIndex - 1);
  const submitSurvey = () => alert("Survey submitted, thanks!");

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-hidden">
      <nav className="flex h-20 w-full justify-end bg-slate-400">
        <menu className="grid w-20 place-items-center">
          <li className="hover:cursor-pointer" onClick={() => router.back()}>
            <CloseCircle className="text-slate-100" size={24} />
          </li>
        </menu>
      </nav>
      <p className="grid-row-1 grid h-10 place-content-center bg-yellow-200 text-slate-600">
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
                className={classNames(
                  "flex w-2/5 flex-col gap-6 py-4",
                  isInactive && "hidden"
                )}
              >
                <header>
                  <small className="mb-5 block font-bold">
                    {questionIndex + 1} of {questions.length}
                  </small>
                  <h1>{question.title}</h1>
                </header>

                <div>
                  <WidgetComponent
                    settings={question.widgetSettings}
                    answer={answers[question.uuid]}
                    onChange={(answer) => submitAnswer(question.uuid, answer)}
                  />
                </div>

                <footer className="flex justify-end gap-1">
                  {questionIndex > 0 && (
                    <button className="btn bg-blue-500" onClick={goToPrevious}>
                      Previous
                    </button>
                  )}
                  {questionIndex < questions.length - 1 ? (
                    <button
                      disabled={answers[question.uuid] === undefined}
                      className="btn bg-blue-500"
                      onClick={gotoNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      disabled={answers[question.uuid] === undefined}
                      className="btn bg-blue-500"
                      onClick={submitSurvey}
                    >
                      Finish
                    </button>
                  )}
                </footer>
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
