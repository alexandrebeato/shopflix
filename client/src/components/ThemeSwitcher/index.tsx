'use client';

import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

interface IThemeSwitcher {
  className?: string;
}

export default function ThemeSwitcher({
  className
}: IThemeSwitcher): JSX.Element {
  const { theme, setTheme } = useTheme();

  function handleToggleTheme(): void {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={className}>
      {theme === 'dark' ? (
        <FiMoon size={25} onClick={handleToggleTheme} className={className} />
      ) : (
        <FiSun size={25} onClick={handleToggleTheme} className={className} />
      )}
    </div>
  );
}
