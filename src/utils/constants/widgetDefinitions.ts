import * as uuid from "uuid";
import type { ComponentType } from "react";

import {
  Question,
  QuestionType,
  YesOrNoQuestion,
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
} from "@/types";
import {
  SingleChoiceWidget,
  SingleChoiceWidgetEditor,
  buildDefaultSingleChoice,
} from "@/widgets/SingleChoice";
import {
  MultiChoiceWidget,
  MultipleChoiceWidgetEditor,
  buildDefaultMultipleChoice,
} from "@/widgets/MultipleChoice";
import { Icon, Trash } from "@/ui/icons";
import { WidgetProps, WidgetSettings } from "@/widgets";
import {
  YesOrNoWidget,
  YesOrNoWidgetEditor,
  buildDefaultYesOrNo,
} from "@/widgets/YesOrNo";

export type QuestionDefinition = {
  type: QuestionType;
  name: string;
  Icon: Icon;
  description: string;
  defaultTitle: string;
  buildQuestion: () => Question;
  widgetComponent: ComponentType<WidgetProps>;
  editorComponent: ComponentType<WidgetSettings<any>>;
};

export const QuestionDefinitionMap: Record<QuestionType, QuestionDefinition> = {
  "multiple-choice": {
    name: "Multiple Choice",
    defaultTitle: "",
    Icon: Trash,
    type: "multiple-choice",
    widgetComponent: MultiChoiceWidget,
    editorComponent: MultipleChoiceWidgetEditor,
    description: "Create a multiple choice question",
    buildQuestion() {
      return {
        uuid: uuid.v4(),
        title: "",
        type: "multiple-choice",
        widgetSettings: buildDefaultMultipleChoice(),
      } satisfies MultipleChoiceQuestion;
    },
  },
  "single-choice": {
    name: "Single Choice",
    type: "single-choice",
    defaultTitle: "",
    widgetComponent: SingleChoiceWidget,
    editorComponent: SingleChoiceWidgetEditor,
    description: "Create a single choice question",
    Icon: Trash,
    buildQuestion() {
      return {
        uuid: uuid.v4(),
        title: "",
        type: "single-choice",
        widgetSettings: buildDefaultSingleChoice(),
      } satisfies SingleChoiceQuestion;
    },
  },
  "yes-or-no": {
    name: "Yes or No",
    defaultTitle: "",
    Icon: Trash,
    type: "yes-or-no",
    description: "Create a yes or no question",
    widgetComponent: YesOrNoWidget,
    editorComponent: YesOrNoWidgetEditor,
    buildQuestion() {
      return {
        uuid: uuid.v4(),
        title: "",
        type: "yes-or-no",
        widgetSettings: buildDefaultYesOrNo(),
      } satisfies YesOrNoQuestion;
    },
  },

  // {
  //   id: "address",
  //   name: "Address",
  //   description: "Create a yes or no question",
  // },
  // {
  //   id: "signature",
  //   name: "Signature",
  //   description: "Create a yes or no question",
  // },
  // {
  //   id: "star-rating",
  //   name: "Star Rating",
  //   description: "Create a yes or no question",
  // },
  // {
  //   id: "input-field",
  //   name: "Short Text",
  //   description: "Create a yes or no question",
  // },
};
