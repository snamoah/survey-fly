import React from 'react';

export type AnswerType<TQuestionType, TAnswerType> = {
  type: TQuestionType;
  value: TAnswerType;
};

export type WidgetSettings<TQuestionType, TSettings> = {
  type: TQuestionType;
} & TSettings;

export type WidgetEditorProps<TQuestionType, TSettings> = {
  type: TQuestionType;
  value: TSettings;
  onChange: (setting: TSettings) => void;
};

export type WidgetProps<T, SettingsType, TAnswerType> = {
  type: T;
  settings: SettingsType;
  answer?: AnswerType<T, TAnswerType>;
  onChange: (value: AnswerType<T, TAnswerType>) => void;
};

export type CSSProperties = React.CSSProperties & {
  '--background-color'?: string;
  '--hover-background-color'?: string;
};
