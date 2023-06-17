import * as uuid from "uuid";
import { SingleChoice } from "./SingleChoiceWidget";

export const buildDefaultSingleChoice = (): SingleChoice => ({
  options: [
    {
      key: uuid.v4(),
      value: "Option 1",
    },
    {
      key: uuid.v4(),
      value: "Option 2",
    },
  ],
});
