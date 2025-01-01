'use client';

import { updateSurveyThemeAction } from '@/lib/actions';
import { Theme } from '@/types';
import { debounce } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

export const defaultTheme: Theme = {
  fillColor: 'transparent',
  selectedFillColor: '#f1f5f9',
  strokeColor: '#3B82F67F',
  borderWidth: 1,
  gridCols: 1,
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  borderTopRightRadius: 4,
  borderStyle: 'solid',
  textBold: false,
  textUnderline: false,
  textItalic: false,
  textAlign: 'start',
  lineHeight: 1,
  letterSpacing: 0,
};

type ThemeContextType = {
  theme: Theme;
  defaultTheme: Theme;
  setThemeValue: <Key extends keyof Theme>(key: Key, value: Theme[Key]) => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  defaultTheme,
  theme: defaultTheme,
  setThemeValue: () => {},
});

export const ThemeProvider = ({
  children,
  theme = defaultTheme,
  surveyId,
}: {
  surveyId: string;
  theme?: Theme;
  children: ReactNode;
}) => {
  const [themeConfig, setThemeConfig] = useState<Theme>(theme);

  const setThemeValue: ThemeContextType['setThemeValue'] = (key, value) =>
    setThemeConfig((prevConfig) => ({ ...prevConfig, [key]: value }));

  useEffect(() => {
    // TODO: this current implementation can lead to maximum update depth reached
    // especially when using the color picker which can make the UI
    // unresponsive . Find a better solution
    updateSurveyThemeAction(surveyId, themeConfig);
  }, [surveyId, themeConfig]);

  const context = {
    defaultTheme,
    setThemeValue,
    theme: themeConfig,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return themeContext;
};
