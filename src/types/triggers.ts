type UnaryOperator = 'exists' | 'not_exists';

type BinaryOperator = 'is' | 'is_not' | 'contains';

type TriggerOperand = {
  value: string;
};

type BinaryOperatorCondition = {
  op: BinaryOperator;
  left: TriggerOperand;
  right: TriggerOperand;
};

type UnaryOperatorCondition = {
  op: UnaryOperator;
  left: TriggerOperand;
};

type TriggerCondition = UnaryOperatorCondition | BinaryOperatorCondition;

type JumpToAction = {
  type: 'jumpTo';
  questionId: string;
};

type TriggerAction = JumpToAction;

export type Trigger = {
  condition: TriggerCondition;
  actions: TriggerAction[];
};
