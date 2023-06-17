export type WidgetSettings<T> = {
  value: T;
  onChange: (value: T) => void;
};


export type WidgetConfig = {
  placeholderText: string;
  
}