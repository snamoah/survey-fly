import { WidgetSettings } from '../types';

export type MultipleChoiceType = 'multiple-choice';

export type MultipleChoiceSettings = {
  options: {
    key: string;
    value: string;
  }[];
};
export type MultipleChoice = MultipleChoiceSettings;

export type MultipleChoiceAnswer = string[];
