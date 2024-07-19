import { Icon } from '@/ui/icons';
import { ComponentType } from 'react';
import { WidgetProps, WidgetSettings } from '@/widgets';
import { QuestionMapType } from './questionDefintion';

export type SurveyStatus = 'draft' | 'published' | 'scheduled';

export type WidgetOf<T extends { widgetSettings: unknown }> =
  T['widgetSettings'];

export type QuestionGeneric<T, WidgetType> = {
  type: T;
  uuid: string;
  title: string;
  widgetSettings: WidgetType;
};

export type QuestionType = keyof QuestionMapType;

export type Question = keyof QuestionMapType extends infer T
  ? T extends keyof QuestionMapType
    ? QuestionGeneric<T, QuestionMapType[T]['setting']>
    : never
  : never;

export type Answer = QuestionMapType[QuestionType]['answer'];

export type AnswerToString<T extends string> = `${T}AnswerToString`;

export type QuestionDefinition<
  T extends QuestionType,
  TQuestionType,
  TSettingType,
  TAnswerType,
> = {
  type: T;
  name: string;
  Icon: Icon;
  description: string;
  defaultTitle: string;
  buildQuestion: () => TQuestionType;
  formatAnswerToString: (answer: TAnswerType) => string;
  widgetComponent: ComponentType<WidgetProps<TSettingType, TAnswerType>>;
  editorComponent: ComponentType<WidgetSettings<TSettingType>>;
};

export type QuestionDefinitionMapType = {
  [T in QuestionType]: QuestionDefinition<
    T,
    QuestionGeneric<T, QuestionMapType[T]['setting']>,
    QuestionMapType[T]['setting'],
    QuestionMapType[T]['answer']
  >;
};

export type Survey = {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  status: SurveyStatus;
  questions: Question[];
};

export type BrowserInfo = {
  language: string;
  userAgent: string;
};

export type SurveyResponse = {
  id: string;
  surveyId: string;
  createdAt: string;
  updatedAt: string;
  surveyOwnerId: string;
  respondentId: string;
  tmpRespondentId: string;
  browserInfo: BrowserInfo;
  answers: Record<string, Answer>;
};

export type SurveyResponsePayload = Omit<
  SurveyResponse,
  'id' | 'createdAt' | 'updatedAt'
>;
