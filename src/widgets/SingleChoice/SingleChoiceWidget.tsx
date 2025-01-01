import { classNames } from '@/utils';

import { CSSProperties, WidgetProps } from '../types';
import { SingleChoice, SingleChoiceAnswer, SingleChoiceType } from './types';
import { useTheme } from '@/ui/theme';

import styles from '../Widget.module.css';

const Radio = ({
  option,
  toggle,
  checked,
}: {
  checked?: boolean;
  option: SingleChoice['options'][number];
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
        'flex h-10 flex-row items-center gap-2 rounded-sm p-2',
        !!checked && 'rounded-md',
      )}
      onClick={toggle}
    >
      <input id={option.key} checked={checked} type="radio" onChange={toggle} />
      <span className="my-1 w-full text-xs outline-none">{option.value}</span>
    </li>
  );
};

export const SingleChoiceWidget = <
  T extends SingleChoiceType = SingleChoiceType,
>({
  type,
  answer,
  settings,
  onChange,
}: WidgetProps<T, SingleChoice, SingleChoiceAnswer>) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        'grid grid-flow-row gap-2',
        `grid-cols-${theme.gridCols}`,
      )}
    >
      {settings.options.map((option) => (
        <Radio
          key={option.key}
          option={option}
          toggle={() => onChange({ type, value: option.value })}
          checked={answer?.value === option.value}
        />
      ))}
    </div>
  );
};
