"use server";

import { notFound, redirect } from "next/navigation";

import { Question, Survey } from "@/types";
import { createSurvey, getSurvey, updateSurvey } from "../database";

export const createSurveyAction = async () => {
  const survey = await createSurvey();
  return redirect(`/surveys/${survey.id}/create`);
};

export const getSurveyAction = async (surveyId: string) => {
  const survey = await getSurvey(surveyId);

  if (!survey) {
    return notFound();
  }

  return survey;
};

export const updateSurveyQuestionsAction = async (
  surveyId: string,
  questions: Question[]
) => {
  const survey = await getSurvey(surveyId);

  if (!survey) {
    return;
  }

  await updateSurvey(surveyId, { ...survey, questions });
};

export const publishSurveyAction = async (surveyId: string) => {
  const survey = await getSurvey(surveyId);

  if (!survey) {
    return;
  }

  const surveyToUpdate: Survey = {
    ...survey,
    status: "published",
    updatedAt: new Date().toISOString(),
  };

  await updateSurvey(surveyId, surveyToUpdate);
  return surveyToUpdate;
};
