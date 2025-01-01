import { getSurveyForSubmissionAction } from '@/lib/actions';

import { Stages } from './Stages';
import { ThemeProvider } from '@/ui/theme';

type Props = {
  params: { surveyId: string };
};

const Page = async ({ params: { surveyId } }: Props) => {
  const survey = await getSurveyForSubmissionAction(surveyId);

  return (
    <main className="grid h-screen w-screen grid-cols-1 place-items-center">
      <section className="flex w-full flex-1 flex-col items-center">
        <ThemeProvider surveyId={survey.id} theme={survey.theme}>
          <Stages survey={survey} />
        </ThemeProvider>
      </section>
    </main>
  );
};

export default Page;
