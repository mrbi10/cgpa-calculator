// src/components/AppInitializer.tsx
import { useEffect } from 'react';
import { useAppStore } from '../store/store';

export const AppInitializer = () => {
  const { theme, presetColor, fontSize } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-preset-color', presetColor);
    root.setAttribute('data-font-size', fontSize);
  }, [theme, presetColor, fontSize]);

  return null; // This component doesn't render anything
};

