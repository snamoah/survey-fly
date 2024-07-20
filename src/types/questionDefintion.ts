import { MultipleChoice, MultipleChoiceAnswer } from '@/widgets/MultipleChoice';
import { SingleChoice, SingleChoiceAnswer } from '@/widgets/SingleChoice';
import { YesOrNo, YesOrNoAnswer } from '@/widgets/YesOrNo';

export type QuestionMapType = {
  'multiple-choice': {
    answer: MultipleChoiceAnswer;
    setting: MultipleChoice;
  };
  'single-choice': {
    answer: SingleChoiceAnswer;
    setting: SingleChoice;
  };
  'yes-or-no': {
    answer: YesOrNoAnswer;
    setting: YesOrNo;
  };
};
