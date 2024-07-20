'use client';

import * as uuid from 'uuid';
import { produce } from 'immer';
import { useState } from 'react';

import { classNames } from '@/utils';
import { clientStorage } from '@/lib/storage';
import { QuestionDefinitionMap } from '@/utils/constants';
import {
  Answer,
  QuestionGeneric,
  QuestionType,
  Survey,
  SurveyResponsePayload,
  WidgetSettingsType,
} from '@/types';

type Props = {
  survey: Survey;
  submitResponse: (payload: SurveyResponsePayload) => void;
};

type QuestionWidgetProps<T extends QuestionType> = {
  question: QuestionGeneric<T, WidgetSettingsType<T>>;
  answer: Answer<T>;
  onChange: (answer: Answer<T>) => void;
};

export const QuestionWidget = <TQuestionType extends QuestionType>({
  question,
  answer,
  onChange,
}: QuestionWidgetProps<TQuestionType>) => {
  const WidgetComponent = QuestionDefinitionMap[question.type].widgetComponent;

  return (
    <WidgetComponent
      type={question.type}
      settings={question.widgetSettings}
      answer={answer}
      onChange={onChange}
    />
  );
};

export const QuestionList = ({ survey, submitResponse }: Props) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const submitAnswer = <T extends QuestionType>(
    questionId: string,
    answer: Answer<T>,
  ) => {
    setAnswers(
      produce(answers, (draft) => {
        draft[questionId] = answer;
      }),
    );
  };

  const gotoNext = () => setQuestionIndex((prevIndex) => prevIndex + 1);
  const goToPrevious = () => setQuestionIndex((prevIndex) => prevIndex - 1);

  const onFinish = async () => {
    // TODO: implement anonymous signin instead
    let tmpRespondentId = clientStorage.getItem('tmpRespondentId');
    if (!tmpRespondentId) {
      tmpRespondentId = uuid.v4();
      clientStorage.setItem('tmpRespondentId', tmpRespondentId);
    }

    const response: SurveyResponsePayload = {
      answers,
      tmpRespondentId,
      surveyId: survey.id,
      surveyOwnerId: survey.userId,
      respondentId: tmpRespondentId,
      browserInfo: {
        language: navigator.language,
        userAgent: navigator.userAgent,
      },
    };

    await submitResponse(response);
  };

  return (
    <>
      {survey.questions.map((question, index) => (
        <section
          key={question.uuid}
          className={classNames(
            'flex w-2/5 flex-col gap-6 py-4',
            questionIndex !== index && 'hidden',
          )}
        >
          <header>
            <small className="mb-5 block font-bold">
              {questionIndex + 1} of {survey.questions.length}
            </small>
            <h1>{question.title}</h1>
          </header>

          <QuestionWidget
            question={question}
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
                onClick={onFinish}
              >
                Finish
              </button>
            )}
          </footer>
        </section>
      ))}
    </>
  );
};
