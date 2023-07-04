import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Survey, SurveyResponse } from '@/types';

type Props = {
  items: Survey[];
  responses: Record<string, SurveyResponse[]>;
};
const SurveyList = async ({ items, responses }: Props) => {
  return (
    <ul className="grid grid-flow-row">
      {items.map((survey) => {
        const surveyResponseInfo = responses[survey.id] ?? [];
        const responseCount = surveyResponseInfo.length;
        const lastSubmission = surveyResponseInfo.at(-1)?.createdAt;

        return (
          <li key={survey.id} className="w-full p-2">
            <Link href={`/surveys/${survey.id}/create`}>
              <div className="flex flex-col gap-1 rounded-md p-4 hover:bg-slate-100">
                <h4 className="font-sans">{survey.title}</h4>
                <p className="flex gap-1 text-xs text-slate-500">
                  <span>
                    {responseCount} response{responseCount === 1 ? '' : 's'}
                  </span>
                  <span>&#8226;</span>
                  <span>
                    {lastSubmission
                      ? `Last submission was ${formatDistanceToNow(
                          new Date(lastSubmission),
                        )} ago`
                      : 'No submissions received'}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default SurveyList;
