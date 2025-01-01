import { produce } from 'immer';
import { classNames } from '@/utils';

import { CSSProperties, WidgetProps } from '../types';
import {
  MultipleChoiceAnswer,
  MultipleChoice,
  MultipleChoiceType,
} from './types';
import { useTheme } from '@/ui/theme';

import styles from '../Widget.module.css';

const CheckBox = ({
  option,
  toggle,
  checked,
}: {
  checked: boolean;
  option: MultipleChoice['options'][number];
  toggle: () => void;
}) => {
  const { theme, defaultTheme } = useTheme();

  const hoverBackgroundColor =
    theme.selectedFillColor || defaultTheme.selectedFillColor;

  const backgroundColor = !!checked
    ? hoverBackgroundColor
    : theme.fillColor || defaultTheme.fillColor;

  const color = theme.strokeColor || defaultTheme.strokeColor;

  const cssStyle: CSSProperties = {
    color,
    borderColor: color,
    textAlign: theme.textAlign,
    borderWidth: theme.borderWidth,
    fontWeight: theme.textBold ? 'bold' : 'normal',
    fontStyle: theme.textItalic ? 'italic' : 'normal',
    textDecoration: theme.textUnderline ? 'underline' : 'none',
    letterSpacing: `${theme.letterSpacing}px`,
    lineHeight: `${theme.lineHeight}px`,
    borderTopLeftRadius: `${theme.borderTopLeftRadius}px`,
    borderTopRightRadius: `${theme.borderTopRightRadius}px`,
    borderBottomLeftRadius: `${theme.borderBottomLeftRadius}px`,
    borderBottomRightRadius: `${theme.borderBottomRightRadius}px`,
    '--background-color': backgroundColor,
    '--hover-background-color': hoverBackgroundColor,
  };

  return (
    <li
      style={cssStyle}
      className={classNames(
        styles.WidgetOption,
        'flex h-10 flex-row items-center gap-2 p-2',
        !!checked && 'rounded-md',
      )}
      onClick={toggle}
    >
      <input
        id={option.key}
        checked={checked}
        type="checkbox"
        onChange={toggle}
      />
      <span onClick={toggle} className="my-1 w-full text-xs outline-none">
        {option.value}
      </span>
    </li>
  );
};

export const MultiChoiceWidget = <
  T extends MultipleChoiceType = MultipleChoiceType,
>({
  type,
  settings,
  onChange,
  answer = { type, value: [] },
}: WidgetProps<T, MultipleChoice, MultipleChoiceAnswer>) => {
  const { theme } = useTheme();

  const buildAnswer = (value: MultipleChoiceAnswer) => ({
    type,
    value,
  });

  const toggleOption = (value: string) => {
    onChange(
      buildAnswer(
        produce(answer.value, (draft) => {
          const index = draft.indexOf(value);
          index > -1 ? draft.splice(index, 1) : draft.push(value);
        }),
      ),
    );
  };

  return (
    <div
      className={classNames(
        'grid grid-flow-row gap-2',
        `grid-cols-${theme.gridCols}`,
      )}
    >
      {settings.options.map((option) => (
        <CheckBox
          key={option.key}
          option={option}
          toggle={() => toggleOption(option.value)}
          checked={answer.value.includes(option.value)}
        />
      ))}
    </div>
  );
};
