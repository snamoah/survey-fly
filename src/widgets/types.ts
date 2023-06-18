export type WidgetSettings<T> = {
  value: T;
  onChange: (value: T) => void;
};

export type WidgetProps<SettingsType = any, AnswerType = any> = {
  settings: SettingsType;
  answer?: AnswerType;
  onChange: (value: AnswerType) => void;
};
