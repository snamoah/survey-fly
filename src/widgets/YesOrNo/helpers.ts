import { YesOrNo, YesOrNoAnswer } from './types';

export const buildDefaultYesOrNo = (): YesOrNo => ({
  value: false,
});

export const yesOrNoAnswerToString = (answer: YesOrNoAnswer) =>
  answer === true ? 'Yes' : 'No';
