import { YesOrNo, YesOrNoAnswer } from "@/widgets/YesOrNo";
import { SingleChoice, SingleChoiceAnswer } from "@/widgets/SingleChoice";
import { MultipleChoice, MultipleChoiceAnswer } from "@/widgets/MultipleChoice";

export type SurveyStatus = "draft" | "published" | "scheduled";

export type QuestionGeneric<T, WidgetType> = {
  type: T;
  uuid: string;
  title: string;
  widgetSettings: WidgetType;
};

export type SingleChoiceQuestion = QuestionGeneric<
  "single-choice",
  SingleChoice
>;

export type MultipleChoiceQuestion = QuestionGeneric<
  "multiple-choice",
  MultipleChoice
>;

export type YesOrNoQuestion = QuestionGeneric<"yes-or-no", YesOrNo>;

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | YesOrNoQuestion;

export type TypeOf<T extends { type: unknown }> = T["type"];

export type WidgetOf<T extends { widgetSettings: unknown }> =
  T["widgetSettings"];

export type QuestionType = TypeOf<Question>;

export type WidgetOptions = WidgetOf<Question>;

/**
 * See stackoverflow https://stackoverflow.com/a/50125960
 */
export type ByType<T extends Record<K, string>, K extends keyof T> = {
  [V in T[K]]: Extract<T, Record<K, V>>;
};

export type Answer = MultipleChoiceAnswer | SingleChoiceAnswer | YesOrNoAnswer;

export type Survey = {
  id: string;
  title: string;
  description: string;
  status: SurveyStatus;
  questions: Question[];
};
