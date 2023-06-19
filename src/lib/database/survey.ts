import * as uuid from "uuid";
import type { Survey } from "@/types";
import { open } from "fs/promises";
import path from "path";

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
  const newSurvey: Survey = {
    id: uuid.v4(),
    questions: [],
    description: "",
    status: "draft",
    title: "New Survey",
  };

  await db.save((await db.get()).set(newSurvey.id, newSurvey));
  return newSurvey;
};

export const getSurvey = async (surveyId: string) => {
  const survey = (await db.get()).get(surveyId);
  return survey;
};
