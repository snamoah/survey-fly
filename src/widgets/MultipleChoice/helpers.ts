import * as uuid from 'uuid';
import type { MultipleChoice, MultipleChoiceAnswer } from './types';

export const buildDefaultMultipleChoice = (): MultipleChoice => ({
  options: [
    {
      key: uuid.v4(),
      value: 'Option 1',
    },
    {
      key: uuid.v4(),
      value: 'Option 2',
    },
    {
      key: uuid.v4(),
      value: 'Option 3',
    },
  ],
});

export const multipleChoiceAnswerToString = (answer: MultipleChoiceAnswer) =>
  answer.join(',');
