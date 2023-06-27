"use server";

import * as uuid from "uuid";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { Question, Survey, SurveyResponsePayload } from "@/types";
import {
  getSurvey,
  updateSurvey,
  createSurvey,
  createSurveyResponse,
  listSurveyResponses,
} from "../storage/database";

export const createSurveyAction = async () => {
  const survey = await createSurvey();
  return redirect(`/surveys/${survey.id}/create`);
};

export const getSurveyAction = async (surveyId: string) => {
  const survey = await getSurvey(surveyId);
  if (!survey) return notFound();
  return survey;
};

export const getSurveyForSubmissionAction = async (surveyId: string) => {
  const survey = await getSurveyAction(surveyId);
  if (survey.status !== "published") return notFound();
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

export const submitSurveyAction = async (survey: SurveyResponsePayload) => {
  const existingSubmission = await getUserSubmission(
    survey.surveyId,
    survey.respondentId
  );
  if (existingSubmission) {
    return { error: "You have already made a submission" };
  }
  const response = await createSurveyResponse(survey);
  return { response };
};

export const getUserSubmission = async (
  surveyId: string,
  tmpRespondentId: string
) => {
  const responses = await listSurveyResponses(surveyId);
  console.log({ responses });
  const filtered = responses.filter(
    (response) =>
      response.respondentId === tmpRespondentId ||
      response.tmpRespondentId === tmpRespondentId
  );

  return filtered.at(0);
};
