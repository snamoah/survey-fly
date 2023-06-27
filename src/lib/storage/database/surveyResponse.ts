import { nanoid } from "nanoid";

import type { SurveyResponse, SurveyResponsePayload } from "@/types";

import { db } from "../firebase";

const responseCollection = db.collection("surveyResponses");

export const createSurveyResponse = async (survey: SurveyResponsePayload) => {
  const now = new Date().toISOString();
  const newSurveyResponse: SurveyResponse = {
    ...survey,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
  };

  await responseCollection.doc(newSurveyResponse.id).set(newSurveyResponse);
  return newSurveyResponse;
};

export const listSurveyResponses = async (surveyId: string) => {
  const snapshots = await responseCollection
    .where("surveyId", "==", surveyId)
    .get();
  const responses: SurveyResponse[] = [];
  snapshots.forEach((snapshot) =>
    responses.push(snapshot.data() as SurveyResponse)
  );
  return responses;
};

export const getSurveyResponse = async (id: string) => {
  const responseRef = await responseCollection.doc(id).get();
  return responseRef.exists ? (responseRef.data() as SurveyResponse) : null;
};
