'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export const Providers = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
