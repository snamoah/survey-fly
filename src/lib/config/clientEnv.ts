import { z } from 'zod';

const parsedEnv = z
  .object({
    NEXT_PUBLIC_SURVEY_DOMAIN: z.string(),
  })
  .parse(process.env);

export const clientEnv = (key: keyof typeof parsedEnv) => parsedEnv[key];
