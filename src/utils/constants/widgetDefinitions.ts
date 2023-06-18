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
import { Checkbox, Icon, Radio, ThumbUpThumbDown, Trash } from "@/ui/icons";
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
    Icon: Checkbox,
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
    Icon: Radio,
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
    Icon: ThumbUpThumbDown,
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
