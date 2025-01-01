export type SingleChoiceType = 'single-choice';

export type SingleChoiceSettings = {
  options: {
    key: string;
    value: string;
  }[];
};

export type SingleChoice = SingleChoiceSettings;

export type SingleChoiceAnswer = string;
