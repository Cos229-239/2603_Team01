import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';
type AccentColorType = 'blue' | 'purple' | 'green' | 'orange';
type FontSizeType = 'small' | 'medium' | 'large';

interface Theme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
}

interface ThemeContextType {
  theme: ThemeType;
  accentColor: AccentColorType;
  fontSize: FontSizeType;
  colors: Theme;
  setTheme: (theme: ThemeType) => void;
  setAccentColor: (color: AccentColorType) => void;
  setFontSize: (size: FontSizeType) => void;
  getFontSize: (baseSize: number) => number;
}

const accentColors = {
  blue: { light: '#007AFF', dark: '#0a84ff' },
  purple: { light: '#AF52DE', dark: '#BF5AF2' },
  green: { light: '#34C759', dark: '#30D158' },
  orange: { light: '#FF9500', dark: '#FF9F0A' },
};

const fontSizeMultipliers = {
  small: 0.9,
  medium: 1.0,
  large: 1.15,
};

const createTheme = (isDark: boolean, accentColor: AccentColorType): Theme => {
  const accent = isDark ? accentColors[accentColor].dark : accentColors[accentColor].light;
  
  return isDark
    ? {
        background: '#1a1a1a',
        card: '#2c2c2c',
        text: '#ffffff',
        textSecondary: '#b0b0b0',
        border: '#3a3a3a',
        primary: accent,
      }
    : {
        background: '#f5f5f5',
        card: '#ffffff',
        text: '#333333',
        textSecondary: '#666666',
        border: '#e0e0e0',
        primary: accent,
      };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';
const ACCENT_COLOR_STORAGE_KEY = 'app_accent_color';
const FONT_SIZE_STORAGE_KEY = 'app_font_size';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [accentColor, setAccentColorState] = useState<AccentColorType>('blue');
  const [fontSize, setFontSizeState] = useState<FontSizeType>('medium');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [savedTheme, savedAccent, savedFontSize] = await Promise.all([
        AsyncStorage.getItem(THEME_STORAGE_KEY),
        AsyncStorage.getItem(ACCENT_COLOR_STORAGE_KEY),
        AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY),
      ]);

      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      }
      if (savedAccent === 'blue' || savedAccent === 'purple' || savedAccent === 'green' || savedAccent === 'orange') {
        setAccentColorState(savedAccent);
      }
      if (savedFontSize === 'small' || savedFontSize === 'medium' || savedFontSize === 'large') {
        setFontSizeState(savedFontSize);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const setAccentColor = async (color: AccentColorType) => {
    try {
      await AsyncStorage.setItem(ACCENT_COLOR_STORAGE_KEY, color);
      setAccentColorState(color);
    } catch (error) {
      console.error('Failed to save accent color:', error);
    }
  };

  const setFontSize = async (size: FontSizeType) => {
    try {
      await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, size);
      setFontSizeState(size);
    } catch (error) {
      console.error('Failed to save font size:', error);
    }
  };

  const getFontSize = (baseSize: number): number => {
    return baseSize * fontSizeMultipliers[fontSize];
  };

  const colors = createTheme(theme === 'dark', accentColor);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, fontSize, colors, setTheme, setAccentColor, setFontSize, getFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};