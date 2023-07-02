import Link from "next/link";

import { Survey } from "@/types";

type Props = {
  items: Survey[];
};
const SurveyList = async ({ items }: Props) => (
  <ul className="grid grid-flow-row">
    {items.map((survey) => (
      <li key={survey.id} className="w-full p-2">
        <Link href={`/surveys/${survey.id}/create`}>
          <div className="flex flex-col gap-1 rounded-md p-4 hover:bg-slate-100">
            <h4 className="font-sans">{survey.title}</h4>
            <p className="flex gap-1 text-xs text-slate-500">
              <span>1 response</span>
              <span>&#8226;</span>
              <span>Last submission on </span>
            </p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);
export default SurveyList;
