import { nanoid } from 'nanoid';

import { QuestionDefinitionMapType } from '@/types';
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
import { Checkbox, Radio, ThumbUpThumbDown } from '@/ui/icons';

export const QuestionDefinitionMap: QuestionDefinitionMapType = {
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
      };
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
      };
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
      };
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
