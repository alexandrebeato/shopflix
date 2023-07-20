import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

type Theme = 'dark' | 'light';
type ThemeSetter = Dispatch<SetStateAction<string>>;

export default function useThemeSwitcher(): [Theme, ThemeSetter] {
  const [theme, setTheme] = useState<string>(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
