import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';

import { Share } from '@/ui/illustrations';
import { getSurveyResponses } from '@/lib/actions';

type Props = {
  params: { surveyId: string };
};

const EmptyState = ({ surveyId }: { surveyId: string }) => (
  <div className="grid h-full place-content-center">
    <section className="flex  flex-col items-center gap-3">
      <div className="rounded-full bg-sky-200">
        <Share />
      </div>
      <div className="flex w-2/3 flex-col gap-1 text-center">
        <h2>No responses yet</h2>
        <p className="text-xs">
          Start receiving responses to your survey by sharing the link on your
          various platforms.
        </p>
      </div>
      <Link
        href={`/surveys/${surveyId}/share`}
        className="btn bg-orange-500 text-white"
      >
        Share survey
      </Link>
    </section>
  </div>
);

const Page = async ({ params: { surveyId } }: Props) => {
  const responses = await getSurveyResponses(surveyId);

  return isEmpty(responses) ? (
    <EmptyState surveyId={surveyId} />
  ) : (
    <div>
      <h1>Responses</h1>
    </div>
  );
};

export default Page;
