import * as uuid from "uuid";
import { MultipleChoice } from "./MultiChoiceWidget";

export const buildDefaultMultipleChoice = (): MultipleChoice => ({
  options: [
    {
      key: uuid.v4(),
      value: "Option 1",
    },
    {
      key: uuid.v4(),
      value: "Option 2",
    },
    {
      key: uuid.v4(),
      value: "Option 3",
    },
  ],
});
