import { nanoid } from 'nanoid';

import type { SurveyResponse, SurveyResponsePayload } from '@/types';

import { db } from '../../config/firebase';
import { surveyCollection } from './survey';

const getCollection = (surveyId: string) =>
  surveyCollection.doc(surveyId).collection('surveyResponses');

export const createSurveyResponse = async (survey: SurveyResponsePayload) => {
  const now = new Date().toISOString();
  const newSurveyResponse: SurveyResponse = {
    ...survey,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
  };

  const responseCollection = getCollection(survey.surveyId);
  await responseCollection.doc(newSurveyResponse.id).set(newSurveyResponse);
  return newSurveyResponse;
};

export const listSurveyResponses = async (surveyId: string, userId: string) => {
  const responseCollection = getCollection(surveyId);
  const snapshots = await responseCollection
    .where('surveyId', '==', surveyId)
    .where('surveyOwnerId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
  const responses: SurveyResponse[] = [];
  snapshots.forEach((snapshot) =>
    responses.push(snapshot.data() as SurveyResponse),
  );
  return responses;
};

export const getSurveyResponse = async (surveyId: string, id: string) => {
  const responseCollection = getCollection(surveyId);
  const responseRef = await responseCollection.doc(id).get();
  return responseRef.exists ? (responseRef.data() as SurveyResponse) : null;
};

export const getSurveyRepsonseByRespondentId = async (
  surveyId: string,
  respondentId: string,
) => {
  const responseCollection = getCollection(surveyId);

  const snapshots = await responseCollection
    .where('respondentId', '==', respondentId)
    .get();
  const actual: SurveyResponse[] = [];
  snapshots.forEach((snapshot) =>
    actual.push(snapshot.data() as SurveyResponse),
  );
  return actual.at(0);
};

export const listSurveyResponsesBySurveyOnwerId = async (userId: string) => {
  const snapshotsRef = await db
    .collectionGroup('surveyResponses')
    .where('surveyOwnerId', '==', userId)
    .get();
  const list: SurveyResponse[] = [];
  snapshotsRef.forEach((snapshot) =>
    list.push(snapshot.data() as SurveyResponse),
  );
  return list;
};
