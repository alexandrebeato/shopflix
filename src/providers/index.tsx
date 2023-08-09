'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Providers = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class">
      <ToastContainer
        theme={theme === 'dark' ? 'dark' : 'light'}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
      {children}
    </ThemeProvider>
  );
};
