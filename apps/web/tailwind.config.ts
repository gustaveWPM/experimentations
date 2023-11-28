import SharedConfig from '@wpm-repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [SharedConfig],
  content: [...SharedConfig.content, './src/**/*.{js,ts,jsx,tsx,mdx}']
};

export default config;
