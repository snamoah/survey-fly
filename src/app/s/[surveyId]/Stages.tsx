"use client";

import { useCallback, useState } from "react";

import { Welcome } from "./Welcome";
import { ThankYou } from "./ThankYou";
import { QuestionList } from "./QuestionList";
import { submitSurveyAction } from "@/lib/actions";
import { Survey, SurveyResponsePayload } from "@/types";

type Stage = "welcome" | "questionlist" | "thankyou";

type Props = {
  survey: Survey;
};

export const Stages = ({ survey }: Props) => {
  const [stage, setStage] = useState<Stage>("welcome");
  const [error, setError] = useState<string>();

  const submitResponse = useCallback(async (payload: SurveyResponsePayload) => {
    const { error } = await submitSurveyAction(payload);
    error && setError(error)
    setStage("thankyou");
  }, []);

  return stage === "welcome" ? (
    <Welcome onClickStart={() => setStage("questionlist")} />
  ) : stage === "questionlist" ? (
    <QuestionList survey={survey} submitResponse={submitResponse} />
  ) : stage === "thankyou" ? (
    <ThankYou error={error} />
  ) : null;
};
