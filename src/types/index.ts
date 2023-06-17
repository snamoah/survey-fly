import { YesOrNo } from "@/widgets/YesOrNo";
import { SingleChoice } from "@/widgets/SingleChoice";
import { MultipleChoice } from "@/widgets/MultipleChoice";

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
