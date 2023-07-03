import { z } from "zod";

const parsedEnv = z
  .object({
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    MAILJET_API_KEY: z.string(),
    MAILJET_API_SECRET: z.string(),
  })
  .parse(process.env);

export const env = (key: keyof typeof parsedEnv) => parsedEnv[key];
