import { Survey } from "@/types";

type Props = {
  items: Survey[];
};
const SurveyList = async ({ items }: Props) => (
  <ul>
    {items.map((survey) => (
      <li key={survey.id}>{survey.title}</li>
    ))}
  </ul>
);
export default SurveyList;
