import { notFound } from "next/navigation";

import { getSurvey } from "@/lib/database";

import QuestionsProvider from "./components/QuestionsProvider";
import { LayoutComponent } from "./components/LayoutComponent";

type Props = {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  console.log(params);
  const survey = await getSurvey(params.surveyId);

  if (!survey) {
    notFound();
  }

  return (
    <QuestionsProvider initialValue={survey.questions}>
      <LayoutComponent survey={survey}>{children}</LayoutComponent>
    </QuestionsProvider>
  );
};

export default Layout;
