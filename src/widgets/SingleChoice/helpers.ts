import * as uuid from 'uuid';
import { SingleChoice, SingleChoiceAnswer } from './types';

export const buildDefaultSingleChoice = (): SingleChoice => ({
  options: [
    {
      key: uuid.v4(),
      value: 'Option 1',
    },
    {
      key: uuid.v4(),
      value: 'Option 2',
    },
  ],
});

export const singleChoiceAnswerToString = (answer: SingleChoiceAnswer) =>
  answer;
