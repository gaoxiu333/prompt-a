import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { recalculateColors } from './theme';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const [themeColors, setThemeColors] = useState(recalculateColors());
  useEffect(() => {
    // Must resolve current callstack before recalculating colors, otherwise they won't be updated on time.
    setTimeout(() => setThemeColors(recalculateColors()), 0);
  }, [theme]);

  return themeColors;
};
