import path from "path";
import { nanoid } from "nanoid";
import { open } from "fs/promises";

import type { Survey } from "@/types";

const db = {
  async save(data: Map<string, Survey>) {
    const file = await open(path.resolve("./surveys.db"), "w");
    await file.writeFile(JSON.stringify(Object.fromEntries(data)), "utf-8");
    await file.close();
  },
  async get() {
    const file = await open(path.resolve("./surveys.db"), "r");
    const rawData = await file.readFile({ encoding: "utf-8" });
    await file.close();

    if (!rawData) {
      return new Map<string, Survey>();
    }
    const data: Record<string, Survey> = JSON.parse(rawData);
    return new Map(Object.entries(data));
  },
};

export const createSurvey = async () => {
  const now = new Date().toISOString();
  const newSurvey: Survey = {
    id: nanoid(),
    questions: [],
    description: "",
    status: "draft",
    title: "New Survey",
    createdAt: now,
    updatedAt: now,
  };

  await db.save((await db.get()).set(newSurvey.id, newSurvey));
  return newSurvey;
};

export const updateSurvey = async (
  surveyId: string,
  survey: Partial<Survey>
) => {
  const surveys = await db.get();
  const existingSurvey = surveys.get(surveyId);

  if (!existingSurvey) {
    throw new Error("Survey not found. you can only update an existing survey");
  }

  const surveyToUpdate: Survey = {
    ...existingSurvey,
    ...survey,
    ...(Object.keys(survey).length === 0
      ? {}
      : { updatedAt: new Date().toISOString() }),
  };

  surveys.set(surveyId, surveyToUpdate);
  await db.save(surveys);
  return surveyToUpdate;
};

export const getSurvey = async (surveyId: string) => {
  const survey = (await db.get()).get(surveyId);
  return survey;
};
