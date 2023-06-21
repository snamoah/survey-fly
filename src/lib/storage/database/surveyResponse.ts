import path from "path";
import { nanoid } from "nanoid";
import { open } from "fs/promises";

import type { SurveyResponse, SurveyResponsePayload } from "@/types";

const db = {
  async save(data: Map<string, SurveyResponse>) {
    const file = await open(path.resolve("./responses.db"), "w");
    await file.writeFile(JSON.stringify(Object.fromEntries(data)), "utf-8");
    await file.close();
  },
  async get() {
    const file = await open(path.resolve("./responses.db"), "r");
    const rawData = await file.readFile({ encoding: "utf-8" });
    await file.close();

    if (!rawData) {
      return new Map<string, SurveyResponse>();
    }
    const data: Record<string, SurveyResponse> = JSON.parse(rawData);
    return new Map(Object.entries(data));
  },
};

export const createSurveyResponse = async (survey: SurveyResponsePayload) => {
  const now = new Date().toISOString();
  const newSurveyResponse: SurveyResponse = {
    ...survey,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
  };

  await db.save((await db.get()).set(newSurveyResponse.id, newSurveyResponse));
  return newSurveyResponse;
};

export const listSurveyResponses = async () => {
  const responses = Array.from((await db.get()).values());
  return responses;
};

export const getSurveyResponse = async (surveyId: string) => {
  const survey = (await db.get()).get(surveyId);
  return survey;
};
