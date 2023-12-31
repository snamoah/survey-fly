import { nanoid } from 'nanoid';
import type { ComponentType } from 'react';

import {
  Answer,
  Question,
  QuestionType,
  YesOrNoQuestion,
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
} from '@/types';
import {
  YesOrNoWidget,
  YesOrNoWidgetEditor,
  buildDefaultYesOrNo,
  yesOrNoAnswerToString,
} from '@/widgets/YesOrNo';
import {
  SingleChoiceWidget,
  SingleChoiceWidgetEditor,
  buildDefaultSingleChoice,
  singleChoiceAnswerToString,
} from '@/widgets/SingleChoice';
import {
  MultiChoiceWidget,
  MultipleChoiceWidgetEditor,
  buildDefaultMultipleChoice,
  multipleChoiceAnswerToString,
} from '@/widgets/MultipleChoice';
import { WidgetProps, WidgetSettings } from '@/widgets';
import { Checkbox, Icon, Radio, ThumbUpThumbDown } from '@/ui/icons';

export type QuestionDefinition = {
  type: QuestionType;
  name: string;
  Icon: Icon;
  description: string;
  defaultTitle: string;
  buildQuestion: () => Question;
  widgetComponent: ComponentType<WidgetProps>;
  formatAnswerToString: (answer: any) => string;
  editorComponent: ComponentType<WidgetSettings<any>>;
};

export const QuestionDefinitionMap: Record<QuestionType, QuestionDefinition> = {
  'multiple-choice': {
    name: 'Multiple Choice',
    defaultTitle: '',
    Icon: Checkbox,
    type: 'multiple-choice',
    widgetComponent: MultiChoiceWidget,
    editorComponent: MultipleChoiceWidgetEditor,
    formatAnswerToString: multipleChoiceAnswerToString,
    description: 'Create a multiple choice question',
    buildQuestion() {
      return {
        uuid: nanoid(),
        title: '',
        type: 'multiple-choice',
        widgetSettings: buildDefaultMultipleChoice(),
      } satisfies MultipleChoiceQuestion;
    },
  },
  'single-choice': {
    name: 'Single Choice',
    type: 'single-choice',
    defaultTitle: '',
    widgetComponent: SingleChoiceWidget,
    editorComponent: SingleChoiceWidgetEditor,
    formatAnswerToString: singleChoiceAnswerToString,
    description: 'Create a single choice question',
    Icon: Radio,
    buildQuestion() {
      return {
        uuid: nanoid(),
        title: '',
        type: 'single-choice',
        widgetSettings: buildDefaultSingleChoice(),
      } satisfies SingleChoiceQuestion;
    },
  },
  'yes-or-no': {
    name: 'Yes or No',
    defaultTitle: '',
    Icon: ThumbUpThumbDown,
    type: 'yes-or-no',
    description: 'Create a yes or no question',
    widgetComponent: YesOrNoWidget,
    editorComponent: YesOrNoWidgetEditor,
    formatAnswerToString: yesOrNoAnswerToString,
    buildQuestion() {
      return {
        uuid: nanoid(),
        title: '',
        type: 'yes-or-no',
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
