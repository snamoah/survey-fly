import { nanoid } from 'nanoid';

import type { Survey } from '@/types';

import { db } from '../../config/firebase';

export const surveyCollection = db.collection('surveys');

export const createSurvey = async (userId: string) => {
  const now = new Date().toISOString();
  const newSurvey: Survey = {
    userId,
    id: nanoid(),
    questions: [],
    description: '',
    status: 'draft',
    title: 'New Survey',
    createdAt: now,
    updatedAt: now,
  };

  await surveyCollection.doc(newSurvey.id).set(newSurvey);
  return newSurvey;
};

export const updateSurvey = async (
  surveyId: string,
  survey: Partial<Survey>,
) => {
  const surveyRef = surveyCollection.doc(surveyId);
  const surveyDoc = await surveyRef.get();

  if (!surveyDoc.exists) {
    throw new Error('Survey not found. you can only update an existing survey');
  }

  const surveyToUpdate: Survey = {
    ...(surveyDoc.data() as Survey),
    ...survey,
    updatedAt: new Date().toISOString(),
  };

  await surveyRef.update(surveyToUpdate);
  return surveyToUpdate;
};

export const getSurvey = async (surveyId: string) => {
  const surveyRef = await surveyCollection.doc(surveyId).get();
  return surveyRef.exists ? (surveyRef.data() as Survey) : null;
};

export const listUserSurveys = async (userId: string) => {
  const snapshots = await surveyCollection.where('userId', '==', userId).get();
  const userSurveys: Survey[] = [];
  snapshots.forEach((snapshot) => userSurveys.push(snapshot.data() as Survey));
  return userSurveys;
};
