import { notFound } from 'next/navigation';

import { getSurvey } from '@/lib/storage/database';
import { getResponsesCount } from '@/lib/actions/surveys';

import QuestionsProvider from './components/QuestionsProvider';
import { LayoutComponent } from './components/LayoutComponent';
import { ThemeProvider } from '@/ui/theme';

type Props = {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  const [survey, responsesCount] = await Promise.all([
    getSurvey(params.surveyId),
    getResponsesCount(params.surveyId),
  ]);

  if (!survey) {
    notFound();
  }

  return (
    <QuestionsProvider surveyId={survey.id} initialValue={survey.questions}>
      <ThemeProvider surveyId={survey.id} theme={survey.theme}>
        <LayoutComponent
          survey={survey}
          responsesCount={responsesCount}
          questionsCount={survey.questions.length}
        >
          {children}
        </LayoutComponent>
      </ThemeProvider>
    </QuestionsProvider>
  );
};

export default Layout;
