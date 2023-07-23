'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({
  className
}: ThemeSwitcherProps): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function handleToggleTheme(): void {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={className}>
      {theme === 'dark' ? (
        <FiSun
          size={25}
          onClick={handleToggleTheme}
          className="text-[#F3C432] hover:text-[#3F4347] hover:transition hover:ease-in-out hover: duration-500"
        />
      ) : (
        <FiMoon
          size={25}
          onClick={handleToggleTheme}
          className="text-[#3F4347] hover:text-[#F3C432] hover:transition hover:ease-in-out hover: duration-500"
        />
      )}
    </div>
  );
}
