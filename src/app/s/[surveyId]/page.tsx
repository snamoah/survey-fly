import { notFound } from "next/navigation";

import { getSurvey } from "@/lib/database";

import { QuestionList } from "./QuestionList";

type Props = {
  params: { surveyId: string };
};

export const Page = async ({ params: { surveyId } }: Props) => {
  const survey = await getSurvey(surveyId);

  if (!survey) {
    return notFound();
  }
  return (
    <main className="grid h-screen w-screen grid-cols-1 place-items-center">
      <section className="flex w-full flex-1 flex-col items-center">
        <QuestionList survey={survey} />
      </section>
    </main>
  );
};

export default Page;
