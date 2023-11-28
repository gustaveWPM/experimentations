import { dirname, join } from 'path';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type Colors = { [_ in keyof DefaultColors]: string | Record<string, string> };

const deprecatedColors: (keyof DefaultColors)[] = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const sanitizedDefaultColors = Object.keys(colors).reduce((acc, k) => {
  const k2 = k as keyof DefaultColors;
  if (!deprecatedColors.includes(k2)) acc[k2] = colors[k2];
  return acc;
}, {} as Colors);

const config = {
  content: [join(dirname(require.resolve('@wpm-repo/ui')), '**/*.{js,ts,jsx,tsx}')],
  theme: {
    screens: { ...defaultTheme.screens },
    colors: {
      ...sanitizedDefaultColors
    }
  }
} satisfies Config;

export default config;
