'use server';

import groupBy from 'lodash/groupBy';
import { notFound, redirect } from 'next/navigation';

import { Question, Survey, SurveyResponsePayload } from '@/types';
import {
  getSurvey,
  updateSurvey,
  createSurvey,
  createSurveyResponse,
  listSurveyResponses,
  listUserSurveys,
  listSurveyResponsesBySurveyOnwerId,
  getSurveyRepsonseByRespondentId,
} from '../storage/database';
import { getUser } from '../auth';

export const createSurveyAction = async () => {
  const user = await getUser();
  const survey = await createSurvey(user.uid);
  return redirect(`/surveys/${survey.id}/create`);
};

export const getSurveyAction = async (surveyId: string) => {
  const survey = await getSurvey(surveyId);
  if (!survey) return notFound();
  return survey;
};

export const getSurveyForSubmissionAction = async (surveyId: string) => {
  const survey = await getSurveyAction(surveyId);
  if (survey.status !== 'published') return notFound();
  return survey;
};

export const updateSurveyQuestionsAction = async (
  surveyId: string,
  questions: Question[],
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
    status: 'published',
    updatedAt: new Date().toISOString(),
  };

  await updateSurvey(surveyId, surveyToUpdate);
  return surveyToUpdate;
};

export const submitSurveyAction = async (survey: SurveyResponsePayload) => {
  const existingSubmission = await getUserSubmission(
    survey.surveyId,
    survey.respondentId,
  );
  if (existingSubmission) {
    return { error: 'You have already made a submission' };
  }
  const response = await createSurveyResponse(survey);
  return { response };
};

export const getUserSubmission = async (
  surveyId: string,
  tmpRespondentId: string,
) => {
  const response = await getSurveyRepsonseByRespondentId(
    surveyId,
    tmpRespondentId,
  );
  return response;
};

export const getUserSurveys = async () => {
  const user = await getUser();
  const surveys = await listUserSurveys(user.uid);
  return surveys;
};

export const getAllSurveyResponses = async () => {
  const user = await getUser();
  const responses = await listSurveyResponsesBySurveyOnwerId(user.uid);
  const surveyResponsesBySurveyId = groupBy(
    responses,
    (response) => response.surveyId,
  );
  return surveyResponsesBySurveyId;
};
