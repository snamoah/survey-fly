import { Icon } from '@/ui/icons';
import { ComponentType } from 'react';
import { AnswerType, WidgetProps, WidgetEditorProps } from '@/widgets';
import { QuestionMapType } from './questionDefintion';

export type SurveyStatus = 'draft' | 'published' | 'scheduled';

export type WidgetOf<T extends { widgetSettings: unknown }> =
  T['widgetSettings'];

export type QuestionGeneric<T, TWidgetSettingsType> = {
  type: T;
  uuid: string;
  title: string;
  widgetSettings: TWidgetSettingsType;
};

export type QuestionType = keyof QuestionMapType;

export type Question = QuestionType extends infer T
  ? T extends QuestionType
    ? QuestionGeneric<T, QuestionMapType[T]['setting']>
    : never
  : never;

export type WidgetSettingsType<T extends QuestionType> =
  QuestionMapType[T]['setting'];

export type Answer<T extends QuestionType = QuestionType> = AnswerType<
  T,
  QuestionMapType[T]['answer']
>;

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
  widgetComponent: ComponentType<WidgetProps<T, TSettingType, TAnswerType>>;
  editorComponent: ComponentType<WidgetEditorProps<T, TSettingType>>;
};

export type QuestionDefinitionMapType = {
  [T in QuestionType]: QuestionDefinition<
    T,
    QuestionGeneric<T, QuestionMapType[T]['setting']>,
    QuestionMapType[T]['setting'],
    QuestionMapType[T]['answer']
  >;
};

export type Theme = {
  fillColor: string;
  strokeColor: string;
  selectedFillColor: string;
  borderWidth: number;
  gridCols: number;
  borderTopLeftRadius: number;
  borderBottomLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomRightRadius: number;
  textUnderline: boolean;
  textItalic: boolean;
  textBold: boolean;
  borderStyle: 'dashed' | 'solid';
  textAlign: 'start' | 'center' | 'end';
  lineHeight: number;
  letterSpacing: number;
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
  theme?: Theme;
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
