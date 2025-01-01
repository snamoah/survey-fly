import { ColorPicker } from '@/ui/components';
import { BorderWidth } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { classNames } from '@/utils';
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

const SELECTED_BUTTON_BG = 'bg-gray-200';
const UNSELECTED_BUTTON_BG = 'bg-white';

type IconInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: ReactNode;
  label?: ReactNode;
};

const Input = ({ icon, className, ...props }: IconInputProps) => (
  <div className="flex flex-col gap-1">
    {props.label && (
      <label className="text-xs" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    <div className="has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300">
      {icon && (
        <div className="mr-1.5 shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
          {icon}
        </div>
      )}
      <input
        type="number"
        spellCheck={false}
        onFocus={(e) => e.target.select()}
        {...props}
        className={classNames(
          'block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6',
          className,
        )}
      />
    </div>
  </div>
);

const DesignSection = () => {
  const { theme, setThemeValue } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-2 divide-y divide-slate-300 overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="flex flex-col gap-4 p-3">
        <h4>Appearance</h4>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              min={0}
              id="borderTopLeftRadius"
              name="borderTopLeftRadius"
              type="number"
              value={theme.borderTopLeftRadius}
              onChange={(e) =>
                setThemeValue('borderTopLeftRadius', Number(e.target.value))
              }
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.87737 3H9.9H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H9.9C8.77164 4 7.95545 4.00039 7.31352 4.05284C6.67744 4.10481 6.25662 4.20539 5.91103 4.38148C5.25247 4.71703 4.71703 5.25247 4.38148 5.91103C4.20539 6.25662 4.10481 6.67744 4.05284 7.31352C4.00039 7.95545 4 8.77164 4 9.9V11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5V9.9V9.87737C3 8.77641 3 7.91948 3.05616 7.23209C3.11318 6.53416 3.23058 5.9671 3.49047 5.45704C3.9219 4.61031 4.61031 3.9219 5.45704 3.49047C5.9671 3.23058 6.53416 3.11318 7.23209 3.05616C7.91948 3 8.77641 3 9.87737 3Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
            />
            <Input
              min={0}
              type="number"
              id="borderTopRightRadius"
              name="borderTopRightRadius"
              value={theme.borderTopRightRadius}
              onChange={(e) =>
                setThemeValue('borderTopRightRadius', Number(e.target.value))
              }
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.12263 3H5.1H3.5C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H5.1C6.22836 4 7.04455 4.00039 7.68648 4.05284C8.32256 4.10481 8.74338 4.20539 9.08897 4.38148C9.74753 4.71703 10.283 5.25247 10.6185 5.91103C10.7946 6.25662 10.8952 6.67744 10.9472 7.31352C10.9996 7.95545 11 8.77164 11 9.9V11.5C11 11.7761 11.2239 12 11.5 12C11.7761 12 12 11.7761 12 11.5V9.9V9.87737C12 8.77641 12 7.91948 11.9438 7.23209C11.8868 6.53416 11.7694 5.9671 11.5095 5.45704C11.0781 4.61031 10.3897 3.9219 9.54296 3.49047C9.0329 3.23058 8.46584 3.11318 7.76791 3.05616C7.08052 3 6.22359 3 5.12263 3Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
            />
            <Input
              min={0}
              type="number"
              id="borderBottomLeftRadius"
              name="borderBottomLeftRadius"
              value={theme.borderBottomLeftRadius}
              onChange={(e) =>
                setThemeValue('borderBottomLeftRadius', Number(e.target.value))
              }
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.87737 12H9.9H11.5C11.7761 12 12 11.7761 12 11.5C12 11.2239 11.7761 11 11.5 11H9.9C8.77164 11 7.95545 10.9996 7.31352 10.9472C6.67744 10.8952 6.25662 10.7946 5.91103 10.6185C5.25247 10.283 4.71703 9.74753 4.38148 9.08897C4.20539 8.74338 4.10481 8.32256 4.05284 7.68648C4.00039 7.04455 4 6.22836 4 5.1V3.5C4 3.22386 3.77614 3 3.5 3C3.22386 3 3 3.22386 3 3.5V5.1V5.12263C3 6.22359 3 7.08052 3.05616 7.76791C3.11318 8.46584 3.23058 9.0329 3.49047 9.54296C3.9219 10.3897 4.61031 11.0781 5.45704 11.5095C5.9671 11.7694 6.53416 11.8868 7.23209 11.9438C7.91948 12 8.77641 12 9.87737 12Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
            />
            <Input
              type="number"
              min={0}
              id="borderBottomRightRadius"
              name="borderBottomRightRadius"
              value={theme.borderBottomRightRadius}
              onChange={(e) =>
                setThemeValue('borderBottomRightRadius', Number(e.target.value))
              }
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.12263 12H5.1H3.5C3.22386 12 3 11.7761 3 11.5C3 11.2239 3.22386 11 3.5 11H5.1C6.22836 11 7.04455 10.9996 7.68648 10.9472C8.32256 10.8952 8.74338 10.7946 9.08897 10.6185C9.74753 10.283 10.283 9.74753 10.6185 9.08897C10.7946 8.74338 10.8952 8.32256 10.9472 7.68648C10.9996 7.04455 11 6.22836 11 5.1V3.5C11 3.22386 11.2239 3 11.5 3C11.7761 3 12 3.22386 12 3.5V5.1V5.12263C12 6.22359 12 7.08052 11.9438 7.76791C11.8868 8.46584 11.7694 9.0329 11.5095 9.54296C11.0781 10.3897 10.3897 11.0781 9.54296 11.5095C9.0329 11.7694 8.46584 11.8868 7.76791 11.9438C7.08052 12 6.22359 12 5.12263 12Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
            />
          </div>
          <Input
            type="number"
            max={3}
            min={1}
            value={theme.gridCols}
            onChange={(e) => setThemeValue('gridCols', Number(e.target.value))}
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3">
        <h4>Fill</h4>
        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            label="Default fill color"
            value={theme.fillColor}
            onChange={(e) => setThemeValue('fillColor', e.target.value)}
            icon={
              <ColorPicker
                value={theme.fillColor}
                onChange={(e) => setThemeValue('fillColor', e.target.value)}
                className="block h-4 w-4 cursor-pointer rounded-full ring-1 ring-slate-400"
              />
            }
          />

          <Input
            type="text"
            label="Selected option fill color"
            value={theme.selectedFillColor}
            onChange={(e) => setThemeValue('selectedFillColor', e.target.value)}
            icon={
              <ColorPicker
                value={theme.selectedFillColor}
                onChange={(e) =>
                  setThemeValue('selectedFillColor', e.target.value)
                }
                className="block h-4 w-4 cursor-pointer rounded-full ring-1 ring-slate-400"
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3">
        <h4>Stroke</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="text"
            value={theme.strokeColor}
            onChange={(e) => setThemeValue('strokeColor', e.target.value)}
            className="select-all"
            icon={
              <ColorPicker
                value={theme.strokeColor}
                onChange={(e) => setThemeValue('strokeColor', e.target.value)}
                className="block h-4 w-4 cursor-pointer rounded-full ring-1 ring-slate-400"
              />
            }
          />
          <Input
            min={0}
            type="number"
            value={theme.borderWidth}
            onChange={(e) =>
              setThemeValue('borderWidth', Number(e.target.value))
            }
            icon={<BorderWidth />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3">
        <h4>Typography</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            name="lineHeight"
            min={0}
            value={theme.lineHeight}
            onChange={(e) =>
              setThemeValue('lineHeight', Number(e.target.value))
            }
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.78233 2.21713C3.70732 2.14212 3.60557 2.09998 3.49949 2.09998C3.3934 2.09998 3.29166 2.14212 3.21664 2.21713L1.21664 4.21713C1.06044 4.37334 1.06044 4.62661 1.21664 4.78282C1.37285 4.93903 1.62612 4.93903 1.78233 4.78282L3.09949 3.46566L3.09949 11.5343L1.78233 10.2171C1.62612 10.0609 1.37285 10.0609 1.21664 10.2171C1.06043 10.3733 1.06043 10.6266 1.21664 10.7828L3.21664 12.7828C3.29166 12.8578 3.3934 12.9 3.49949 12.9C3.60557 12.9 3.70731 12.8578 3.78233 12.7828L5.78233 10.7828C5.93854 10.6266 5.93854 10.3733 5.78233 10.2171C5.62612 10.0609 5.37285 10.0609 5.21664 10.2171L3.89949 11.5343L3.89949 3.46566L5.21664 4.78282C5.37285 4.93903 5.62612 4.93903 5.78233 4.78282C5.93854 4.62661 5.93854 4.37334 5.78233 4.21713L3.78233 2.21713ZM8.49998 3.99997C8.22383 3.99997 7.99998 4.22382 7.99998 4.49997C7.99998 4.77611 8.22383 4.99997 8.49998 4.99997H14.5C14.7761 4.99997 15 4.77611 15 4.49997C15 4.22382 14.7761 3.99997 14.5 3.99997H8.49998ZM7.99998 7.49997C7.99998 7.22382 8.22383 6.99997 8.49998 6.99997H14.5C14.7761 6.99997 15 7.22382 15 7.49997C15 7.77611 14.7761 7.99997 14.5 7.99997H8.49998C8.22383 7.99997 7.99998 7.77611 7.99998 7.49997ZM8.49998 9.99997C8.22383 9.99997 7.99998 10.2238 7.99998 10.5C7.99998 10.7761 8.22383 11 8.49998 11H14.5C14.7761 11 15 10.7761 15 10.5C15 10.2238 14.7761 9.99997 14.5 9.99997H8.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            }
          />
          <Input
            type="number"
            name="letterSpacing"
            min={0}
            value={theme.letterSpacing}
            onChange={(e) =>
              setThemeValue('letterSpacing', Number(e.target.value))
            }
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.55293 0.999969C4.75295 0.999969 4.93372 1.11917 5.0125 1.30301L8.01106 8.29982C8.11984 8.55363 8.00226 8.84757 7.74844 8.95635C7.49463 9.06512 7.20069 8.94754 7.09191 8.69373L6.11613 6.41685H2.98973L2.01395 8.69373C1.90517 8.94754 1.61123 9.06512 1.35742 8.95635C1.1036 8.84757 0.986023 8.55363 1.0948 8.29982L4.09336 1.30301C4.17214 1.11917 4.35291 0.999969 4.55293 0.999969ZM4.55293 2.76929L5.75186 5.56685H3.354L4.55293 2.76929ZM11.0562 9.00214C11.2617 9.00214 11.4463 8.87633 11.5215 8.68502L14.2733 1.68299C14.3743 1.42598 14.2478 1.13575 13.9908 1.03475C13.7338 0.933747 13.4436 1.06021 13.3426 1.31722L11.0562 7.13514L8.76973 1.31722C8.66873 1.06021 8.3785 0.933747 8.1215 1.03475C7.86449 1.13575 7.73802 1.42598 7.83902 1.68299L10.5908 8.68502C10.666 8.87633 10.8506 9.00214 11.0562 9.00214ZM14.9537 12.4999C14.9537 12.606 14.9115 12.7077 14.8365 12.7828L12.8365 14.7828C12.6803 14.939 12.4271 14.939 12.2708 14.7828C12.1146 14.6265 12.1146 14.3733 12.2708 14.2171L13.588 12.8999H1.51937L2.83653 14.2171C2.99274 14.3733 2.99274 14.6265 2.83653 14.7828C2.68032 14.939 2.42705 14.939 2.27084 14.7828L0.270843 12.7828C0.195828 12.7077 0.153687 12.606 0.153687 12.4999C0.153687 12.3938 0.195828 12.2921 0.270843 12.2171L2.27084 10.2171C2.42705 10.0609 2.68032 10.0609 2.83653 10.2171C2.99274 10.3733 2.99274 10.6265 2.83653 10.7828L1.51937 12.0999L13.588 12.0999L12.2708 10.7828C12.1146 10.6265 12.1146 10.3733 12.2708 10.2171C12.4271 10.0609 12.6803 10.0609 12.8365 10.2171L14.8365 12.2171C14.9115 12.2921 14.9537 12.3938 14.9537 12.4999Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            }
          />
          <div className="flex h-9 w-full rounded-md border border-gray-300">
            <button
              onClick={() => setThemeValue('textAlign', 'start')}
              className={classNames(
                'flex flex-1 items-center justify-center rounded-s-md text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textAlign === 'start'
                  ? SELECTED_BUTTON_BG
                  : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setThemeValue('textAlign', 'center')}
              className={classNames(
                'flex flex-1 items-center justify-center border-l border-gray-300 text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textAlign === 'center'
                  ? SELECTED_BUTTON_BG
                  : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setThemeValue('textAlign', 'end')}
              className={classNames(
                'flex flex-1 items-center justify-center rounded-e-md border-l border-gray-300 text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textAlign === 'end'
                  ? SELECTED_BUTTON_BG
                  : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H7.5C7.22386 8 7 7.77614 7 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex h-9 w-full rounded-md border border-gray-300">
            <button
              onClick={() => setThemeValue('textBold', !theme.textBold)}
              className={classNames(
                'flex flex-1 items-center justify-center rounded-s-md text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textBold ? SELECTED_BUTTON_BG : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.10505 12C4.70805 12 4.4236 11.912 4.25171 11.736C4.0839 11.5559 4 11.2715 4 10.8827V4.11733C4 3.72033 4.08595 3.43588 4.25784 3.26398C4.43383 3.08799 4.71623 3 5.10505 3C6.42741 3 8.25591 3 9.02852 3C10.1373 3 11.0539 3.98153 11.0539 5.1846C11.0539 6.08501 10.6037 6.81855 9.70327 7.23602C10.8657 7.44851 11.5176 8.62787 11.5176 9.48128C11.5176 10.5125 10.9902 12 9.27734 12C8.77742 12 6.42626 12 5.10505 12ZM8.37891 8.00341H5.8V10.631H8.37891C8.9 10.631 9.6296 10.1211 9.6296 9.29877C9.6296 8.47643 8.9 8.00341 8.37891 8.00341ZM5.8 4.36903V6.69577H8.17969C8.53906 6.69577 9.27734 6.35939 9.27734 5.50002C9.27734 4.64064 8.48047 4.36903 8.17969 4.36903H5.8Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setThemeValue('textItalic', !theme.textItalic)}
              className={classNames(
                'flex flex-1 items-center justify-center border-l border-gray-300 text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textItalic ? SELECTED_BUTTON_BG : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H9.00587L7.2309 11.05H8.87493C9.12345 11.05 9.32493 11.2515 9.32493 11.5C9.32493 11.7486 9.12345 11.95 8.87493 11.95H4.37493C4.1264 11.95 3.92493 11.7486 3.92493 11.5C3.92493 11.2515 4.1264 11.05 4.37493 11.05H5.99397L7.76894 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={() =>
                setThemeValue('textUnderline', !theme.textUnderline)
              }
              className={classNames(
                'flex flex-1 items-center justify-center rounded-e-md border-l border-gray-300 text-slate-500 hover:bg-gray-100 focus:outline-none',
                theme.textUnderline ? SELECTED_BUTTON_BG : UNSELECTED_BUTTON_BG,
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.00001 2.75C5.00001 2.47386 4.77615 2.25 4.50001 2.25C4.22387 2.25 4.00001 2.47386 4.00001 2.75V8.05C4.00001 9.983 5.56702 11.55 7.50001 11.55C9.43301 11.55 11 9.983 11 8.05V2.75C11 2.47386 10.7762 2.25 10.5 2.25C10.2239 2.25 10 2.47386 10 2.75V8.05C10 9.43071 8.88072 10.55 7.50001 10.55C6.1193 10.55 5.00001 9.43071 5.00001 8.05V2.75ZM3.49998 13.1001C3.27906 13.1001 3.09998 13.2791 3.09998 13.5001C3.09998 13.721 3.27906 13.9001 3.49998 13.9001H11.5C11.7209 13.9001 11.9 13.721 11.9 13.5001C11.9 13.2791 11.7209 13.1001 11.5 13.1001H3.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSection;
