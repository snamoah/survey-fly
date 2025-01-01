import { classNames } from '@/utils';

import { CSSProperties, WidgetProps } from '../types';
import { YesOrNo, YesOrNoAnswer, YesOrNoType } from './types';
import { useTheme } from '@/ui/theme';

import styles from '../Widget.module.css';

const Radio = ({
  label,
  toggle,
  checked,
}: {
  label: string;
  checked?: boolean;
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
      <input id={label} checked={checked} type="radio" onChange={toggle} />
      <span className="my-1 w-full text-xs outline-none">{label}</span>
    </li>
  );
};

export const YesOrNoWidget = <T extends YesOrNoType = YesOrNoType>({
  type,
  answer,
  onChange,
}: WidgetProps<T, YesOrNo, YesOrNoAnswer>) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        'grid grid-flow-row gap-2',
        `grid-cols-${theme.gridCols}`,
      )}
    >
      <Radio
        label="Yes"
        toggle={() => onChange({ type, value: true })}
        checked={answer?.value === true}
      />
      <Radio
        label="No"
        toggle={() => onChange({ type, value: false })}
        checked={answer?.value === false}
      />
    </div>
  );
};
