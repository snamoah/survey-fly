import { notFound } from 'next/navigation';

import { getSurvey } from '@/lib/storage/database';

import QuestionsProvider from './components/QuestionsProvider';
import { LayoutComponent } from './components/LayoutComponent';

type Props = {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  const survey = await getSurvey(params.surveyId);

  if (!survey) {
    notFound();
  }

  return (
    <QuestionsProvider surveyId={survey.id} initialValue={survey.questions}>
      <LayoutComponent survey={survey}>{children}</LayoutComponent>
    </QuestionsProvider>
  );
};

export default Layout;
