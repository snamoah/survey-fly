"use client";

import { produce } from "immer";
import { useState } from "react";

import { classNames } from "@/utils";
import { Answer, Survey } from "@/types";
import { QuestionDefinitionMap } from "@/utils/constants";

type Props = {
  survey: Survey;
};

export const QuestionList = ({ survey }: Props) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const submitAnswer = (questionId: string, answer: Answer) => {
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
    <>
      {survey.questions.map((question, index) => {
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
                {questionIndex + 1} of {survey.questions.length}
              </small>
              <h1>{question.title}</h1>
            </header>

            <WidgetComponent
              settings={question.widgetSettings}
              answer={answers[question.uuid]}
              onChange={(answer) => submitAnswer(question.uuid, answer)}
            />

            <footer className="flex justify-end gap-1">
              {questionIndex > 0 && (
                <button className="btn bg-blue-500" onClick={goToPrevious}>
                  Previous
                </button>
              )}
              {questionIndex < survey.questions.length - 1 ? (
                <button
                  disabled={answers[question.uuid] === undefined}
                  className="btn bg-blue-500"
                  onClick={gotoNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
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
    </>
  );
};
