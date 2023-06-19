"use server";

import { redirect } from "next/navigation";
import { createSurvey } from "../database";

export const createSurveyAction = async () => {
  const survey = await createSurvey();
  return redirect(`/surveys/${survey.id}/create`);
};
